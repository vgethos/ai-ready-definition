"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export const TOPICS = [
  "Vibe Coding",
  "Motion",
  "Tedious Tasks Made Easy",
  "Fighting Slop",
  "Memory",
  "Context Engineering",
  "Figma + Claude",
  "Office Hours",
  "Live Tweaking",
  "Teaching Your AI",
  "Claude's Many Hats",
  "Sub-agents",
  "Agent Feedback Loops",
  "Overnight Workflows",
  "Multi-Agent Orchestration",
];

export const COLS = 5;
export const ROWS = 3;
export const FREE_INDEX = 7;

const CHANNEL_NAME = "bingo-sync";
const STORAGE_KEY = "bingo-stamped";
const QUESTION_KEY = "bingo-question";

function getInitialStamped(): Set<number> {
  if (typeof window === "undefined") return new Set([FREE_INDEX]);
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const arr = JSON.parse(stored) as number[];
      const set = new Set(arr);
      set.add(FREE_INDEX);
      return set;
    }
  } catch {}
  return new Set([FREE_INDEX]);
}

function getInitialQuestion(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(QUESTION_KEY) || "";
}

export function useBingoSync() {
  const [stamped, setStamped] = useState<Set<number>>(getInitialStamped);
  const [question, setQuestionState] = useState<string>(getInitialQuestion);
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (e) => {
      const data = e.data;
      if (data.type === "sync") {
        const set = new Set(data.stamped as number[]);
        set.add(FREE_INDEX);
        setStamped(set);
      }
      if (data.type === "question") {
        setQuestionState(data.question);
      }
    };

    return () => channel.close();
  }, []);

  const broadcast = useCallback((newStamped: Set<number>) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...newStamped]));
    channelRef.current?.postMessage({
      type: "sync",
      stamped: [...newStamped],
    });
  }, []);

  const setQuestion = useCallback((q: string) => {
    setQuestionState(q);
    localStorage.setItem(QUESTION_KEY, q);
    channelRef.current?.postMessage({
      type: "question",
      question: q,
    });
  }, []);

  const toggleStamp = useCallback(
    (index: number) => {
      if (index === FREE_INDEX) return;
      setStamped((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        broadcast(next);
        return next;
      });
    },
    [broadcast]
  );

  const resetBoard = useCallback(() => {
    const fresh = new Set([FREE_INDEX]);
    setStamped(fresh);
    broadcast(fresh);
  }, [broadcast]);

  return { stamped, toggleStamp, resetBoard, question, setQuestion };
}
