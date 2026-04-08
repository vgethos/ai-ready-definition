"use client";

import { motion } from "motion/react";
import {
  FileText,
  Palette,
  Link,
  SlidersHorizontal,
  Eye,
  Search,
} from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tiles = [
  { icon: FileText, label: "One-click PRDs" },
  { icon: Palette, label: "Figma ↔ Claude" },
  { icon: Link, label: "Jira + Chrome integration" },
  { icon: SlidersHorizontal, label: "Live design tuning" },
  { icon: Eye, label: "Visual UI feedback" },
  { icon: Search, label: "Automated funnel docs", highlight: true },
];

export default function L5BreadthSlide() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-canvas">
      {/* Header */}
      <motion.div
        className="flex items-center gap-4 mb-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="px-3 py-1 rounded-full bg-cypress text-subtle-2x text-xs font-medium tracking-wide uppercase">
          Level 5
        </span>
        <h2 className="font-serif text-2xl text-subtle-2x">
          The Practice: Tool-Building
        </h2>
      </motion.div>

      {/* 3×2 Grid */}
      <div className="grid grid-cols-3 gap-5">
        {tiles.map((tile, i) => {
          const Icon = tile.icon;
          return (
            <motion.div
              key={tile.label}
              className={`relative w-[200px] h-[200px] flex flex-col items-center justify-center gap-3 rounded-xl border border-ink-20/10 ${
                tile.highlight
                  ? "bg-canvas-light ring-1 ring-cypress-glow/40"
                  : "bg-canvas-light"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: EASE,
              }}
            >
              {tile.highlight && (
                <div className="absolute inset-0 rounded-xl bg-cypress-glow/5 pointer-events-none" />
              )}
              <Icon className="size-8 text-cypress-light" />
              <span className="text-sm text-subtle-2x text-center px-3">
                {tile.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom text */}
      <motion.p
        className="mt-10 text-sm text-ink-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
      >
        Each one eliminates a manual workflow
      </motion.p>
    </div>
  );
}
