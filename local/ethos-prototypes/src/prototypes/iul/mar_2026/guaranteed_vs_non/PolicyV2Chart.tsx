/**
 * PolicyV2Chart — Guaranteed vs Projected: Growth Chart
 *
 * Story: Show cash value building over 20 years as two lines.
 * Both lines equally prominent. Temporal story replaces static table.
 * Compliance: both scenarios shown with equal visual weight in legend + summary.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneFrame from '../../../../components/PhoneFrame';
import { type } from '../../../../styles';

const NH = 'NewTheinhardt, sans-serif';
const CAM = 'Cambon, Georgia, serif';
const CYPRESS = 'var(--cypress)';

// Chart geometry constants
const CW = 290; // chart width
const CH = 120; // chart height
const TOP_PAD = 14; // padding so projected line doesn't clip the top

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return `$${Math.round(n / 1_000)}K`;
}

function computeVals(p: number) {
  const coverage = Math.round((p * 866) / 1000) * 1000;
  const cashProj = Math.round((p * 310) / 1000) * 1000;
  return {
    coverage,
    cashProj,
    dbGuaranteed: coverage,
    dbProj: coverage + cashProj,
  };
}

// Convert (year, cashValue) to SVG y-coordinate
function toY(val: number, maxVal: number): number {
  return CH - (val / maxVal) * (CH - TOP_PAD);
}

// Projected cash value curve: power growth (^1.5 feels realistic for IUL)
function projectedLinePath(cashProj: number): string {
  const maxVal = cashProj * 1.18;
  const pts: string[] = [];
  for (let t = 0; t <= 20; t += 0.5) {
    const val = cashProj * Math.pow(t / 20, 1.5);
    const x = (t / 20) * CW;
    const y = toY(val, maxVal);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return 'M ' + pts.join(' L ');
}

// Area fill under projected curve
function projectedAreaPath(cashProj: number): string {
  const maxVal = cashProj * 1.18;
  const pts: string[] = [];
  for (let t = 0; t <= 20; t += 0.5) {
    const val = cashProj * Math.pow(t / 20, 1.5);
    const x = (t / 20) * CW;
    const y = toY(val, maxVal);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M 0,${CH} L ${pts.join(' L ')} L ${CW},${CH} Z`;
}

// Y position of projected line at year 20
function projectedEndY(cashProj: number): number {
  return toY(cashProj, cashProj * 1.18);
}

function ScreenHeader() {
  return (
    <>
      <div style={{ height: '4px', background: '#e9e9e9' }}>
        <div style={{ width: '72%', height: '100%', background: 'var(--cypress)' }} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          background: 'white',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <span style={{ fontSize: '20px', lineHeight: 1, color: '#1a1a1a', cursor: 'pointer' }}>←</span>
        <span style={{ fontFamily: CAM, fontSize: '15px', fontWeight: 700, letterSpacing: '0.1em', color: '#1a1a1a' }}>
          ETHOS
        </span>
        <div style={{ fontFamily: NH, fontSize: '10px', color: '#7e7e7e', textAlign: 'right' }}>
          <div style={{ fontWeight: 600, color: '#1a1a1a', fontSize: '11px' }}>NEED HELP?</div>
          <div>(415) 275-9050</div>
        </div>
      </div>
    </>
  );
}

function QuestionSlider({
  payment,
  setPayment,
}: {
  payment: number;
  setPayment: (n: number) => void;
}) {
  return (
    <div style={{ padding: '22px 20px 20px', background: 'white' }}>
      <h1 style={{ ...type.h1, marginBottom: '10px' }}>
        How much do you want to put into your IUL each month?
      </h1>
      <p style={{ fontFamily: NH, fontSize: '15px', color: '#5d5d5d', lineHeight: '21px', marginBottom: '22px' }}>
        This payment grows your policy over time—some of which you can access tax-free while alive.
      </p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '2px',
        }}
      >
        <div>
          <div style={{ fontFamily: NH, fontSize: '16px', fontWeight: 500, color: '#1a1a1a' }}>
            Monthly payment
          </div>
          <div style={{ fontFamily: NH, fontSize: '13px', color: '#7e7e7e' }}>You only pay until age [65]</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: NH, fontSize: '24px', fontWeight: 600, color: '#1a1a1a' }}>${payment}</div>
          <div style={{ fontFamily: NH, fontSize: '13px', color: '#7e7e7e' }}>
            ${(payment / 30).toFixed(2)} per day
          </div>
        </div>
      </div>
      <input
        type="range"
        min={100}
        max={1000}
        step={10}
        value={payment}
        onChange={(e) => setPayment(Number(e.target.value))}
        style={{ width: '100%', accentColor: 'var(--cypress)', margin: '10px 0 4px', cursor: 'pointer' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: NH, fontSize: '13px', color: '#7e7e7e' }}>$100</span>
        <span style={{ fontFamily: NH, fontSize: '13px', color: '#7e7e7e' }}>$1,000</span>
      </div>
    </div>
  );
}

export default function PolicyV2Chart() {
  const [payment, setPayment] = useState(500);
  const v = computeVals(payment);
  const endY = projectedEndY(v.cashProj);

  const summaryMetrics = [
    { label: 'Coverage', g: fmt(v.coverage), p: fmt(v.coverage) },
    { label: 'Cash value', g: '$0', p: fmt(v.cashProj) },
    { label: 'Death benefit', g: fmt(v.dbGuaranteed), p: fmt(v.dbProj) },
  ];

  return (
    <div className="min-h-screen" style={{ background: '#e5e5e7', padding: '24px 16px' }}>
      <PhoneFrame>
        <ScreenHeader />
        <QuestionSlider payment={payment} setPayment={setPayment} />

        {/* Policy in 20 years */}
        <div style={{ padding: '20px', background: '#f8f8f6', borderTop: '1px solid #efefed' }}>
          <p
            style={{
              fontFamily: NH,
              fontSize: '11px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#7e7e7e',
              marginBottom: '4px',
              fontWeight: 600,
            }}
          >
            Your policy in 20 years
          </p>
          <p style={{ fontFamily: NH, fontSize: '14px', color: '#3a3a3a', marginBottom: '14px', fontWeight: 500 }}>
            Cash value growth over time
          </p>

          {/* Legend — equal weight */}
          <div style={{ display: 'flex', gap: '18px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <svg width="22" height="8" viewBox="0 0 22 8">
                <line
                  x1="0"
                  y1="4"
                  x2="22"
                  y2="4"
                  stroke="#888"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ fontFamily: NH, fontSize: '12px', color: '#5d5d5d', fontWeight: 500 }}>
                Guaranteed
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <svg width="22" height="8" viewBox="0 0 22 8">
                <line
                  x1="0"
                  y1="4"
                  x2="22"
                  y2="4"
                  stroke={CYPRESS}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
              <span style={{ fontFamily: NH, fontSize: '12px', color: '#5d5d5d', fontWeight: 500 }}>
                Projected
              </span>
            </div>
          </div>

          {/* SVG Chart — viewBox extended right for end-value labels */}
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '16px 16px 14px',
              border: '1px solid #e9e9e9',
              marginBottom: '16px',
            }}
          >
            <svg viewBox="0 0 340 150" style={{ width: '100%', overflow: 'visible' }}>
              {/* Horizontal grid lines */}
              <line x1="0" y1={CH} x2={CW} y2={CH} stroke="#efefef" strokeWidth="1" />
              <line x1="0" y1={CH * 0.67} x2={CW} y2={CH * 0.67} stroke="#efefef" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="0" y1={CH * 0.33} x2={CW} y2={CH * 0.33} stroke="#efefef" strokeWidth="1" strokeDasharray="4 3" />

              {/* Area fill under projected line */}
              <path d={projectedAreaPath(v.cashProj)} fill={CYPRESS} fillOpacity="0.07" />

              {/* Guaranteed line (flat at bottom — $0 cash value) */}
              <line
                x1="0"
                y1={CH}
                x2={CW}
                y2={CH}
                stroke="#aaaaaa"
                strokeWidth="2"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />

              {/* Projected line */}
              <path
                d={projectedLinePath(v.cashProj)}
                fill="none"
                stroke={CYPRESS}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* End-value dot: projected */}
              <circle cx={CW} cy={endY} r="4" fill={CYPRESS} />
              {/* End-value dot: guaranteed */}
              <circle cx={CW} cy={CH} r="4" fill="#aaaaaa" />

              {/* Right-side value labels */}
              <text
                x={CW + 10}
                y={endY + 4}
                fontFamily={NH}
                fontSize="11"
                fill={CYPRESS}
                fontWeight="600"
              >
                {fmt(v.cashProj)}
              </text>
              <text x={CW + 10} y={CH + 4} fontFamily={NH} fontSize="11" fill="#888">
                $0
              </text>

              {/* X-axis labels */}
              <text x="0" y="142" fontFamily={NH} fontSize="10" fill="#b0b0b0">
                Year 0
              </text>
              <text x={CW - 34} y="142" fontFamily={NH} fontSize="10" fill="#b0b0b0">
                Year 20
              </text>
            </svg>
          </div>

          {/* Summary: all three metrics, both scenarios */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '14px' }}>
            {summaryMetrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  border: '1px solid #e9e9e9',
                  padding: '10px 10px 12px',
                }}
              >
                <div
                  style={{
                    fontFamily: NH,
                    fontSize: '10px',
                    color: '#9e9e9e',
                    marginBottom: '9px',
                    lineHeight: '13px',
                  }}
                >
                  {m.label}
                </div>
                <div style={{ fontFamily: NH, fontSize: '9px', color: '#888', marginBottom: '2px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Guar.
                </div>
                <div
                  style={{
                    fontFamily: CAM,
                    fontSize: '15px',
                    fontWeight: 700,
                    color: '#1a1a1a',
                    marginBottom: '7px',
                  }}
                >
                  {m.g}
                </div>
                <div style={{ fontFamily: NH, fontSize: '9px', color: 'var(--cypress)', marginBottom: '2px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  Proj.
                </div>
                <div style={{ fontFamily: CAM, fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>
                  {m.p}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: NH,
              fontSize: '11px',
              color: '#b0b0b0',
              lineHeight: '16px',
            }}
          >
            Guaranteed assumes worst-case market conditions. Projected assumes historical average index
            performance.
          </p>
        </div>
      </PhoneFrame>

      <div className="text-center mt-6">
        <Link to="/" className="text-xs text-[#7e7e7e] underline hover:text-[#056257]">
          ← All prototypes
        </Link>
      </div>
    </div>
  );
}
