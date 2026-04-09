/**
 * IUL LP — Control reference
 * Canonical baseline for the IUL paid landing page (Meta).
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../eds';
import PhoneFrame from '../../../components/PhoneFrame';
import { lp } from '../../../styles';

// ── Real Ethos logo SVG (white, sourced from ethos.com) ───────────────────────
function EthosLogo() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 83 16" width="83" height="16">
      <path fill="white" d="M11.6369 0.200348V3.32171H3.07416V6.44307H10.5316V9.53622H3.07416V12.6852H11.6369V15.7784H0V0.200348H11.6369Z" />
      <path fill="white" d="M46.3605 9.53622V6.44307V3.32171V0.200348H43.2863V6.44307H36.3666V3.32171V0.200348H33.2924V15.7784H36.3666V12.6852V9.53622H43.2863V15.7784H46.3605V12.6852V9.53622Z" />
      <path fill="white" d="M23.9934 15.7784H20.9181V3.32171H15.9298V0.200348H28.9805V3.32171H23.9922V6.44307V15.7784" />
      <path fill="white" d="M82.5756 2.73281L80.2159 4.63257C80.2159 4.63257 79.106 2.86291 76.3565 2.86291C73.607 2.86291 73.7768 4.58248 73.7768 4.58248C73.7768 4.58248 73.6968 5.40226 74.6266 5.79257C75.5563 6.18231 77.5343 6.49778 78.4963 6.7626C79.2746 6.97675 80.4611 7.26978 81.3857 7.98362C82.3845 8.75504 82.8848 9.57597 82.8848 11.1522C82.8848 12.942 81.9257 13.9218 81.9257 13.9218C81.9257 13.9218 80.4156 16 76.8366 16C73.2576 16 71.4373 14.3714 71.4373 14.3714C71.4373 14.3714 70.4275 13.6317 69.7476 12.6415L72.3129 10.8114C72.3129 10.8114 73.4786 13.0773 76.8228 13.0773C80.1669 13.0773 79.559 11.0284 79.559 11.0284C79.559 11.0284 79.3823 10.2576 78.2344 9.9352C77.1388 9.62778 76.836 9.63411 74.2742 8.99395C71.0694 8.19375 70.477 5.90598 70.4811 4.75922C70.4845 3.73104 70.781 2.39143 72.3751 1.14392C73.9703 -0.104167 76.5488 0.00348611 76.5488 0.00348611C76.5488 0.00348611 80.0368 -0.210668 82.5756 2.73281Z" />
      <path fill="white" d="M55.203 11.2063C53.028 9.03135 51.6959 5.03092 54.1506 0.801941L53.0033 1.94928C49.8399 5.11267 49.8399 10.242 53.0033 13.4054C56.1673 16.5694 61.296 16.5694 64.46 13.4054L65.6073 12.2581C61.5798 14.5994 57.5719 13.5752 55.203 11.2063Z" />
      <path fill="white" d="M64.5872 1.82205C62.4261 -0.339649 58.9213 -0.339649 56.7591 1.82205C56.4465 2.13464 55.7959 2.86634 55.5737 3.22672C57.7072 1.91128 60.5379 2.17264 62.387 4.02231C64.2286 5.86393 64.4957 8.6773 63.1993 10.8079L63.5245 10.5609C63.8826 10.3007 64.3299 9.90869 64.5878 9.65078C66.7495 7.48909 66.7495 3.98489 64.5878 1.82262L64.5872 1.82205Z" />
    </svg>
  );
}

// ── Trust badges (real SVGs from ethos.com, stored in public/) ───────────────
function TrustBadges() {
  return (
    <div className="flex gap-3 mt-5">
      <img src="/wreath--trusted-bi.svg" alt="Best Term Life Insurance — Business Insider" style={{ flex: 1, height: 'auto' }} />
      <img src="/wreath--trusted.svg" alt="Trusted Provider — Forbes Advisor" style={{ flex: 1, height: 'auto' }} />
    </div>
  );
}

// ── Trustpilot strip (sourced from real page) ─────────────────────────────────
function TrustpilotStrip() {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span style={{ fontFamily: 'Portada, sans-serif', fontSize: '15px', fontWeight: 700, color: 'white' }}>4.8</span>
      {/* Real Trustpilot 5-star image from ethos.com CDN */}
      <img
        src="https://www.ethos.com/_next/static/media/trust-pilot-5-star.02f958ab.svg"
        alt="5 stars"
        style={{ height: '14px', width: 'auto' }}
      />
      <span style={{ fontFamily: 'Portada, sans-serif', fontSize: '14px', fontWeight: 400, color: 'rgba(255,255,255,0.85)' }}>
        <strong>3500+</strong> reviews on Trustpilot
      </span>
    </div>
  );
}


// ── Content Cards section ─────────────────────────────────────────────────────
function ContentCards({ onCtaClick }: { onCtaClick: () => void }) {
  const cards = [
    {
      title: 'Market-based growth',
      desc: 'Your IUL grows with the stock market, and has built-in loss protection.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
    },
    {
      title: 'Money you can use',
      desc: "Put it to use while you're alive—for early retirement, tuition, and more.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="10" width="18" height="11" rx="2" />
          <path d="M7 10V7a5 5 0 0 1 10 0v3" />
          <circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      title: 'Lifelong coverage',
      desc: 'Your loved ones get a guaranteed payout—no matter when you die.',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ background: '#faf9f5', padding: '32px 20px 28px' }}>
      <p style={{ ...lp.displayM, color: 'rgb(39, 39, 39)', marginBottom: '8px', textAlign: 'center' }}>
        What you get with an IUL
      </p>
      <p style={{ ...lp.bodyM, color: 'rgb(39, 39, 39)', marginBottom: '24px', textAlign: 'center' }}>
        IUL is permanent life insurance that also builds tax-advantaged wealth.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
        {cards.map(card => (
          <div key={card.title} style={{ border: '1px solid #e5e5e5', borderRadius: '10px', padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'white', textAlign: 'center' }}>
            <div style={{ color: '#05594F' }}>{card.icon}</div>
            <div style={{ fontFamily: 'Hauss, sans-serif', fontSize: '19px', fontWeight: 500, color: '#05594F', lineHeight: '24px' }}>{card.title}</div>
            <div style={{ fontFamily: 'Hauss, sans-serif', fontSize: '16px', fontWeight: 400, color: '#5d5d5d', lineHeight: '20px' }}>{card.desc}</div>
          </div>
        ))}
      </div>
      <div onClick={onCtaClick}>
        <Button buttonTitle="Check my price" variant="primaryDark" size="md" />
      </div>
    </div>
  );
}

// ── Google rating + testimonial ───────────────────────────────────────────────
function TestimonialSection({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <div style={{ background: 'white', padding: '32px 20px 28px', borderTop: '1px solid #f0f0f0' }}>
      {/* Google rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
        {/* Google G */}
        <svg width="28" height="28" viewBox="0 0 48 48">
          <path fill="#4285F4" d="M24 9.5c3.2 0 5.9 1.1 8.1 2.9l6-6C34.5 3.1 29.6 1 24 1 14.8 1 7 6.7 3.7 14.7l7 5.4C12.4 14 17.7 9.5 24 9.5z" />
          <path fill="#34A853" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.3 5.7c4.3-3.9 6.8-9.7 6.8-16.9z" />
          <path fill="#FBBC05" d="M10.7 28.4A14.9 14.9 0 0 1 9.5 24c0-1.5.3-3 .7-4.4l-7-5.4A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l8.1-6.3z" />
          <path fill="#EA4335" d="M24 47c5.4 0 10-1.8 13.3-4.8l-7.3-5.7c-1.7 1.1-3.8 1.8-6 1.8-6.3 0-11.6-4.3-13.5-10.1l-8.1 6.3C7 42.2 14.9 47 24 47z" />
        </svg>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: 'Hauss, sans-serif', fontSize: '15px', fontWeight: 700, color: '#1a1a1a' }}>4.6/5</span>
            <div style={{ display: 'flex', gap: '1px' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#FBBC05">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
          <div style={{ fontFamily: 'Hauss, sans-serif', fontSize: '12px', color: '#888', lineHeight: '16px' }}>1,070+ reviews</div>
        </div>
      </div>
      {/* Quote */}
      <blockquote style={{ fontFamily: 'Portada, sans-serif', fontSize: '20px', fontWeight: 600, color: '#1a1a1a', lineHeight: '28px', margin: '0 0 16px', fontStyle: 'normal' }}>
        "Loved how easy it was to compare and customize the policy coverage amount."
      </blockquote>
      <div style={{ fontFamily: 'Hauss, sans-serif', fontSize: '14px', color: '#5c5c5c' }}>
        <strong style={{ color: '#1a1a1a' }}>Mike Chapman</strong><br />February 2022
      </div>
      <div style={{ borderTop: '1px solid #e5e5e5', margin: '24px 0' }} />
      <div onClick={onCtaClick}>
        <Button buttonTitle="See my growth potential" variant="primaryDark" size="md" />
      </div>
    </div>
  );
}

// ── Main prototype ────────────────────────────────────────────────────────────
export default function MetaLpCtaV1() {
  const [clicked, setClicked] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: '#e5e5e7', padding: '24px 16px' }}>
      <PhoneFrame>
        {/* Header — white Ethos logo on cypress */}
        <div className="flex items-center justify-center py-4 px-5" style={{ background: 'var(--cypress)' }}>
          <EthosLogo />
        </div>

        {/* Hero */}
        <div className="px-5 pb-7" style={{ background: 'var(--cypress)' }}>
          <div style={{ paddingTop: '20px' }}>
            <TrustpilotStrip />
          </div>

          <h1 className="text-white mb-3" style={{ ...lp.displayM, textAlign: 'center' }}>
            Grow wealth with<br />Indexed Universal Life
          </h1>
          <p style={{ ...lp.bodyL, color: 'rgba(255,255,255,0.9)', marginBottom: '24px', textAlign: 'center' }}>
            Build tax-advantaged wealth and protect your family.
          </p>

          <div onClick={() => setClicked('primary')}>
            <Button buttonTitle="Check my price" variant="clover" size="md" />
          </div>

          <TrustBadges />
        </div>

        {/* Click feedback */}
        {clicked && (
          <div className="px-5 py-4 bg-[#f3f7f7] border-t border-[#e9e9e9] text-center">
            <p className="text-xs text-[#056257] font-medium">
              {clicked === 'primary' ? '→ Primary CTA clicked' : '→ Secondary CTA clicked'}
            </p>
          </div>
        )}

        {/* Below-hero page content */}
        <ContentCards onCtaClick={() => setClicked('cta-cards')} />
        <TestimonialSection onCtaClick={() => setClicked('cta-testimonial')} />
      </PhoneFrame>

      <div className="text-center mt-6">
        <Link to="/" className="text-xs text-[#7e7e7e] underline hover:text-[#056257]">← All prototypes</Link>
      </div>
    </div>
  );
}
