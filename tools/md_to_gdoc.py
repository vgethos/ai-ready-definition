#!/usr/bin/env python3
"""
md_to_gdoc.py — Convert a Markdown file to a formatted Google Doc tab.

Usage:
    python3 tools/md_to_gdoc.py <file.md> <doc_id> <tab_id>

Handles:
  - H1 / H2 / H3 headings (strips # prefix)
  - Bold (**text**) and italic (*text*) inline formatting
  - Tables (markdown → Google Doc table, header row bolded)
  - Bullet lists (- item)
  - Tight paragraph spacing (no blank paragraph lines)
  - YAML frontmatter stripped
  - Horizontal rules (---) removed
"""

import argparse
import json
import re
import subprocess
import sys


# ── GWS helpers ───────────────────────────────────────────────────────────────

def gws(service, *path, params=None, body=None):
    cmd = ['gws', service] + list(path)
    if params:
        cmd += ['--params', json.dumps(params)]
    if body:
        cmd += ['--json', json.dumps(body)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(f'[gws error] {r.stderr}', file=sys.stderr)
        sys.exit(1)
    return json.loads(r.stdout) if r.stdout.strip() else {}


def batch(doc_id, requests):
    if not requests:
        return
    return gws('docs', 'documents', 'batchUpdate',
               params={'documentId': doc_id},
               body={'requests': requests})


def get_tab(doc_id, tab_id):
    doc = gws('docs', 'documents', 'get',
              params={'documentId': doc_id, 'includeTabsContent': True})
    return next(t['documentTab'] for t in doc['tabs']
                if t['tabProperties']['tabId'] == tab_id)


# ── Markdown parser ────────────────────────────────────────────────────────────

def strip_frontmatter(text):
    lines = text.split('\n')
    if lines and lines[0].strip() == '---':
        try:
            end = next(i for i, l in enumerate(lines[1:], 1) if l.strip() == '---')
            return '\n'.join(lines[end + 1:]).strip()
        except StopIteration:
            pass
    return text.strip()


def map_inline(text):
    """
    Parse inline markdown formatting.
    Returns (plain_text, [(start, end, 'bold'|'italic'), ...])
    Positions are in plain_text coordinates.
    """
    plain = []
    spans = []
    i = 0
    while i < len(text):
        # Bold: **...**
        if text[i:i+2] == '**':
            close = text.find('**', i + 2)
            if close != -1:
                inner, inner_spans = map_inline(text[i+2:close])
                s = sum(len(p) for p in plain)
                for a, b, st in inner_spans:
                    spans.append((s + a, s + b, st))
                spans.append((s, s + len(inner), 'bold'))
                plain.append(inner)
                i = close + 2
                continue
        # Italic: *...* (not **)
        elif text[i] == '*' and (i + 1 < len(text) and text[i+1] != '*'):
            close = i + 1
            while close < len(text):
                if text[close] == '*' and (close + 1 >= len(text) or text[close+1] != '*'):
                    break
                close += 1
            if close < len(text):
                inner, inner_spans = map_inline(text[i+1:close])
                s = sum(len(p) for p in plain)
                for a, b, st in inner_spans:
                    spans.append((s + a, s + b, st))
                spans.append((s, s + len(inner), 'italic'))
                plain.append(inner)
                i = close + 1
                continue
        # Backtick: `code`
        elif text[i] == '`':
            close = text.find('`', i + 1)
            if close != -1:
                plain.append(text[i+1:close])
                i = close + 1
                continue
        plain.append(text[i])
        i += 1
    return ''.join(plain), spans


def is_table_separator(line):
    """Returns True for |---| or ||||| style separator rows."""
    s = line.strip()
    if re.match(r'^\|[-| :]+\|$', s):
        return True
    if re.match(r'^\|+$', s):
        return True
    return False


def parse_table(table_lines):
    rows = []
    for line in table_lines:
        if is_table_separator(line):
            continue
        cells = [c.strip() for c in line.strip().strip('|').split('|')]
        rows.append(cells)
    return {
        'type': 'table',
        'headers': rows[0] if rows else [],
        'rows': rows[1:] if len(rows) > 1 else [],
    }


_TITLE_BODY_RE = re.compile(r'^(\*\*.+?\*\*)\s*[—–-]{1,3}\s*(.+)$', re.DOTALL)

def _split_title_body(text):
    """
    If text matches '**Bold title** — description', return (title, body).
    Otherwise return (text, None).
    """
    m = _TITLE_BODY_RE.match(text)
    if m:
        return m.group(1).strip(), m.group(2).strip()
    return text, None


def parse_md(text):
    text = strip_frontmatter(text)
    lines = text.split('\n')
    blocks = []
    i = 0

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # Skip blank lines and horizontal rules
        if not stripped or re.match(r'^---+$', stripped):
            i += 1
            continue

        # Heading
        if m := re.match(r'^(#{1,3})\s+(.+)$', line):
            blocks.append({'type': 'heading', 'level': len(m.group(1)), 'text': m.group(2).strip()})
            i += 1
            continue

        # Table
        if stripped.startswith('|'):
            tlines = []
            while i < len(lines) and lines[i].strip().startswith('|'):
                tlines.append(lines[i])
                i += 1
            blocks.append(parse_table(tlines))
            continue

        # Unordered list items
        if re.match(r'^\s*[-*]\s+', line):
            while i < len(lines) and re.match(r'^\s*[-*]\s+', lines[i]):
                m = re.match(r'^(\s*)[-*]\s+(.+)$', lines[i])
                indent = len(m.group(1)) // 2
                title, body = _split_title_body(m.group(2).strip())
                blocks.append({'type': 'list_item', 'text': title, 'indent': indent})
                if body:
                    blocks.append({'type': 'list_continuation', 'text': body, 'indent': indent})
                i += 1
            continue

        # Ordered list items (1. 2. 3. etc.)
        if re.match(r'^\s*\d+\.\s+', line):
            while i < len(lines) and re.match(r'^\s*\d+\.\s+', lines[i]):
                m = re.match(r'^(\s*)\d+\.\s+(.+)$', lines[i])
                indent = len(m.group(1)) // 2
                title, body = _split_title_body(m.group(2).strip())
                blocks.append({'type': 'ordered_item', 'text': title, 'indent': indent})
                if body:
                    blocks.append({'type': 'list_continuation', 'text': body, 'indent': indent})
                i += 1
            continue

        # Paragraph (collect continuation lines)
        para_lines = [line]
        i += 1
        while i < len(lines):
            l = lines[i]
            ls = l.strip()
            if (not ls
                    or ls.startswith('#')
                    or ls.startswith('|')
                    or re.match(r'^---+$', ls)
                    or re.match(r'^\s*[-*]\s+', l)
                    or re.match(r'^\s*\d+\.\s+', l)):
                break
            para_lines.append(l)
            i += 1
        blocks.append({'type': 'para', 'text': ' '.join(para_lines)})

    return blocks


# ── Conversion ─────────────────────────────────────────────────────────────────

HEADING_STYLE = {1: 'HEADING_1', 2: 'HEADING_2', 3: 'HEADING_3'}
HEADING_SPACE_ABOVE = {1: 0, 2: 14, 3: 10}  # pt


def convert(md_file, doc_id, tab_id):
    print(f'Reading {md_file}...')
    with open(md_file) as f:
        raw = f.read()

    blocks = parse_md(raw)
    print(f'Parsed {len(blocks)} blocks.')

    # ── 1. Clear existing tab content ────────────────────────────────────────
    print('Clearing tab...')
    tab_doc = get_tab(doc_id, tab_id)
    content = tab_doc['body']['content']
    last_idx = max(b.get('endIndex', 1) for b in content)
    if last_idx > 2:
        batch(doc_id, [{'deleteContentRange': {
            'range': {'startIndex': 1, 'endIndex': last_idx - 1, 'tabId': tab_id}
        }}])

    # ── 2. Build plain text (tables → placeholder lines) ─────────────────────
    text_blocks = []   # (plain_text, block, inline_spans)
    table_order = []   # block dicts in order

    for block in blocks:
        btype = block['type']
        if btype == 'table':
            ph = f'__TABLE_{len(table_order)}__'
            table_order.append(block)
            text_blocks.append((ph + '\n', block, []))
        elif btype == 'heading':
            plain, spans = map_inline(block['text'])
            text_blocks.append((plain + '\n', block, spans))
        elif btype == 'para':
            plain, spans = map_inline(block['text'])
            text_blocks.append((plain + '\n', block, spans))
        elif btype in ('list_item', 'ordered_item', 'list_continuation'):
            plain, spans = map_inline(block['text'])
            text_blocks.append((plain + '\n', block, spans))

    full_text = ''.join(t for t, _, _ in text_blocks)

    # ── 3. Insert all text ───────────────────────────────────────────────────
    print('Inserting text...')
    batch(doc_id, [{'insertText': {
        'location': {'index': 1, 'tabId': tab_id},
        'text': full_text,
    }}])

    # ── 4. Apply paragraph styles + inline formatting ────────────────────────
    print('Applying styles...')
    fmt_reqs = []
    inline_reqs = []
    cursor = 1

    LIST_BLOCK_TYPES = ('list_item', 'ordered_item', 'list_continuation')

    for idx, (plain, block, spans) in enumerate(text_blocks):
        end = cursor + len(plain)
        btype = block['type']
        prev_btype = text_blocks[idx - 1][1]['type'] if idx > 0 else None

        if btype == 'heading':
            lvl = block['level']
            fmt_reqs.append({'updateParagraphStyle': {
                'range': {'startIndex': cursor, 'endIndex': end, 'tabId': tab_id},
                'paragraphStyle': {
                    'namedStyleType': HEADING_STYLE[lvl],
                    'spaceAbove': {'magnitude': HEADING_SPACE_ABOVE[lvl], 'unit': 'PT'},
                    'spaceBelow': {'magnitude': 4, 'unit': 'PT'},
                },
                'fields': 'namedStyleType,spaceAbove,spaceBelow',
            }})
        elif btype in ('list_item', 'ordered_item'):
            # Title line: space above for item separation, no space below (tight to continuation)
            fmt_reqs.append({'updateParagraphStyle': {
                'range': {'startIndex': cursor, 'endIndex': end, 'tabId': tab_id},
                'paragraphStyle': {
                    'spaceAbove': {'magnitude': 10, 'unit': 'PT'},
                    'spaceBelow': {'magnitude': 0, 'unit': 'PT'},
                },
                'fields': 'spaceAbove,spaceBelow',
            }})
        elif btype == 'list_continuation':
            # Body line: no space above (hugs title), space below separates from next item
            fmt_reqs.append({'updateParagraphStyle': {
                'range': {'startIndex': cursor, 'endIndex': end, 'tabId': tab_id},
                'paragraphStyle': {
                    'spaceAbove': {'magnitude': 0, 'unit': 'PT'},
                    'spaceBelow': {'magnitude': 10, 'unit': 'PT'},
                },
                'fields': 'spaceAbove,spaceBelow',
            }})
        elif btype == 'para':
            # Add top space when transitioning from a list back to a paragraph
            space_above = 14 if prev_btype in LIST_BLOCK_TYPES else 0
            fmt_reqs.append({'updateParagraphStyle': {
                'range': {'startIndex': cursor, 'endIndex': end, 'tabId': tab_id},
                'paragraphStyle': {
                    'spaceAbove': {'magnitude': space_above, 'unit': 'PT'},
                    'spaceBelow': {'magnitude': 10, 'unit': 'PT'},
                },
                'fields': 'spaceAbove,spaceBelow',
            }})

        for span_s, span_e, style in spans:
            inline_reqs.append({'updateTextStyle': {
                'range': {'startIndex': cursor + span_s, 'endIndex': cursor + span_e, 'tabId': tab_id},
                'textStyle': {'bold': True} if style == 'bold' else {'italic': True},
                'fields': 'bold' if style == 'bold' else 'italic',
            }})

        cursor = end

    batch(doc_id, fmt_reqs + inline_reqs)

    # ── 5. Apply bullet formatting ───────────────────────────────────────────
    # Build cursor positions for every text block
    cursors = []
    c = 1
    for tb in text_blocks:
        cursors.append(c)
        c += len(tb[0])

    LIST_TYPES = ('list_item', 'ordered_item', 'list_continuation')
    bullet_reqs = []
    delete_bullet_reqs = []
    i = 0
    while i < len(text_blocks):
        btype = text_blocks[i][1]['type']

        if btype in ('list_item', 'ordered_item'):
            preset = ('BULLET_DISC_CIRCLE_SQUARE' if btype == 'list_item'
                      else 'NUMBERED_DECIMAL_ALPHA_ROMAN')

            # Find extent of this consecutive list group
            j = i
            while j < len(text_blocks) and text_blocks[j][1]['type'] in LIST_TYPES:
                j += 1

            group_start = cursors[i]
            group_end = cursors[j - 1] + len(text_blocks[j - 1][0])

            # One request over the full group → sequential numbering
            bullet_reqs.append({'createParagraphBullets': {
                'range': {'startIndex': group_start, 'endIndex': group_end, 'tabId': tab_id},
                'bulletPreset': preset,
            }})

            # Remove bullets from continuation paragraphs (they keep the indent)
            for k in range(i, j):
                if text_blocks[k][1]['type'] == 'list_continuation':
                    ks = cursors[k]
                    ke = ks + len(text_blocks[k][0])
                    delete_bullet_reqs.append({'deleteParagraphBullets': {
                        'range': {'startIndex': ks, 'endIndex': ke, 'tabId': tab_id},
                    }})
            i = j
        else:
            i += 1

    batch(doc_id, bullet_reqs)
    if delete_bullet_reqs:
        batch(doc_id, delete_bullet_reqs)

    # Explicitly indent continuation paragraphs to match list item indent (36pt)
    # deleteParagraphBullets doesn't reliably preserve visual indent
    indent_reqs = []
    for k in range(len(text_blocks)):
        if text_blocks[k][1]['type'] == 'list_continuation':
            ks = cursors[k]
            ke = ks + len(text_blocks[k][0])
            indent_reqs.append({'updateParagraphStyle': {
                'range': {'startIndex': ks, 'endIndex': ke, 'tabId': tab_id},
                'paragraphStyle': {'indentStart': {'magnitude': 36, 'unit': 'PT'}},
                'fields': 'indentStart',
            }})
    if indent_reqs:
        batch(doc_id, indent_reqs)

    # ── 6. Handle tables (reverse order to preserve earlier indices) ─────────
    if table_order:
        print(f'Inserting {len(table_order)} table(s)...')

    # Build cursor positions for table placeholders
    table_cursors = []
    cursor = 1
    for i, (plain, block, _) in enumerate(text_blocks):
        if block['type'] == 'table':
            table_cursors.append((i, cursor, block))
        cursor += len(plain)

    for tnum, (tb_idx, ph_cursor, table) in reversed(list(enumerate(table_cursors))):
        ph = f'__TABLE_{tnum}__\n'
        all_rows = [table['headers']] + table['rows']
        n_rows = len(all_rows)
        n_cols = max(len(r) for r in all_rows) if all_rows else 1

        # Delete placeholder, insert table
        batch(doc_id, [
            {'deleteContentRange': {
                'range': {'startIndex': ph_cursor, 'endIndex': ph_cursor + len(ph), 'tabId': tab_id}
            }},
            {'insertTable': {
                'rows': n_rows,
                'columns': n_cols,
                'location': {'index': ph_cursor, 'tabId': tab_id},
            }},
        ])

        # Re-read to get cell positions
        tab_doc = get_tab(doc_id, tab_id)
        tab_content = tab_doc['body']['content']

        table_el = None
        for b in tab_content:
            if 'table' in b and b.get('startIndex', 0) >= ph_cursor - 1:
                table_el = b['table']
                break

        if not table_el:
            print(f'Warning: could not locate table {tnum} in doc', file=sys.stderr)
            continue

        # Collect cell inserts (index, plain_text) — process end→start
        cell_inserts = []
        for r_idx, row_data in enumerate(all_rows):
            if r_idx >= len(table_el.get('tableRows', [])):
                break
            row = table_el['tableRows'][r_idx]
            for c_idx, cell_text in enumerate(row_data):
                if c_idx >= len(row.get('tableCells', [])):
                    break
                cell = row['tableCells'][c_idx]
                if not cell.get('content'):
                    continue
                insert_idx = cell['content'][0]['startIndex']
                plain, _ = map_inline(cell_text)
                if plain.strip():
                    cell_inserts.append((insert_idx, plain))

        # Insert end→start to avoid index shifts
        cell_inserts.sort(key=lambda x: x[0], reverse=True)
        batch(doc_id, [
            {'insertText': {'location': {'index': idx, 'tabId': tab_id}, 'text': text}}
            for idx, text in cell_inserts
        ])

        # Bold the header row
        tab_doc = get_tab(doc_id, tab_id)
        tab_content = tab_doc['body']['content']
        for b in tab_content:
            if 'table' in b and b.get('startIndex', 0) >= ph_cursor - 1:
                table_el = b['table']
                break

        if table_el and table_el.get('tableRows'):
            header_bold = []
            for cell in table_el['tableRows'][0].get('tableCells', []):
                for cb in cell.get('content', []):
                    for el in cb.get('paragraph', {}).get('elements', []):
                        if el.get('textRun', {}).get('content', '').strip():
                            header_bold.append({'updateTextStyle': {
                                'range': {'startIndex': el['startIndex'], 'endIndex': el['endIndex'], 'tabId': tab_id},
                                'textStyle': {'bold': True},
                                'fields': 'bold',
                            }})
            batch(doc_id, header_bold)

    print('Done.')


# ── CLI ────────────────────────────────────────────────────────────────────────

def parse_doc_url(url_or_id):
    """Extract doc_id and tab_id from a Google Doc URL or raw IDs."""
    m = re.search(r'/document/d/([a-zA-Z0-9_-]+)', url_or_id)
    doc_id = m.group(1) if m else url_or_id
    m2 = re.search(r'tab=([a-zA-Z0-9_.]+)', url_or_id)
    tab_id = m2.group(1) if m2 else 't.0'
    return doc_id, tab_id


if __name__ == '__main__':
    parser = argparse.ArgumentParser(
        description='Convert a Markdown file to a formatted Google Doc tab.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python3 tools/md_to_gdoc.py docs/context.md 1dPTT...xHI t.0
  python3 tools/md_to_gdoc.py docs/context.md "https://docs.google.com/document/d/1dPTT.../edit?tab=t.abc123"
        """
    )
    parser.add_argument('md_file', help='Path to the markdown file')
    parser.add_argument('doc_or_url', help='Google Doc URL (with optional tab param) or bare doc ID')
    parser.add_argument('tab_id', nargs='?', default=None,
                        help='Tab ID (e.g. t.0 or t.d7ehgs4ratci) — ignored if URL includes tab= param')
    args = parser.parse_args()

    doc_id, tab_id = parse_doc_url(args.doc_or_url)
    if args.tab_id:
        tab_id = args.tab_id

    convert(args.md_file, doc_id, tab_id)
