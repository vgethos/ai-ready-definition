import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Parse a single screen markdown file into a structured object.
 * @param {string} content - Raw markdown content
 * @param {number} number - Screen number
 * @returns {object} Parsed screen object
 */
function parseScreen(content, number) {
  // Extract URL from **URL:** line
  const urlMatch = content.match(/\*\*URL:\*\*\s*(.+)/);
  const url = urlMatch ? urlMatch[1].trim() : null;

  // Extract "What the user sees" section — between the heading and the next ---
  const seesMatch = content.match(
    /###\s*What the user sees\s*\n([\s\S]*?)(?:\n---|\n###)/
  );
  const whatUserSees = seesMatch ? seesMatch[1].trim() : '';

  // Extract "What the user can do" section — between the heading and the next --- or end
  const doesMatch = content.match(
    /###\s*What the user can do\s*\n([\s\S]*?)(?:\n---|\n!\[|$)/
  );
  const whatUserCanDo = doesMatch ? doesMatch[1].trim() : '';

  // Extract screenshot filename from ![...](...) if present
  const screenshotMatch = content.match(/!\[.*?\]\((.+?)\)/);
  const screenshotFile = screenshotMatch ? screenshotMatch[1].trim() : null;

  return {
    number,
    url,
    whatUserSees,
    whatUserCanDo,
    screenshotFile,
    rawContent: content,
  };
}

/**
 * Load and parse all Ethos funnel screen markdown files from a directory.
 * @param {string} screensDir - Path to the directory containing screen-*.md files
 * @returns {Promise<Array>} Array of parsed screen objects, sorted by screen number
 */
export async function loadFunnelScreens(screensDir) {
  const entries = await readdir(screensDir);
  const screenFiles = entries
    .filter((f) => /^screen-\d+\.md$/.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.match(/screen-(\d+)/)[1], 10);
      const numB = parseInt(b.match(/screen-(\d+)/)[1], 10);
      return numA - numB;
    });

  const screens = await Promise.all(
    screenFiles.map(async (filename) => {
      const number = parseInt(filename.match(/screen-(\d+)/)[1], 10);
      const content = await readFile(join(screensDir, filename), 'utf-8');
      return parseScreen(content, number);
    })
  );

  return screens;
}

/**
 * Return a brief string summarizing the loaded funnel screens.
 * @param {Array} screens - Array of parsed screen objects from loadFunnelScreens
 * @returns {string} Human-readable summary
 */
export function getScreenSummary(screens) {
  if (!screens || screens.length === 0) {
    return 'No screens loaded.';
  }

  const first = screens[0];
  const last = screens[screens.length - 1];

  // Pull a short label from the first line of whatUserSees
  const label = (screen) => {
    const heading = screen.whatUserSees.match(/\*\*(.+?)\*\*/);
    if (heading) return heading[1].toLowerCase();
    const firstLine = screen.whatUserSees.split('\n')[0].trim().toLowerCase();
    return firstLine.slice(0, 60);
  };

  return `${screens.length} screens loaded, from '${label(first)}' (screen ${first.number}) to '${label(last)}' (screen ${last.number}).`;
}
