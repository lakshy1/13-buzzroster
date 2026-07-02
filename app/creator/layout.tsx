import Link from "next/link";
import type { ReactNode } from "react";

import { CreatorSidebar } from "./CreatorSidebar";

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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,226,197,0.72),transparent_26%),radial-gradient(circle_at_top_right,rgba(227,220,255,0.82),transparent_30%),linear-gradient(180deg,#fffdfa_0%,#f8f3ec_100%)] text-[#17162b]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <CreatorSidebar />

        <section className="flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
          <div className="rounded-[2rem] border border-white/70 bg-white/72 p-5 shadow-[0_24px_55px_rgba(118,93,202,0.08)] backdrop-blur-xl sm:p-6">
            <div className="sticky top-4 z-20 mb-6">
              <div className="flex flex-col gap-4 rounded-[1.55rem] border border-[#ece4fa] bg-white/88 px-4 py-3 shadow-[0_18px_40px_rgba(118,93,202,0.10)] backdrop-blur-xl sm:px-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a80a8]">Creator workspace</div>
                  <div className="mt-1 truncate text-base font-semibold tracking-[-0.04em] text-[#1a1830]">Welcome back, Lakshya</div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/notifications"
                    className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e4d8fb] bg-white text-[#4a4464] shadow-[0_10px_24px_rgba(114,84,242,0.06)] transition-colors hover:border-[#d2c1fb]"
                    aria-label="Notifications"
                  >
                    <NotificationIcon />
                    <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-[#6d44ec]" />
                  </Link>

                  <Link
                    href="/tools/creator-worth-calculator"
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_36px_rgba(91,61,215,0.20)] transition-transform duration-200 hover:-translate-y-0.5"
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
