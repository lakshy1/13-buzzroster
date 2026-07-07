import Link from "next/link";
import type { ReactNode } from "react";

import { CreatorSidebar } from "./CreatorSidebar";
import { ThemeToggle } from "../components/theme-toggle";

function NotificationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 4.75a4.25 4.25 0 0 0-4.25 4.25v2.1c0 .6-.18 1.18-.52 1.68l-1.4 2.05c-.4.58.02 1.37.73 1.37h11.88c.71 0 1.13-.79.73-1.37l-1.4-2.05a2.95 2.95 0 0 1-.52-1.68V9A4.25 4.25 0 0 0 12 4.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9.75 18.25a2.25 2.25 0 0 0 4.5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function CreatorLayout({ children }: { children: ReactNode }) {
  return (
    <main className="theme-shell min-h-screen">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <CreatorSidebar />

        <section className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="glass-panel rounded-[2rem] p-5 sm:p-6">
            <div className="sticky top-4 z-20 mb-6">
              <div className="glass-panel flex flex-col gap-4 rounded-[1.55rem] px-4 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Creator workspace</div>
                  <div className="mt-1 truncate text-base font-semibold tracking-[-0.04em] text-foreground">Welcome back, Lakshya</div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <ThemeToggle />
                  <Link
                    href="/notifications"
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground shadow-[0_10px_24px_rgba(114,84,242,0.06)] transition-colors hover:border-accent/30 hover:text-foreground"
                    aria-label="Notifications"
                  >
                    <NotificationIcon />
                    <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-accent" />
                  </Link>

                  <Link
                    href="/tools/creator-worth-calculator"
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Check my worth
                  </Link>
                </div>
              </div>
            </div>

            <div>{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}
