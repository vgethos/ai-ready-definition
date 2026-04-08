"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function L5ToolSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 5
        </span>
        <h2 className="font-serif text-3xl text-ink">
          The Funnel Capture Tool
        </h2>
      </motion.div>

      {/* Split-screen panels */}
      <div className="flex gap-5 w-full max-w-5xl">
        {/* LEFT: Mock browser */}
        <motion.div
          className="w-[60%] rounded-2xl overflow-hidden shadow-lg bg-white"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#e8e8e8]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 ml-3 px-3 py-1 rounded-md bg-white text-xs text-ink-60 font-mono">
              ethos.com/apply
            </div>
          </div>

          {/* Browser content — mock form */}
          <div className="bg-white p-8 min-h-[320px]">
            <div className="text-ink text-lg font-semibold mb-1">
              Life insurance that&apos;s actually easy.
            </div>
            <div className="text-[14px] text-ink-60 mb-6">
              Get a quote in minutes — no medical exam required.
            </div>

            {/* Mock form fields */}
            <div className="space-y-4">
              <div>
                <div className="text-[11px] text-ink-40 uppercase tracking-[1.5px] font-medium mb-1">
                  Coverage amount
                </div>
                <div className="h-9 rounded-md border border-ink-20 bg-subtle-2x px-3 flex items-center text-[14px] text-ink">
                  $500,000
                </div>
              </div>
              <div>
                <div className="text-[11px] text-ink-40 uppercase tracking-[1.5px] font-medium mb-1">
                  Date of birth
                </div>
                <div className="h-9 rounded-md border border-ink-20 bg-subtle-2x px-3 flex items-center text-[14px] text-ink-60">
                  MM / DD / YYYY
                </div>
              </div>
              <div>
                <div className="text-[11px] text-ink-40 uppercase tracking-[1.5px] font-medium mb-1">
                  Tobacco use
                </div>
                <div className="flex gap-3">
                  <div className="h-9 flex-1 rounded-md border border-ink-20 bg-subtle-2x flex items-center justify-center text-[14px] text-ink">
                    No
                  </div>
                  <div className="h-9 flex-1 rounded-md border border-ink-20 bg-subtle-2x flex items-center justify-center text-[14px] text-ink">
                    Yes
                  </div>
                </div>
              </div>
              <button className="w-full h-10 rounded-md bg-cypress text-white text-sm font-medium mt-2">
                Check my price
              </button>
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Capture panel (terminal — dark bg is intentional) */}
        <motion.div
          className="w-[40%] rounded-2xl overflow-hidden shadow-lg bg-ink p-6 font-mono text-sm"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        >
          <div className="text-[11px] text-ink-40 uppercase tracking-[1.5px] font-medium mb-4">
            capture-funnel.mjs
          </div>

          <div className="space-y-3">
            <motion.div
              className="text-cypress-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4, ease: EASE }}
            >
              ▸ Screen 14 of 29
            </motion.div>

            <motion.div
              className="text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.4, ease: EASE }}
            >
              ▸ Capturing: &quot;Beneficiary Selection&quot;
            </motion.div>

            <motion.div
              className="text-cypress-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4, ease: EASE }}
            >
              ▸ Status: Claude analyzing...
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.25, duration: 0.4, ease: EASE }}
            >
              <span className="text-cypress-light">████████</span>
              <span className="text-ink-60">░░</span>
              <span className="text-ink-40 ml-2">48% complete</span>
            </motion.div>
          </div>

          {/* Previous outputs */}
          <div className="mt-8 pt-4 border-t border-white/10 space-y-2 text-white/60 text-xs">
            <div>✓ Screen 13 — Payment method</div>
            <div>✓ Screen 12 — Review coverage</div>
            <div>✓ Screen 11 — Health history</div>
            <div className="text-white/30">...</div>
          </div>
        </motion.div>
      </div>

      {/* Bottom quote */}
      <motion.p
        className="mt-8 text-[14px] text-ink-60 italic max-w-2xl text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, ease: EASE }}
      >
        &ldquo;I need to reference our 29-screen funnel constantly — in PRDs,
        design reviews, engineer conversations.&rdquo;
      </motion.p>
    </div>
  );
}
