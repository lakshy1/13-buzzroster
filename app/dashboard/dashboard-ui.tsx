"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import type { AttentionItem, CampaignRow, MetricCard } from "./dashboard-data";
import { BrandLogo } from "../components/BrandLogo";
import { useResponsiveSidebar } from "../components/responsive-sidebar-context";

const contributionMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const contributionWeekdays = ["Mon", "Wed", "Fri"];

function buildContributionCells(weeks: number, rows: number) {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: weeks }, (_, week) => ((row * 5 + week * 3 + (row % 2 ? 1 : 0)) % 4) as 0 | 1 | 2 | 3),
  );
}

type SidebarIconName =
  | "dashboard"
  | "invites"
  | "campaigns"
  | "submissions"
  | "earnings"
  | "messages"
  | "profile"
  | "portfolio"
  | "calculator"
  | "settings"
  | "insights";

export function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.5L13.76 8.24L19.5 10L13.76 11.76L12 17.5L10.24 11.76L4.5 10L10.24 8.24L12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LogoMark() {
  return <BrandLogo compact />;
}

export function SidebarIcon({ icon, className = "" }: { icon: SidebarIconName; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true" as const };

  switch (icon) {
    case "dashboard":
      return (
        <svg {...common}>
          <path d="M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-8.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "invites":
      return (
        <svg {...common}>
          <rect x="3.75" y="6" width="16.5" height="12" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="m5.5 8 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "campaigns":
      return (
        <svg {...common}>
          <path d="M7 6.5h10a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 4.5v4M16 4.5v4M5 10.5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "submissions":
      return (
        <svg {...common}>
          <path d="M8 3.75h6l4.25 4.25V19A1.25 1.25 0 0 1 17 20.25H8A1.25 1.25 0 0 1 6.75 19V5A1.25 1.25 0 0 1 8 3.75Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M14 3.75V8h4.25" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "earnings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 7.5v9M14.5 9.5c0-.9-1-1.75-2.5-1.75s-2.5.85-2.5 1.9c0 1 1.05 1.6 2.5 1.85 1.55.26 2.5.85 2.5 1.9 0 1.05-1 1.85-2.5 1.85s-2.5-.8-2.5-1.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "messages":
      return (
        <svg {...common}>
          <path d="M5.25 6.25h13.5A1.75 1.75 0 0 1 20.5 8v7A1.75 1.75 0 0 1 18.75 16.75H10l-4.75 3V16.75h0A1.75 1.75 0 0 1 3.5 15V8a1.75 1.75 0 0 1 1.75-1.75Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8.25" r="3.25" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5 19c1.5-3 4-4.5 7-4.5s5.5 1.5 7 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "portfolio":
      return (
        <svg {...common}>
          <rect x="4.5" y="6.5" width="15" height="11" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 6.5V5.5a1.75 1.75 0 0 1 1.75-1.75h2.5A1.75 1.75 0 0 1 15 5.5v1" stroke="currentColor" strokeWidth="1.8" />
          <path d="M4.5 12h15" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case "calculator":
      return (
        <svg {...common}>
          <rect x="5" y="3.75" width="14" height="16.5" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8.5 8h7M8.5 12h2M13.5 12h2M8.5 16h2M13.5 16h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "insights":
      return (
        <svg {...common}>
          <path d="M5.5 18.5h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M7.5 18.5V12.5M12 18.5V9M16.5 18.5V6.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3.75v2.5M12 17.75v2.5M5.8 5.8l1.77 1.77M16.43 16.43l1.77 1.77M3.75 12h2.5M17.75 12h2.5M5.8 18.2l1.77-1.77M16.43 7.57l1.77-1.77" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
  }
}

export function BrandAvatar({ name, accent }: { name: string; accent: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white shadow-glow"
      style={{ background: `linear-gradient(135deg, ${accent} 0%, rgba(255,255,255,0.1) 140%)` }}
    >
      {initials}
    </span>
  );
}

export function MetricGlyph({ icon, tone }: { icon: MetricCard["icon"]; tone: MetricCard["tone"] }) {
  const toneClasses = {
    violet: "bg-accent-soft text-accent-strong",
    green: "bg-[rgba(34,197,94,0.12)] text-success",
    orange: "bg-[rgba(245,158,11,0.12)] text-warning",
    blue: "bg-[rgba(96,165,250,0.12)] text-info",
  } as const;

  return (
    <span className={`flex h-14 w-14 items-center justify-center rounded-[1.35rem] ${toneClasses[tone]}`}>
      {icon === "mail" ? (
        <SidebarIcon icon="invites" className="h-6 w-6" />
      ) : icon === "briefcase" ? (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="1.8" />
          <rect x="3.75" y="7" width="16.5" height="11.5" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M3.75 11.25h16.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ) : icon === "wallet" ? (
        <SidebarIcon icon="earnings" className="h-6 w-6" />
      ) : (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path d="m12 4 2.15 4.35 4.8.7-3.48 3.4.82 4.79L12 15l-4.29 2.24.82-4.79-3.48-3.4 4.8-.7L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

export function MiniTrend({ tone }: { tone: MetricCard["tone"] }) {
  const stroke = {
    violet: "var(--accent)",
    green: "var(--success)",
    orange: "var(--warning)",
    blue: "var(--info)",
  }[tone];

  return (
    <svg viewBox="0 0 110 40" className="h-10 w-24" fill="none" aria-hidden="true">
      <path
        d="M4 28c10-1 17-10 25-10 7 0 10 7 15 7 7 0 10-16 18-16 6 0 8 12 15 12 6 0 10-6 16-6 6 0 8 7 13 7"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatusPill({ tone, children }: { tone: AttentionItem["statusTone"]; children: ReactNode }) {
  const toneClasses = {
    violet: "bg-accent-soft text-accent-strong",
    orange: "bg-[rgba(245,158,11,0.12)] text-warning",
    blue: "bg-[rgba(96,165,250,0.12)] text-info",
  } as const;

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}

export function ProgressTrack({ progress }: { progress: CampaignRow["progress"] }) {
  const labels = ["Accepted", "Content submitted", "Review", "Approved", "Payment"];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-3">
        {progress.map((step, index) => (
          <div key={labels[index]} className="relative flex items-center">
            {index < progress.length - 1 ? (
              <span
                className={`absolute left-[calc(50%+0.75rem)] right-[-50%] top-1/2 h-[2px] -translate-y-1/2 ${
                  progress[index + 1] === "upcoming" && step !== "done" ? "bg-[#ddd7ef]" : "bg-[var(--brand-primary)]"
                }`}
              />
            ) : null}
            <span
              className={`relative z-10 mx-auto h-4 w-4 rounded-full border-2 ${
                step === "done"
                  ? "border-[#45b35f] bg-[#45b35f]"
                  : step === "current"
                    ? "border-[var(--brand-primary)] bg-white"
                    : "border-[#ddd7ef] bg-white"
              }`}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-3 text-center text-[0.69rem] font-medium leading-[1.3] text-[#68627f] sm:text-[0.74rem]">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

export function ProfileRing() {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,var(--success)_0deg,var(--success)_295deg,var(--border-subtle)_295deg,var(--border-subtle)_360deg)]" />
      <div className="absolute inset-[12px] rounded-full bg-surface-strong" />
      <div className="relative text-center">
        <div className="text-[2.2rem] font-semibold tracking-[-0.05em] text-foreground">82%</div>
        <div className="text-sm font-medium text-success">Strong</div>
      </div>
    </div>
  );
}

export function DashboardHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  const responsiveSidebar = useResponsiveSidebar();

  return (
    <div className="flex flex-col gap-5 border-b border-border pb-5 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">{eyebrow}</div>
          {responsiveSidebar ? (
            <button
              type="button"
              onClick={responsiveSidebar.toggleSidebar}
              className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground lg:hidden"
              aria-label={responsiveSidebar.isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                <path d="M4.5 7h15M4.5 12h15M4.5 17h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          ) : null}
        </div>
        <h1 className="mt-3 max-w-3xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.03] tracking-[-0.06em] text-foreground">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-[0.98rem] leading-7 text-muted-foreground">{description}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-3">{action}</div> : null}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[2rem] border border-border bg-surface p-5 shadow-[0_16px_36px_rgba(112,84,199,0.08)] ${className}`}>
      {children}
    </section>
  );
}

export function PanelTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">{eyebrow}</div>
        <h2 className="mt-3 text-[1.55rem] font-semibold tracking-[-0.05em] text-foreground">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function SummaryCard({
  label,
  value,
  note,
  tone,
  icon,
}: MetricCard) {
  return (
    <article className="rounded-[1.8rem] border border-border bg-surface p-5 shadow-[0_16px_36px_rgba(112,84,199,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <MetricGlyph icon={icon} tone={tone} />
        <MiniTrend tone={tone} />
      </div>
      <div className="mt-5">
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
        <div className="mt-2 text-[2rem] font-semibold leading-none tracking-[-0.06em] text-foreground">{value}</div>
        <div className="mt-2 text-sm text-muted-foreground">{note}</div>
      </div>
    </article>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-[1rem] border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-surface-muted"
    >
      {children}
    </Link>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-[0_14px_28px_rgba(91,61,215,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}

export function ContributionHeatmap({
  title,
  description,
  streakLabel = "14 day streak",
  className = "",
}: {
  title: string;
  description: string;
  streakLabel?: string;
  className?: string;
}) {
  const cells = buildContributionCells(18, 7);

  const intensityClasses = [
    "bg-[rgba(109,68,236,0.08)] dark:bg-[rgba(255,255,255,0.05)]",
    "bg-[rgba(109,68,236,0.18)] dark:bg-[rgba(139,92,246,0.20)]",
    "bg-[rgba(109,68,236,0.34)] dark:bg-[rgba(139,92,246,0.36)]",
    "bg-[rgba(109,68,236,0.58)] dark:bg-[rgba(139,92,246,0.58)]",
  ] as const;

  return (
    <div className={`rounded-[1.85rem] border border-border/90 bg-surface p-4 shadow-[0_18px_40px_rgba(20,20,35,0.06)] backdrop-blur-xl ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">Activity heatmap</div>
          <h2 className="mt-3 text-[1.55rem] font-semibold tracking-[-0.05em] text-foreground">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(109,68,236,0.08)] px-3 py-1 text-sm font-semibold text-accent">
          {streakLabel}
          <span aria-hidden="true" className="text-warning">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
              <path
                d="M12.6 3.75c1.45 2.15.9 3.83-.32 5.16-.96 1.05-1.82 1.55-1.82 2.98 0 1.08.7 2.13 2.08 2.13 1.95 0 3.4-1.73 3.4-4.1 1.6 1.36 2.9 3.24 2.9 5.58 0 3.6-2.72 5.98-6.83 5.98-4.4 0-7.38-2.78-7.38-6.84 0-2.65 1.45-5.14 3.95-7.2.08 1.44.76 2.46 1.9 3.11.36-2.35 1.77-4.1 4.12-6.7Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-[48px_minmax(0,1fr)]">
        <div className="pt-8 text-sm font-medium leading-[2.2rem] text-muted-foreground">
          {contributionWeekdays.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="overflow-x-auto pb-1">
          <div className="min-w-[620px]">
            <div className="mb-3 grid grid-cols-[repeat(6,minmax(0,1fr))] text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground/80">
              {contributionMonths.map((month) => (
                <div key={month}>{month}</div>
              ))}
            </div>

            <div className="grid grid-rows-[repeat(7,minmax(0,1fr))] gap-[6px]">
              {cells.map((row, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-[repeat(18,minmax(0,1fr))] gap-[6px]">
                  {row.map((cell, cellIndex) => (
                    <span
                      key={`${rowIndex}-${cellIndex}`}
                      title={`${cell + 1} activity level, week ${cellIndex + 1}`}
                      className={`h-3.5 rounded-[4px] ring-1 ring-inset ring-black/5 dark:ring-white/5 ${intensityClasses[cell]}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className={`h-3 w-3 rounded-[4px] ${intensityClasses[0]}`} />
                Less activity
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className={`h-3 w-3 rounded-[4px] ${intensityClasses[2]}`} />
                <span className={`h-3 w-3 rounded-[4px] ${intensityClasses[3]}`} />
                More activity
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
