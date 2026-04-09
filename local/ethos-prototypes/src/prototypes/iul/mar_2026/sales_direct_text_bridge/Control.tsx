/**
 * Control — Sales Direct: Passive Wait Page (current live experience)
 * "We'll call you in 10 minutes." No text mention, no scheduling.
 */
import { Link } from 'react-router-dom';
import PhoneFrame from '../../../../components/PhoneFrame';
import { type } from '../../../../styles';

const NH = 'NewTheinhardt, sans-serif';

function EthosLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83 16" width="83" height="16">
      <path fill="var(--cypress)" d="M11.6369 0.200348V3.32171H3.07416V6.44307H10.5316V9.53622H3.07416V12.6852H11.6369V15.7784H0V0.200348H11.6369Z" />
      <path fill="var(--cypress)" d="M46.3605 9.53622V6.44307V3.32171V0.200348H43.2863V6.44307H36.3666V3.32171V0.200348H33.2924V15.7784H36.3666V12.6852V9.53622H43.2863V15.7784H46.3605V12.6852V9.53622Z" />
      <path fill="var(--cypress)" d="M23.9934 15.7784H20.9181V3.32171H15.9298V0.200348H28.9805V3.32171H23.9922V6.44307V15.7784" />
      <path fill="var(--cypress)" d="M82.5756 2.73281L80.2159 4.63257C80.2159 4.63257 79.106 2.86291 76.3565 2.86291C73.607 2.86291 73.7768 4.58248 73.7768 4.58248C73.7768 4.58248 73.6968 5.40226 74.6266 5.79257C75.5563 6.18231 77.5343 6.49778 78.4963 6.7626C79.2746 6.97675 80.4611 7.26978 81.3857 7.98362C82.3845 8.75504 82.8848 9.57597 82.8848 11.1522C82.8848 12.942 81.9257 13.9218 81.9257 13.9218C81.9257 13.9218 80.4156 16 76.8366 16C73.2576 16 71.4373 14.3714 71.4373 14.3714C71.4373 14.3714 70.4275 13.6317 69.7476 12.6415L72.3129 10.8114C72.3129 10.8114 73.4786 13.0773 76.8228 13.0773C80.1669 13.0773 79.559 11.0284 79.559 11.0284C79.559 11.0284 79.3823 10.2576 78.2344 9.9352C77.1388 9.62778 76.836 9.63411 74.2742 8.99395C71.0694 8.19375 70.477 5.90598 70.4811 4.75922C70.4845 3.73104 70.781 2.39143 72.3751 1.14392C73.9703 -0.104167 76.5488 0.00348611 76.5488 0.00348611C76.5488 0.00348611 80.0368 -0.210668 82.5756 2.73281Z" />
      <path fill="var(--cypress)" d="M55.203 11.2063C53.028 9.03135 51.6959 5.03092 54.1506 0.801941L53.0033 1.94928C49.8399 5.11267 49.8399 10.242 53.0033 13.4054C56.1673 16.5694 61.296 16.5694 64.46 13.4054L65.6073 12.2581C61.5798 14.5994 57.5719 13.5752 55.203 11.2063Z" />
      <path fill="var(--cypress)" d="M64.5872 1.82205C62.4261 -0.339649 58.9213 -0.339649 56.7591 1.82205C56.4465 2.13464 55.7959 2.86634 55.5737 3.22672C57.7072 1.91128 60.5379 2.17264 62.387 4.02231C64.2286 5.86393 64.4957 8.6773 63.1993 10.8079L63.5245 10.5609C63.8826 10.3007 64.3299 9.90869 64.5878 9.65078C66.7495 7.48909 66.7495 3.98489 64.5878 1.82262L64.5872 1.82205Z" />
    </svg>
  );
}

const VARIANTS = [
  { label: 'Control', path: '/iul/sales-direct-text-bridge/control' },
  { label: 'V1 — Schedule', path: '/iul/sales-direct-text-bridge/v1' },
  { label: 'V2 — Low Commit', path: '/iul/sales-direct-text-bridge/v2' },
  { label: 'V4 — Value', path: '/iul/sales-direct-text-bridge/v4' },
];

function VariantNav({ current }: { current: string }) {
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }}>
      {VARIANTS.map(({ label, path }) => {
        const active = path === current;
        return (
          <Link
            key={path}
            to={path}
            style={{
              fontFamily: NH,
              fontSize: '11px',
              fontWeight: active ? 600 : 400,
              padding: '5px 11px',
              borderRadius: '20px',
              border: `1px solid ${active ? 'var(--cypress)' : '#d4d4d4'}`,
              textDecoration: 'none',
              color: active ? 'white' : '#7e7e7e',
              background: active ? 'var(--cypress)' : 'white',
              whiteSpace: 'nowrap' as const,
            }}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}

function TopBar() {
  return (
    <header style={{ background: '#fff', padding: '16px 20px 0', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <EthosLogo />
      </div>
    </header>
  );
}

function AgentAvatar() {
  return (
    <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 24px' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--cypress)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 24 24" width="38" height="38" fill="white">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" />
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderRadius: '50%', background: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid white' }}>
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
  );
}

export default function Control() {
  return (
    <div className="min-h-screen" style={{ background: '#e5e5e7', padding: '24px 16px' }}>
      <VariantNav current="/iul/sales-direct-text-bridge/control" />
      <PhoneFrame>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '660px', background: 'white' }}>
          <TopBar />
          <div style={{ flex: 1, padding: '32px 24px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AgentAvatar />
            <h1 style={{ ...type.h1, textAlign: 'center', marginBottom: '16px' }}>
              Great news - you've been pre-approved for Indexed Universal Life!
            </h1>
            <p style={{ ...type.cardDescription, textAlign: 'center', color: '#5d5d5d', lineHeight: '26px' }}>
              Get ready to grow your savings while protecting your family. We'll call you in 10 minutes to get you approved and design the right plan.
            </p>
          </div>
          <div style={{ padding: '24px 24px 40px' }}>
            <button
              style={{
                width: '100%',
                background: 'white',
                border: '1px solid #c8c8c8',
                borderRadius: '8px',
                padding: '18px',
                fontSize: '18px',
                fontWeight: 500,
                fontFamily: NH,
                cursor: 'pointer',
                color: '#1a1a1a',
              }}
            >
              Skip the line—call now
            </button>
          </div>
        </div>
      </PhoneFrame>
      <div className="text-center mt-6">
        <Link to="/" style={{ fontFamily: NH, fontSize: '12px', color: '#7e7e7e', textDecoration: 'underline' }}>
          ← All prototypes
        </Link>
      </div>
    </div>
  );
}
