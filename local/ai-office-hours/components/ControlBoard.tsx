"use client";

import { useEffect, useState } from "react";
import { useDialKit } from "dialkit";
import {
  TOPICS,
  COLS,
  FREE_INDEX,
  useBingoSync,
} from "./useBingoSync";

export default function ControlBoard() {
  const params = useDialKit("Control", {
    lightMode: true,
    reset: { type: "action" as const, label: "Reset Board" },
  }, {
    onAction: (path) => {
      if (path === "reset") resetBoard();
    },
  });

  const { stamped, toggleStamp, resetBoard, question, setQuestion } = useBingoSync();
  const [draft, setDraft] = useState(question);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      params.lightMode ? "light" : "dark"
    );
  }, [params.lightMode]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: "2vh 3vw",
        position: "relative",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "2vh", zIndex: 1 }}>
        <h1
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "1.4rem",
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          Control Panel
        </h1>
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--text-dim)",
            marginTop: "0.5vh",
          }}
        >
          Click to toggle — changes sync to presentation view
        </p>
      </div>

      {/* Question input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setQuestion(draft);
        }}
        style={{ width: "min(90vw, 900px)", marginBottom: "1.5vh", zIndex: 1, display: "flex", gap: "8px" }}
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type the current question..."
          style={{
            flex: 1,
            padding: "12px 16px",
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
            borderRadius: "8px",
            color: "var(--text)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.95rem",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 20px",
            background: "#C6E04A",
            border: "none",
            borderRadius: "8px",
            color: "#022925",
            fontFamily: "var(--font-sans)",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Show
        </button>
        <button
          type="button"
          onClick={() => { setDraft(""); setQuestion(""); }}
          style={{
            padding: "12px 20px",
            background: "transparent",
            border: "1px solid var(--card-border)",
            borderRadius: "8px",
            color: "var(--text-dim)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          Clear
        </button>
      </form>

      {/* Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gap: "8px",
          width: "min(90vw, 900px)",
          aspectRatio: "5 / 3",
          zIndex: 1,
        }}
      >
        {TOPICS.map((topic, i) => {
          const isStamped = stamped.has(i);
          const isFree = i === FREE_INDEX;

          return (
            <div
              key={i}
              onClick={() => toggleStamp(i)}
              style={{
                position: "relative",
                background: isStamped ? "#C6E04A" : "var(--card-bg)",
                border: `2px solid ${isStamped ? "#C6E04A" : "var(--card-border)"}`,
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "8px 32px",
                cursor: isFree ? "default" : "pointer",
                userSelect: "none",
                transition: "all 0.15s ease",
                color: isStamped ? "#0c0c10" : "var(--text)",
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(0.55rem, 1.1vw, 0.9rem)",
                fontWeight: isStamped ? 700 : 500,
                lineHeight: 1.2,
                opacity: isFree ? 0.5 : 1,
              }}
            >
              {topic}
            </div>
          );
        })}
      </div>

      {/* Reset button */}
      <button
        onClick={resetBoard}
        style={{
          position: "fixed",
          bottom: "2vh",
          right: "2vw",
          background: "transparent",
          border: "1px solid var(--card-border)",
          color: "var(--text-dim)",
          fontFamily: "var(--font-sans)",
          fontSize: "0.75rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          padding: "8px 16px",
          borderRadius: "6px",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        Reset
      </button>

      {/* Counter */}
      <div
        style={{
          position: "fixed",
          bottom: "2vh",
          left: "2vw",
          fontSize: "0.75rem",
          color: "var(--text-dim)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          zIndex: 10,
        }}
      >
        <span style={{ color: "#C6E04A", fontWeight: 700 }}>
          {stamped.size}
        </span>{" "}
        / {TOPICS.length} revealed
      </div>
    </div>
  );
}
