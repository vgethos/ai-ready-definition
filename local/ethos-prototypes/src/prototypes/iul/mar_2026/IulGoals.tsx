/**
 * IUL Onboarding — Goals Selection Screen
 * "Let's get started! What are your goals for life insurance?"
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneFrame from '../../../components/PhoneFrame';

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

const GOALS = [
  {
    id: 'protect',
    title: 'Protect my loved ones',
    description: "Cover your family's needs (tuition, mortgage, living expenses, etc.)",
  },
  {
    id: 'grow',
    title: 'Grow my wealth',
    description: 'Invest more to build tax-advantaged wealth you can tap into later.',
  },
  {
    id: 'both',
    title: 'Both',
    description: 'Protect your loved ones and grow your wealth—all in one policy.',
  },
] as const;

type GoalId = typeof GOALS[number]['id'];

export default function IulGoals() {
  const [selected, setSelected] = useState<GoalId>('protect');

  return (
    <>
      <PhoneFrame>
        {/* Inner flex column so the sticky footer stays inside the frame */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '750px' }}>

          {/* ── Header ─────────────────────────────────────── */}
          <header style={{ background: '#fff', padding: '16px 20px 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Logo */}
              <EthosLogo />

              {/* Help */}
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '11px',
                  color: 'var(--night-60)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  justifyContent: 'flex-end',
                  marginBottom: '2px',
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                  Need help?
                </div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--cypress)',
                }}>
                  (415) 915-0665
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              marginTop: '14px',
              height: '3px',
              background: 'var(--night-10)',
              borderRadius: '2px',
            }}>
              <div style={{
                width: '15%',
                height: '100%',
                background: 'var(--cypress)',
                borderRadius: '2px',
                transition: 'width 0.4s ease',
              }} />
            </div>
          </header>

          {/* ── Scrollable content ─────────────────────────── */}
          <main style={{ flex: 1, overflowY: 'auto', padding: '28px 20px 20px' }}>
            <h1 style={{
              fontFamily: 'Cambon, Georgia, serif',
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--night-100)',
              lineHeight: '31px',
              margin: '0 0 24px',
            }}>
              Let's get started! What are your goals for life insurance?
            </h1>

            {/* Goal cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {GOALS.map((goal) => {
                const active = selected === goal.id;
                return (
                  <button
                    key={goal.id}
                    onClick={() => setSelected(goal.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '15px 18px',
                      borderRadius: '4px',
                      border: 'none',
                      background: active ? 'var(--cypress)' : 'var(--night-5)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                      boxShadow: active ? '0 2px 8px rgba(5,98,87,0.18)' : 'none',
                    }}
                  >
                    <div style={{
                      fontWeight: 500,
                      fontSize: '18px',
                      color: active ? '#fff' : 'var(--night-100)',
                      marginBottom: '5px',
                      lineHeight: '26px',
                      fontFamily: 'NewTheinhardt, sans-serif',
                    }}>
                      {goal.title}
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 400,
                      color: active ? 'rgba(255,255,255,0.82)' : 'var(--night-60)',
                      lineHeight: '24px',
                      fontFamily: 'NewTheinhardt, sans-serif',
                    }}>
                      {goal.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </main>

          {/* ── Sticky footer ──────────────────────────────── */}
          <footer style={{ flexShrink: 0, padding: '12px 20px 20px', background: '#fff' }}>
            <button
              style={{
                display: 'block',
                width: '100%',
                padding: '18px',
                background: '#1a1a1a',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 500,
                fontFamily: 'NewTheinhardt, sans-serif',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                letterSpacing: '0.01em',
              }}
            >
              Next
            </button>
          </footer>

        </div>
      </PhoneFrame>

      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Link to="/" style={{ fontSize: '12px', color: '#7e7e7e', textDecoration: 'underline' }}>
          ← All prototypes
        </Link>
      </div>
    </>
  );
}
