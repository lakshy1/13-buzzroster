import Link from "next/link";
import type { ReactNode } from "react";

const steps = [
  { label: "Profile", href: "/onboarding/creator/profile" },
  { label: "Socials", href: "/onboarding/creator/socials" },
  { label: "Niche", href: "/onboarding/creator/niche" },
  { label: "Rates", href: "/onboarding/creator/rates" },
];

export default function CreatorOnboardingLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(255,226,197,0.72),transparent_26%),radial-gradient(circle_at_top_right,rgba(227,220,255,0.82),transparent_30%),linear-gradient(180deg,#fffdfa_0%,#f8f3ec_100%)] px-4 py-6 text-[#17162b] sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/70 bg-white/78 p-5 shadow-[0_24px_55px_rgba(118,93,202,0.08)] backdrop-blur-xl sm:p-6">
          <div className="flex flex-col gap-4 border-b border-[#ece6f8] pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a80a8]">Creator onboarding</div>
              <div className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.06em] text-[#1a1830]">
                Set up a creator profile brands can trust quickly
              </div>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#66617c]">
                Complete these four steps to become discoverable, improve invite quality, and start receiving better-fit collaborations.
              </p>
            </div>
            <Link
              href="/creator/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-[#e4d8fb] bg-white px-4 py-2.5 text-sm font-semibold text-[#6d44ec]"
            >
              Skip for now
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.label} className="rounded-[1.2rem] border border-[#eee8fb] bg-[#fbfaff] px-4 py-3">
                <div className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#8f88a8]">Step {index + 1}</div>
                <div className="mt-2 text-sm font-semibold text-[#1d1b32]">{step.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}
