/**
 * PolicyV1Cards — Guaranteed vs Projected: Paired Cards
 *
 * Story: Coverage is locked in (same in both). Show it as the anchor,
 * then present cash value + death benefit as two equal-weight cards.
 * Compliance: guaranteed and projected labels are identical weight.
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

function PairedMetric({
  label,
  guaranteed,
  projected,
}: {
  label: string;
  guaranteed: string;
  projected: string;
}) {
  const base: React.CSSProperties = {
    flex: 1,
    borderRadius: '10px',
    border: '1px solid #e9e9e9',
    padding: '14px 14px 16px',
    background: 'white',
  };
  return (
    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
      <div style={base}>
        <div
          style={{
            fontFamily: NH,
            fontSize: '11px',
            letterSpacing: '0.07em',
            textTransform: 'uppercase' as const,
            color: '#1a1a1a',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          Guaranteed
        </div>
        <div style={{ fontFamily: NH, fontSize: '13px', color: '#7e7e7e', marginBottom: '5px' }}>{label}</div>
        <div style={{ fontFamily: CAM, fontSize: '24px', fontWeight: 700, color: '#1a1a1a' }}>{guaranteed}</div>
      </div>
      <div style={{ ...base, border: '1.5px solid var(--cypress)' }}>
        <div
          style={{
            fontFamily: NH,
            fontSize: '11px',
            letterSpacing: '0.07em',
            textTransform: 'uppercase' as const,
            color: 'var(--cypress)',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          Projected
        </div>
        <div style={{ fontFamily: NH, fontSize: '13px', color: '#7e7e7e', marginBottom: '5px' }}>{label}</div>
        <div style={{ fontFamily: CAM, fontSize: '24px', fontWeight: 700, color: '#1a1a1a' }}>{projected}</div>
      </div>
    </div>
  );
}

export default function PolicyV1Cards() {
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

          {/* Coverage anchor — the same in both scenarios */}
          <div
            style={{
              background: 'var(--cypress)',
              borderRadius: '12px',
              padding: '16px 20px',
              marginBottom: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div
                  style={{
                    fontFamily: NH,
                    fontSize: '11px',
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.6)',
                    marginBottom: '6px',
                  }}
                >
                  Coverage
                </div>
                <div
                  style={{ fontFamily: CAM, fontSize: '32px', fontWeight: 700, color: 'white', lineHeight: 1 }}
                >
                  {fmt(v.coverage)}
                </div>
              </div>
              <div
                style={{
                  background: 'rgba(255,255,255,0.18)',
                  borderRadius: '30px',
                  padding: '6px 12px',
                  flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: NH, fontSize: '11px', color: 'white', fontWeight: 500 }}>
                  Guaranteed &amp; projected
                </span>
              </div>
            </div>
          </div>

          {/* Cash value — equal paired cards */}
          <PairedMetric label="Cash value" guaranteed="$0" projected={fmt(v.cashProj)} />

          {/* Death benefit — equal paired cards */}
          <PairedMetric
            label="Death benefit"
            guaranteed={fmt(v.dbGuaranteed)}
            projected={fmt(v.dbProj)}
          />

          <p
            style={{
              fontFamily: NH,
              fontSize: '11px',
              color: '#b0b0b0',
              lineHeight: '16px',
              marginTop: '14px',
            }}
          >
            Guaranteed values assume worst-case market conditions. Projected assumes historical average index
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
