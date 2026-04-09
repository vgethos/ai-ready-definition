"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const m1Agents = [
  { label: "Research Agent" },
  { label: "Narrative Agent" },
  { label: "Audience Analyst" },
];

export default function L4GoalSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#f5f5f5] relative overflow-hidden">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-white text-xs font-medium tracking-wide uppercase">
          Level 4
        </span>
        <h2 className="font-serif text-3xl text-ink">
          Multi-Agent Orchestration
        </h2>
      </motion.div>

      {/* Main diagram area */}
      <div className="relative flex items-center gap-0" style={{ width: 960, height: 400 }}>
        {/* SVG layer for all connections */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={960}
          height={400}
          viewBox="0 0 960 400"
          fill="none"
        >
          {/* Arrow marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#056257" />
            </marker>
            <marker
              id="arrowhead-reverse"
              markerWidth="8"
              markerHeight="6"
              refX="1"
              refY="3"
              orient="auto"
            >
              <polygon points="8 0, 0 3, 8 6" fill="#056257" />
            </marker>
          </defs>

          {/* Vlad → Director (dotted) */}
          <motion.line
            x1={72}
            y1={200}
            x2={198}
            y2={200}
            stroke="#056257"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
          />

          {/* Director → M1 */}
          <motion.line
            x1={340}
            y1={170}
            x2={445}
            y2={130}
            stroke="#056257"
            strokeWidth={1.5}
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 1.6, ease: EASE }}
          />
          {/* Director → M2 */}
          <motion.line
            x1={340}
            y1={200}
            x2={445}
            y2={200}
            stroke="#056257"
            strokeWidth={1.5}
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 1.7, ease: EASE }}
          />
          {/* Director → M3 */}
          <motion.line
            x1={340}
            y1={230}
            x2={445}
            y2={270}
            stroke="#056257"
            strokeWidth={1.5}
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 1.8, ease: EASE }}
          />

          {/* M1 → Agent cards */}
          <motion.line
            x1={610}
            y1={100}
            x2={700}
            y2={60}
            stroke="#056257"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 2.5, ease: EASE }}
          />
          <motion.line
            x1={610}
            y1={115}
            x2={700}
            y2={125}
            stroke="#056257"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 2.6, ease: EASE }}
          />
          <motion.line
            x1={610}
            y1={130}
            x2={700}
            y2={190}
            stroke="#056257"
            strokeWidth={1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 2.7, ease: EASE }}
          />

          {/* M2 small dots connectors */}
          <motion.line
            x1={610}
            y1={200}
            x2={700}
            y2={260}
            stroke="#056257"
            strokeWidth={1}
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 2.8, ease: EASE }}
          />

          {/* M3 small dots connectors */}
          <motion.line
            x1={610}
            y1={270}
            x2={700}
            y2={320}
            stroke="#056257"
            strokeWidth={1}
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 2.9, ease: EASE }}
          />

          {/* Review loop arrow: from agents back up to director (curved) */}
          <motion.path
            d="M 720 210 C 750 280, 400 340, 280 240"
            stroke="#056257"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            fill="none"
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 3.2, ease: EASE }}
          />
          {/* Review loop label */}
          <motion.text
            x={520}
            y={335}
            textAnchor="middle"
            fill="#056257"
            fontSize={11}
            fontWeight={500}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.6, ease: EASE }}
          >
            review & iterate
          </motion.text>

          {/* Executive summary line: Director back to Vlad */}
          <motion.line
            x1={198}
            y1={225}
            x2={80}
            y2={260}
            stroke="#056257"
            strokeWidth={1}
            strokeDasharray="4 3"
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 3.8, ease: EASE }}
          />
        </svg>

        {/* Vlad avatar */}
        <motion.div
          className="absolute flex flex-col items-center gap-2"
          style={{ left: 20, top: 170 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        >
          <div className="w-16 h-16 rounded-full bg-cypress text-white flex items-center justify-center text-lg font-semibold shadow-md">
            VG
          </div>
          <span className="text-xs font-medium text-ink">Vlad</span>
        </motion.div>

        {/* Director Agent card */}
        <motion.div
          className="absolute bg-white rounded-xl shadow-lg border-2 border-cypress px-6 py-5 flex flex-col items-center"
          style={{ left: 200, top: 164, width: 140 }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
        >
          <div className="w-8 h-8 rounded-full bg-cypress/10 flex items-center justify-center mb-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6" stroke="#056257" strokeWidth="1.5" />
              <circle cx="8" cy="8" r="2" fill="#056257" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-ink">Director Agent</span>
        </motion.div>

        {/* Milestone nodes */}
        {[
          { label: "M1: Narrative Design", top: 94, left: 450 },
          { label: "M2: Presentation Build", top: 178, left: 450 },
          { label: "M3: Delivery Prep", top: 252, left: 450 },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            className="absolute bg-white rounded-lg shadow-sm px-4 py-3"
            style={{ left: m.left, top: m.top, width: 160 }}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.9 + i * 0.15, ease: EASE }}
          >
            <span className="text-xs font-medium text-ink">{m.label}</span>
          </motion.div>
        ))}

        {/* M1 Agent cards (detailed) */}
        {m1Agents.map((agent, i) => (
          <motion.div
            key={agent.label}
            className="absolute bg-white rounded-xl shadow-sm px-3 py-2 border border-gray-100"
            style={{
              left: 700,
              top: 38 + i * 65,
              width: 140,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 2.5 + i * 0.12, ease: EASE }}
          >
            <span className="text-[11px] font-medium text-ink">{agent.label}</span>
          </motion.div>
        ))}

        {/* M2 simplified dots */}
        <motion.div
          className="absolute flex gap-1.5"
          style={{ left: 710, top: 265 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.8, ease: EASE }}
        >
          {[0, 1].map((d) => (
            <div key={d} className="w-3 h-3 rounded-full bg-cypress/20 border border-cypress/30" />
          ))}
        </motion.div>

        {/* M3 simplified dots */}
        <motion.div
          className="absolute flex gap-1.5"
          style={{ left: 710, top: 322 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.9, ease: EASE }}
        >
          {[0, 1].map((d) => (
            <div key={d} className="w-3 h-3 rounded-full bg-cypress/20 border border-cypress/30" />
          ))}
        </motion.div>

        {/* Executive summary document icon near Vlad */}
        <motion.div
          className="absolute flex flex-col items-center gap-1"
          style={{ left: 30, top: 265 }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 4.0, ease: EASE }}
        >
          <div className="w-10 h-12 bg-white rounded-md shadow-sm border border-gray-200 flex items-center justify-center">
            <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
              <rect x="1" y="1" width="14" height="16" rx="2" stroke="#056257" strokeWidth="1.2" />
              <line x1="4" y1="5" x2="12" y2="5" stroke="#056257" strokeWidth="0.8" />
              <line x1="4" y1="8" x2="12" y2="8" stroke="#056257" strokeWidth="0.8" />
              <line x1="4" y1="11" x2="9" y2="11" stroke="#056257" strokeWidth="0.8" />
            </svg>
          </div>
          <span className="text-[9px] text-ink-40 font-medium">Summary</span>
        </motion.div>
      </div>

      {/* Bottom caption */}
      <motion.p
        className="mt-4 text-sm text-ink-40 text-center max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 4.2, ease: EASE }}
      >
        One vague goal in, structured execution out. Vlad talks to one agent &mdash; it handles the rest.
      </motion.p>
    </div>
  );
}
