import Link from "next/link";
import type { ReactNode } from "react";

import type { AttentionItem, CampaignRow, MetricCard } from "./dashboard-data";
import { BrandLogo } from "../components/BrandLogo";

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
  | "settings";

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
      className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold text-white shadow-[0_12px_24px_rgba(138,43,226,0.16)]"
      style={{ background: `linear-gradient(135deg, ${accent} 0%, rgba(255,255,255,0.1) 140%)` }}
    >
      {initials}
    </span>
  );
}

export function MetricGlyph({ icon, tone }: { icon: MetricCard["icon"]; tone: MetricCard["tone"] }) {
  const toneClasses = {
    violet: "bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]",
    green: "bg-[#e7f8ec] text-[#28a153]",
    orange: "bg-[#fff0e6] text-[#f07b3b]",
    blue: "bg-[#eaf2ff] text-[#3e79f2]",
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
    violet: "var(--brand-primary)",
    green: "#2bb455",
    orange: "#f37d3f",
    blue: "#3f7bf2",
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
    violet: "bg-[var(--brand-primary-soft)] text-[var(--brand-primary-strong)]",
    orange: "bg-[#fff0e4] text-[#f07b3b]",
    blue: "bg-[#edf4ff] text-[#3b74ef]",
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
      <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg,#24b36d_0deg,#24b36d_295deg,#e7e4f4_295deg,#e7e4f4_360deg)]" />
      <div className="absolute inset-[12px] rounded-full bg-white" />
      <div className="relative text-center">
        <div className="text-[2.2rem] font-semibold tracking-[-0.05em] text-[#1b1930]">82%</div>
        <div className="text-sm font-medium text-[#2fab65]">Strong</div>
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
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-[#ece6f8] pb-5 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7a51f4]">{eyebrow}</div>
        <h1 className="mt-3 max-w-3xl text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.03] tracking-[-0.06em] text-[#17162b]">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-[0.98rem] leading-7 text-[#656079]">{description}</p>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-3">{action}</div> : null}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[2rem] border border-[#efe8fb] bg-white p-5 shadow-[0_16px_36px_rgba(112,84,199,0.08)] ${className}`}>
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
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7a51f4]">{eyebrow}</div>
        <h2 className="mt-3 text-[1.55rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6f6985]">{description}</p> : null}
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
    <article className="rounded-[1.8rem] border border-[#efe8fb] bg-white p-5 shadow-[0_16px_36px_rgba(112,84,199,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <MetricGlyph icon={icon} tone={tone} />
        <MiniTrend tone={tone} />
      </div>
      <div className="mt-5">
        <div className="text-sm font-medium text-[#66617c]">{label}</div>
        <div className="mt-2 text-[2rem] font-semibold leading-none tracking-[-0.06em] text-[#19182d]">{value}</div>
        <div className="mt-2 text-sm text-[#7b7591]">{note}</div>
      </div>
    </article>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-[1rem] border border-[#dfd2fb] px-4 py-2.5 text-sm font-semibold text-[#6d44ec]"
    >
      {children}
    </Link>
  );
}

export function PrimaryButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(91,61,215,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}
