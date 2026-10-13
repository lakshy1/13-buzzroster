"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../theme-context";

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M12 4.5V3m0 18v-1.5M4.5 12H3m18 0h-1.5M6.2 6.2 5.1 5.1m13.8 13.8-1.1-1.1M17.8 6.2l1.1-1.1M6.2 17.8l-1.1 1.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M16.7 14.6A7.3 7.3 0 0 1 9.4 5.3 7.4 7.4 0 1 0 18.7 14a7.4 7.4 0 0 1-2 .6Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [pulse, setPulse] = useState(false);
  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setPulse(true);
    setTheme(isDark ? "light" : "dark");
    window.setTimeout(() => setPulse(false), 600);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Toggle dark mode"
        aria-pressed={isDark}
        onClick={handleToggle}
        className={`relative inline-flex shrink-0 items-center overflow-hidden rounded-full border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-primary)] shadow-[0_10px_24px_rgba(var(--accent-rgb),0.12)] backdrop-blur-xl transition-colors duration-200 hover:border-[var(--accent)]/30 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/15 ${
          compact ? "h-10 w-[4.25rem] p-1" : "h-11 w-[4.75rem] p-1.25"
        }`}
      >
        <motion.span
          className="absolute top-1/2 grid h-[1.8rem] w-[1.8rem] -translate-y-1/2 place-items-center rounded-full bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] text-white shadow-[0_10px_20px_rgba(var(--accent-rgb),0.35)]"
          animate={{ x: isDark ? (compact ? 28 : 33) : 0, scale: pulse ? 1.08 : 1 }}
          transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 30 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isDark ? (
              <motion.span
                key="moon"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, rotate: -30, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, rotate: 30, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 grid place-items-center"
              >
                <MoonIcon />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, rotate: 30, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, rotate: -30, scale: 0.8 }}
                transition={{ duration: 0.18 }}
                className="absolute inset-0 grid place-items-center"
              >
                <SunIcon />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
        <span className="sr-only">{isDark ? "Dark mode enabled" : "Light mode enabled"}</span>
      </button>

      <AnimatePresence>
        {pulse ? (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-[60] bg-[radial-gradient(circle_at_center,rgba(var(--accent-rgb),0.18)_0%,rgba(10,10,15,0.04)_30%,transparent_70%)]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: [0, 0.16, 0], scale: [0.96, 1.02, 1.05] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
