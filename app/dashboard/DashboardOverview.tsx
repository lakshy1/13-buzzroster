"use client";

import Link from "next/link";

import { useTheme } from "../theme-context";
import { ContributionHeatmap } from "./dashboard-ui";

type MetricTone = "violet" | "peach" | "green" | "blue";

const metrics: Array<{
  tone: MetricTone;
  icon: "invites" | "reply" | "earnings" | "views";
  value: string;
  label: string;
  note: string;
}> = [
  { tone: "violet", icon: "invites", value: "2", label: "New Invites", note: "From top brands" },
  { tone: "peach", icon: "reply", value: "1", label: "Awaiting Reply", note: "From brands" },
  { tone: "green", icon: "earnings", value: "INR 18,000", label: "Potential Earnings", note: "From active opportunities" },
  { tone: "blue", icon: "views", value: "127", label: "Profile Views", note: "+ 34% vs last week" },
];

const opportunities = [
  {
    brand: "Nike India",
    meta: "Lifestyle - Instagram Reel",
    amount: "INR 12,000",
    deliverables: "1 Reel",
    due: "5 Days Left",
    badge: "New",
    accent: "from-[#111111] to-[#4a4a4a]",
  },
  {
    brand: "boAt Lifestyle",
    meta: "Tech - UGC Video",
    amount: "INR 8,500",
    deliverables: "1 Video",
    due: "7 Days Left",
    badge: "New",
    accent: "from-[#1b1b1b] to-[#585858]",
  },
];

const checklist = [
  { label: "Add rate card", tone: "success" },
  { label: "Upload 2 more campaigns", tone: "success" },
  { label: "Connect YouTube", tone: "warning" },
] as const;

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
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

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="m5.5 7.5 4.5 5 4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M7 4.75h10a1.25 1.25 0 0 1 1.25 1.25v13.3a.7.7 0 0 1-1.13.55L12 15.9l-5.12 3.95a.7.7 0 0 1-1.13-.55V6A1.25 1.25 0 0 1 7 4.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MetricGlyph({ icon }: { icon: (typeof metrics)[number]["icon"] }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-white/70 text-[var(--accent)] shadow-[0_10px_22px_rgba(109,68,236,0.08)] dark:bg-white/5">
      {icon === "invites" ? (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M12 12.25a3.5 3.5 0 1 0-3.5-3.5 3.5 3.5 0 0 0 3.5 3.5Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5.75 19a6.25 6.25 0 0 1 12.5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : icon === "reply" ? (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M6.5 7.5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H12l-4.5 3v-3H6.5a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      ) : icon === "earnings" ? (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M7.5 8.5h9a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M16.5 10.5a1.2 1.2 0 1 0 0 .01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M12 5.25A7.5 7.5 0 0 0 4.5 12a7.4 7.4 0 0 0 2.1 5.2l-.85 1.6h12.6l-.85-1.6A7.4 7.4 0 0 0 19.5 12 7.5 7.5 0 0 0 12 5.25Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 8.5v4.2l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function BrandMark({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.26),transparent_42%),linear-gradient(135deg,rgba(0,0,0,0.95),rgba(50,50,50,0.94))] text-xs font-semibold text-white shadow-[0_12px_24px_rgba(0,0,0,0.16)]">
      {letters}
    </div>
  );
}

function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-[1.85rem] border border-border/90 bg-surface p-4 shadow-[0_18px_40px_rgba(20,20,35,0.06)] backdrop-blur-xl ${className}`}>
      {children}
    </section>
  );
}

function ProgressRing() {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,var(--accent)_0deg,var(--accent)_295deg,rgba(109,68,236,0.18)_295deg,rgba(109,68,236,0.18)_360deg)] dark:bg-[conic-gradient(from_180deg,var(--accent)_0deg,var(--accent)_295deg,rgba(255,255,255,0.08)_295deg,rgba(255,255,255,0.08)_360deg)]" />
      <div className="absolute inset-[10px] rounded-full bg-surface" />
      <div className="relative text-center">
        <div className="text-[2.35rem] font-semibold tracking-[-0.06em] text-foreground">82%</div>
        <div className="mt-1 text-sm font-medium text-muted-foreground">Almost there!</div>
      </div>
    </div>
  );
}

function AvatarChip() {
  return (
    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border bg-[linear-gradient(135deg,rgba(109,68,236,0.86),rgba(172,145,255,0.55))] text-xs font-semibold text-white shadow-[0_12px_24px_rgba(109,68,236,0.22)]">
      TS
    </div>
  );
}

export default function DashboardOverview() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const greeting = isDark ? "Good evening, Tanmay" : "Good morning, Tanmay";

  return (
    <div className="flex min-h-full flex-col gap-4 p-1 sm:p-2 lg:p-3">
      <div className="flex items-start justify-between gap-4 rounded-[1.75rem] px-1 py-1 sm:px-2">
        <div className="min-w-0">
          <h1 className="text-[clamp(1.9rem,3.4vw,3rem)] font-semibold tracking-[-0.06em] text-foreground">{greeting}</h1>
          <p className="mt-2 text-base font-medium text-muted-foreground">Let&apos;s make today count.</p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" />
          </button>
          <AvatarChip />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground shadow-[0_10px_24px_rgba(20,20,35,0.05)]"
        >
          This Week
          <ChevronDownIcon />
        </button>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {metrics.map((metric) => {
          const toneClasses = {
            violet: "from-[rgba(109,68,236,0.12)] via-[rgba(109,68,236,0.08)] to-[rgba(255,255,255,0.02)] dark:from-[rgba(139,92,246,0.12)]",
            peach: "from-[rgba(255,157,122,0.18)] via-[rgba(255,208,188,0.10)] to-[rgba(255,255,255,0.02)] dark:from-[rgba(255,157,122,0.12)]",
            green: "from-[rgba(89,191,127,0.16)] via-[rgba(194,240,207,0.10)] to-[rgba(255,255,255,0.02)] dark:from-[rgba(34,197,94,0.10)]",
            blue: "from-[rgba(95,139,255,0.16)] via-[rgba(184,204,255,0.10)] to-[rgba(255,255,255,0.02)] dark:from-[rgba(96,165,250,0.10)]",
          }[metric.tone];

          return (
            <article
              key={metric.label}
              className={`rounded-[1.65rem] border border-border/80 bg-gradient-to-br p-4 shadow-[0_14px_32px_rgba(20,20,35,0.05)] ${toneClasses}`}
            >
              <div className="flex items-start justify-between gap-4">
                <MetricGlyph icon={metric.icon} />
                <div className="h-10 w-10 rounded-full bg-[rgba(255,255,255,0.45)] blur-[1px] dark:bg-white/5" />
              </div>
              <div className="mt-5">
                <div className="text-[2rem] font-semibold leading-none tracking-[-0.06em] text-foreground">{metric.value}</div>
                <div className="mt-2 text-sm font-semibold text-foreground">{metric.label}</div>
                <div className="mt-1 text-sm text-muted-foreground">{metric.note}</div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.92fr)]">
        <div className="space-y-5">
          <ContributionHeatmap title="Creator momentum" description="Keep a steady cadence of posts, replies, and submissions." />

          <SectionCard>
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-[-0.04em] text-foreground">Top Opportunities for You</h2>
              <Link href="/dashboard/brand-invites" className="text-sm font-semibold text-accent transition-colors hover:text-accent-strong">
                View all
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {opportunities.map((item) => (
                <div
                  key={item.brand}
                  className="flex flex-col gap-4 rounded-[1.55rem] border border-border/80 bg-[rgba(255,255,255,0.38)] p-4 shadow-[0_12px_28px_rgba(20,20,35,0.04)] dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <BrandMark name={item.brand} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-base font-semibold tracking-[-0.04em] text-foreground">{item.brand}</div>
                        <span className="rounded-full bg-[rgba(109,68,236,0.10)] px-2.5 py-1 text-[0.7rem] font-semibold text-accent">
                          {item.badge}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">{item.meta}</div>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span>{item.amount}</span>
                        <span>{item.deliverables}</span>
                        <span>{item.due}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:justify-end">
                    <Link
                      href="/dashboard/brand-invites"
                      className="inline-flex h-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-5 text-sm font-semibold text-accent-foreground shadow-[0_14px_28px_rgba(109,68,236,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`Save ${item.brand}`}
                    >
                      <BookmarkIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard className="pb-5">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-[-0.04em] text-foreground">Profile Strength</h2>
            </div>

            <div className="mt-5 flex flex-col items-center gap-5">
              <ProgressRing />
              <div className="w-full space-y-3">
                {checklist.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-3 rounded-[1rem] border border-border/70 bg-[rgba(255,255,255,0.34)] px-3 py-2.5 dark:bg-white/5"
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[0.72rem] font-bold ${
                        item.tone === "success" ? "bg-[rgba(34,197,94,0.12)] text-success" : "bg-[rgba(245,158,11,0.12)] text-warning"
                      }`}
                    >
                      {item.tone === "success" ? "✓" : "!"}
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          <SectionCard>
            <h2 className="text-lg font-semibold tracking-[-0.04em] text-foreground">Creator Level</h2>

            <div className="mt-5 rounded-[1.5rem] border border-border/80 bg-[rgba(255,255,255,0.34)] p-4 dark:bg-white/5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] bg-[rgba(109,68,236,0.12)] text-accent shadow-[0_10px_24px_rgba(109,68,236,0.1)]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden="true">
                    <path
                      d="M12 3.75 14.3 8.4l5.15.75-3.73 3.63.88 5.12L12 15.5l-4.6 2.4.88-5.12L4.55 9.15l5.15-.75L12 3.75Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-muted-foreground">Rising Creator</div>
                  <div className="mt-1 text-lg font-semibold tracking-[-0.04em] text-foreground">Level 3</div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span>460 / 1000 XP</span>
                  <span>46%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-[rgba(109,68,236,0.12)] dark:bg-white/10">
                  <div className="h-full w-[46%] rounded-full bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent-strong)_100%)]" />
                </div>
              </div>

              <div className="mt-5 rounded-[1.15rem] border border-border/70 bg-[rgba(255,255,255,0.32)] p-3 dark:bg-white/5">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(245,158,11,0.12)] text-warning">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path d="M12 4.75 4.75 8.6V12c0 4.4 2.8 7.75 7.25 9.25 4.45-1.5 7.25-4.85 7.25-9.25V8.6L12 4.75Z" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M12 10.25v4.5M12 15.8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Next: Trusted Creator</div>
                    <div className="mt-1 text-sm text-muted-foreground">Unlock priority discovery</div>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
