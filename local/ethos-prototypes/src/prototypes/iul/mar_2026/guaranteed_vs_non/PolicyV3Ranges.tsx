/**
 * PolicyV3Ranges — Guaranteed vs Projected: Metric Range Cards
 *
 * Story: Each metric gets its own card with both values shown at equal weight.
 * A range bar visualizes the spread. Coverage shows full alignment (solid bar).
 * Cash value + death benefit show the potential upside as an unfilled zone.
 * Compliance: both values same font size/weight, both labeled.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneFrame from '../../../../components/PhoneFrame';
import { type } from '../../../../styles';

const NH = 'NewTheinhardt, sans-serif';
const CAM = 'Cambon, Georgia, serif';

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

// Range card — shows two values with equal visual weight + a range bar
function RangeCard({
  label,
  gValue,
  pValue,
  gRaw,
  pRaw,
  isMatch = false,
}: {
  label: string;
  gValue: string;
  pValue: string;
  gRaw: number;
  pRaw: number;
  isMatch?: boolean;
}) {
  // For the range bar: guaranteed position as % of projected (max)
  const gPct = pRaw > 0 ? Math.min((gRaw / pRaw) * 100, 100) : 100;

  const valueStyle: React.CSSProperties = {
    fontFamily: CAM,
    fontSize: '26px',
    fontWeight: 700,
    color: '#1a1a1a',
    lineHeight: 1,
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: NH,
    fontSize: '11px',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    fontWeight: 600,
    marginBottom: '5px',
  };

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e9e9e9',
        padding: '16px 18px 18px',
        marginBottom: '10px',
      }}
    >
      {/* Metric label */}
      <div style={{ fontFamily: NH, fontSize: '13px', color: '#9e9e9e', marginBottom: '14px' }}>
        {label}
      </div>

      {isMatch ? (
        /* Coverage: same in both — single centered value */
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '14px' }}>
          <div>
            <div style={{ ...labelStyle, color: '#1a1a1a' }}>Guaranteed</div>
            <div style={valueStyle}>{gValue}</div>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              background: '#f0f8f6',
              borderRadius: '20px',
              padding: '5px 11px',
              marginBottom: '4px',
            }}
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--cypress)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={{ fontFamily: NH, fontSize: '11px', color: 'var(--cypress)', fontWeight: 500 }}>
              Same in both
            </span>
          </div>
          <div>
            <div style={{ ...labelStyle, color: 'var(--cypress)', textAlign: 'right' }}>Projected</div>
            <div style={{ ...valueStyle, textAlign: 'right' }}>{pValue}</div>
          </div>
        </div>
      ) : (
        /* Cash value / Death benefit: show both values */
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '14px' }}>
          <div>
            <div style={{ ...labelStyle, color: '#1a1a1a' }}>Guaranteed</div>
            <div style={valueStyle}>{gValue}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...labelStyle, color: 'var(--cypress)' }}>Projected</div>
            <div style={{ ...valueStyle, textAlign: 'right' }}>{pValue}</div>
          </div>
        </div>
      )}

      {/* Range bar */}
      <div style={{ height: '6px', background: '#f0f0f0', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
        {isMatch ? (
          /* Full solid bar for matched values */
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'var(--cypress)',
              borderRadius: '3px',
            }}
          />
        ) : (
          <>
            {/* Guaranteed zone (gray fill) */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${gPct}%`,
                background: '#c8c8c8',
                borderRadius: '3px 0 0 3px',
              }}
            />
            {/* Upside zone (cypress fill) */}
            <div
              style={{
                position: 'absolute',
                left: `${gPct}%`,
                top: 0,
                bottom: 0,
                right: 0,
                background: 'var(--cypress)',
                borderRadius: '0 3px 3px 0',
              }}
            />
          </>
        )}
      </div>

      {/* Bar labels */}
      {!isMatch && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '5px',
          }}
        >
          <span style={{ fontFamily: NH, fontSize: '10px', color: '#aaa' }}>Guaranteed floor</span>
          <span style={{ fontFamily: NH, fontSize: '10px', color: 'var(--cypress)' }}>Projected upside</span>
        </div>
      )}
    </div>
  );
}

export default function PolicyV3Ranges() {
  const [payment, setPayment] = useState(500);
  const v = computeVals(payment);

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
              marginBottom: '14px',
              fontWeight: 600,
            }}
          >
            Your policy in 20 years
          </p>

          {/* Coverage — same in both */}
          <RangeCard
            label="Coverage"
            gValue={fmt(v.coverage)}
            pValue={fmt(v.coverage)}
            gRaw={v.coverage}
            pRaw={v.coverage}
            isMatch={true}
          />

          {/* Cash value */}
          <RangeCard
            label="Cash value"
            gValue="$0"
            pValue={fmt(v.cashProj)}
            gRaw={0}
            pRaw={v.cashProj}
          />

          {/* Death benefit */}
          <RangeCard
            label="Death benefit"
            gValue={fmt(v.dbGuaranteed)}
            pValue={fmt(v.dbProj)}
            gRaw={v.dbGuaranteed}
            pRaw={v.dbProj}
          />

          <p
            style={{
              fontFamily: NH,
              fontSize: '11px',
              color: '#b0b0b0',
              lineHeight: '16px',
              marginTop: '4px',
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
