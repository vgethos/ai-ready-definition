import { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Data ─────────────────────────────────────────────────────────────────────

interface Prototype {
  path: string;
  title: string;
  description: string;
  month: string;
}

interface PrototypeGroup {
  name: string;
  month?: string;
  variants: Prototype[];
}

interface ProductArea {
  name: string;
  groups: PrototypeGroup[];
}

const canonical: PrototypeGroup = {
  name: 'Canonical',
  variants: [
    {
      path: '/iul/ref/lp',
      title: 'IUL LP — Control',
      description: 'Landing page control. Baseline for LP experiments across product areas.',
      month: 'Feb 2026',
    },
    {
      path: '/iul/ref/pre-interview-single-select',
      title: 'Pre-Interview — Single Select',
      description: 'Pre-interview single-select screen. Goals selection flow.',
      month: 'Mar 2026',
    },
  ],
};

const productAreas: ProductArea[] = [
  {
    name: 'IUL',
    groups: [
      {
        name: 'Sales Direct — Text Bridge',
        month: 'Mar 2026',
        variants: [
          {
            path: '/iul/sales-direct-text-bridge/control',
            title: 'Control — Passive Wait',
            description: 'Current live page. No text mention, no scheduling.',
            month: 'Mar 2026',
          },
          {
            path: '/iul/sales-direct-text-bridge/v1',
            title: 'V1 — On-Page Scheduling',
            description: 'Time slot cards let users commit to a call time before leaving.',
            month: 'Mar 2026',
          },
          {
            path: '/iul/sales-direct-text-bridge/v2',
            title: 'V2 — Expectation + Low Commitment',
            description: 'Check your phone framing; text positions as low-commitment entry.',
            month: 'Mar 2026',
          },
          {
            path: '/iul/sales-direct-text-bridge/v4',
            title: 'V4 — Value Anchoring',
            description: 'Policy details framed as ready and waiting; text delivers them.',
            month: 'Mar 2026',
          },
        ],
      },
      {
        name: 'BOF Self Serve: Guaranteed vs Non Guaranteed Values',
        month: 'Mar 2026',
        variants: [
          {
            path: '/iul/guaranteed-vs-non/v1-cards',
            title: 'V1 — Paired Cards',
            description: 'Coverage as shared anchor. Cash value + death benefit in equal-weight paired cards.',
            month: 'Mar 2026',
          },
          {
            path: '/iul/guaranteed-vs-non/v2-chart',
            title: 'V2 — Growth Chart',
            description: 'Cash value over 20 years as a two-line chart. Summary metrics below.',
            month: 'Mar 2026',
          },
          {
            path: '/iul/guaranteed-vs-non/v3-ranges',
            title: 'V3 — Range Bars',
            description: 'Each metric shows a range from guaranteed floor to projected upside.',
            month: 'Mar 2026',
          },
        ],
      },
    ],
  },
];

// ── Tokens ────────────────────────────────────────────────────────────────────

const NH = 'NewTheinhardt, sans-serif';
const CAM = 'Cambon, Georgia, serif';
const PORTADA = 'Portada, sans-serif';
const HAUSS = 'Hauss, sans-serif';

// ── Logo ──────────────────────────────────────────────────────────────────────

function EthosLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83 16" width="72" height="14">
      <path fill="white" d="M11.6369 0.200348V3.32171H3.07416V6.44307H10.5316V9.53622H3.07416V12.6852H11.6369V15.7784H0V0.200348H11.6369Z" />
      <path fill="white" d="M46.3605 9.53622V6.44307V3.32171V0.200348H43.2863V6.44307H36.3666V3.32171V0.200348H33.2924V15.7784H36.3666V12.6852V9.53622H43.2863V15.7784H46.3605V12.6852V9.53622Z" />
      <path fill="white" d="M23.9934 15.7784H20.9181V3.32171H15.9298V0.200348H28.9805V3.32171H23.9922V6.44307V15.7784" />
      <path fill="white" d="M82.5756 2.73281L80.2159 4.63257C80.2159 4.63257 79.106 2.86291 76.3565 2.86291C73.607 2.86291 73.7768 4.58248 73.7768 4.58248C73.7768 4.58248 73.6968 5.40226 74.6266 5.79257C75.5563 6.18231 77.5343 6.49778 78.4963 6.7626C79.2746 6.97675 80.4611 7.26978 81.3857 7.98362C82.3845 8.75504 82.8848 9.57597 82.8848 11.1522C82.8848 12.942 81.9257 13.9218 81.9257 13.9218C81.9257 13.9218 80.4156 16 76.8366 16C73.2576 16 71.4373 14.3714 71.4373 14.3714C71.4373 14.3714 70.4275 13.6317 69.7476 12.6415L72.3129 10.8114C72.3129 10.8114 73.4786 13.0773 76.8228 13.0773C80.1669 13.0773 79.559 11.0284 79.559 11.0284C79.559 11.0284 79.3823 10.2576 78.2344 9.9352C77.1388 9.62778 76.836 9.63411 74.2742 8.99395C71.0694 8.19375 70.477 5.90598 70.4811 4.75922C70.4845 3.73104 70.781 2.39143 72.3751 1.14392C73.9703 -0.104167 76.5488 0.00348611 76.5488 0.00348611C76.5488 0.00348611 80.0368 -0.210668 82.5756 2.73281Z" />
      <path fill="white" d="M55.203 11.2063C53.028 9.03135 51.6959 5.03092 54.1506 0.801941L53.0033 1.94928C49.8399 5.11267 49.8399 10.242 53.0033 13.4054C56.1673 16.5694 61.296 16.5694 64.46 13.4054L65.6073 12.2581C61.5798 14.5994 57.5719 13.5752 55.203 11.2063Z" />
      <path fill="white" d="M64.5872 1.82205C62.4261 -0.339649 58.9213 -0.339649 56.7591 1.82205C56.4465 2.13464 55.7959 2.86634 55.5737 3.22672C57.7072 1.91128 60.5379 2.17264 62.387 4.02231C64.2286 5.86393 64.4957 8.6773 63.1993 10.8079L63.5245 10.5609C63.8826 10.3007 64.3299 9.90869 64.5878 9.65078C66.7495 7.48909 66.7495 3.98489 64.5878 1.82262L64.5872 1.82205Z" />
    </svg>
  );
}

// ── GroupCard ─────────────────────────────────────────────────────────────────

function GroupCard({ group }: { group: PrototypeGroup }) {
  const [open, setOpen] = useState(false);

  return (
    <li style={{ marginBottom: '8px' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '11px 14px',
          background: open ? 'white' : 'white',
          borderRadius: open ? '10px 10px 0 0' : '10px',
          border: '1px solid #e4e4e2',
          cursor: 'pointer',
          transition: 'border-radius 0.15s',
          textAlign: 'left',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          <span style={{ fontFamily: NH, fontSize: '14px', fontWeight: 600, color: '#1a1a1a' }}>
            {group.name}
          </span>
          <span style={{ fontFamily: NH, fontSize: '12px', color: '#c0c0c0' }}>
            {group.variants.length}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {group.month && (
            <span style={{ fontFamily: NH, fontSize: '11px', color: '#b0b0b0' }}>{group.month}</span>
          )}
          <svg
            width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c0c0c0"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {open && (
        <ul style={{ border: '1px solid #e4e4e2', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden', listStyle: 'none', padding: 0, margin: 0, background: 'white' }}>
          {group.variants.map((v, i) => (
            <li key={v.path} style={{ borderTop: i > 0 ? '1px solid #f0f0f0' : undefined }}>
              <Link to={v.path} style={{ textDecoration: 'none', display: 'block' }} className="hover:bg-[#fafaf8] transition-colors">
                <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: NH, fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '2px' }}>{v.title}</p>
                    <p style={{ fontFamily: NH, fontSize: '12px', color: '#9e9e9e', lineHeight: '16px' }}>{v.description}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <span style={{ fontFamily: NH, fontSize: '11px', color: '#c0c0c0' }}>{v.month}</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#d0d0d0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

// ── SectionLabel ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '28px 0 10px' }}>
      <span style={{ fontFamily: CAM, fontSize: '18px', fontWeight: 700, color: '#1a1a1a' }}>
        {children}
      </span>
      <div style={{ flex: 1, height: '1px', background: '#e4e4e2' }} />
    </div>
  );
}

// ── Index ─────────────────────────────────────────────────────────────────────

export default function PrototypeIndex() {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f3ef' }}>

      {/* ── Hero header ── */}
      <div style={{ background: 'var(--dark-cypress)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px 28px 36px' }}>
        <EthosLogo />
        <h1 style={{ fontFamily: PORTADA, fontSize: '36px', fontWeight: 600, color: 'white', margin: '20px 0 8px', lineHeight: '42px', letterSpacing: '-0.5px' }}>
          Prototypes
        </h1>
        <p style={{ fontFamily: HAUSS, fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: '22px', margin: 0 }}>
          Design references and experiments.
        </p>
      </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '24px 20px 60px' }}>

        {/* Canonical — no section label, sits at top */}
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <GroupCard group={canonical} />
        </ul>

        {/* Product areas */}
        {productAreas.map((area) => (
          <section key={area.name}>
            <SectionLabel>{area.name}</SectionLabel>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {area.groups.map((g) => (
                <GroupCard key={g.name} group={g} />
              ))}
            </ul>
          </section>
        ))}

      </div>
    </div>
  );
}
