"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  analysisSteps,
  detectPlatform,
  type CreatorWorthResult,
  type Platform,
  type ToolState,
  extractProfileContext,
} from "./analysis";

type NavItem = {
  label: string;
  href: string;
  chevron?: boolean;
};

type PlatformMeta = {
  key: Platform;
  label: string;
  accent: string;
  softAccent: string;
  icon: ReactNode;
};

type LeadFormState = {
  fullName: string;
  email: string;
  phone: string;
  creatorCategory: string;
  message: string;
};

const navItems: NavItem[] = [
  { label: "About us", href: "/#about-us" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Resources", href: "/#resources" },
  { label: "Tools", href: "/#tools", chevron: true },
];

const toolsMenuItems = [
  { label: "Creator Worth Calculator", href: "/tools/creator-worth-calculator" },
  { label: "Creator Workspace", href: "/#features" },
  { label: "Campaign Tracking", href: "/#pricing" },
  { label: "Support & Resources", href: "/#resources" },
];

const platformMeta: Record<Platform, PlatformMeta> = {
  instagram: {
    key: "instagram",
    label: "Instagram",
    accent: "#f26b95",
    softAccent: "#fde9f1",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect
          x="4.5"
          y="4.5"
          width="15"
          height="15"
          rx="4.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    ),
  },
  youtube: {
    key: "youtube",
    label: "YouTube",
    accent: "#ef6a54",
    softAccent: "#ffe8e1",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M9.2 8.6 15.8 12l-6.6 3.4V8.6Z"
          fill="currentColor"
          stroke="currentColor"
          strokeLinejoin="round"
        />
        <rect
          x="3.8"
          y="5.3"
          width="16.4"
          height="13.4"
          rx="3.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
  },
};

const creatorCategories = [
  "General Creator",
  "Beauty",
  "Fashion",
  "Lifestyle",
  "Fitness",
  "Travel",
  "Education",
  "Tech",
  "Food",
  "Wellness",
];

function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.5 13.76 8.24 19.5 10l-5.74 1.76L12 17.5l-1.76-5.74L4.5 10l5.74-1.76L12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MenuIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 7h14M5 12h14M5 17h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 6L18 18M18 6 6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M10.5 13.5a4.3 4.3 0 0 1 0-6.1l1.7-1.7a4.3 4.3 0 0 1 6.1 6.1l-1 1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M13.5 10.5a4.3 4.3 0 0 1 0 6.1l-1.7 1.7a4.3 4.3 0 0 1-6.1-6.1l1-1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id="mail-icon-gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6d44ec" />
          <stop offset="0.62" stopColor="#5b3dd7" />
          <stop offset="1" stopColor="#f0b44b" />
        </linearGradient>
      </defs>
      <rect x="3.75" y="5.5" width="16.5" height="13" rx="3.2" stroke="url(#mail-icon-gradient)" strokeWidth="1.8" />
      <path
        d="M5.8 8.1 12 12.8l6.2-4.7"
        stroke="url(#mail-icon-gradient)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatRupees(value: number) {
  return `\u20b9${new Intl.NumberFormat("en-IN").format(Math.round(value))}`;
}

function formatLakhs(value: number) {
  const lakhValue = value / 100000;
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: lakhValue >= 10 ? 0 : 1,
  }).format(lakhValue);
  return `\u20b9${formatted}L`;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatUrl(value: string) {
  try {
    const parsed = new URL(value);
    return `${parsed.hostname.replace(/^www\./, "")}${parsed.pathname}${parsed.search}`;
  } catch {
    return value;
  }
}

function initialLeadState(platform: Platform | null): LeadFormState {
  return {
    fullName: "",
    email: "",
    phone: "",
    creatorCategory: platform ? platformMeta[platform].label : "General Creator",
    message: "",
  };
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function calculateClipCopy(result: CreatorWorthResult) {
  return [
    `Buzzroster creator worth report`,
    `Handle: ${result.handle}`,
    `Platform: ${platformMeta[result.platform].label}`,
    `Estimate: ${formatRupees(result.estimate.perCollabMin)} - ${formatRupees(result.estimate.perCollabMax)}`,
    `Creator score: ${result.scores.creatorScore}/100`,
    `Start your creator profile with Buzzroster`,
  ].join("\n");
}

function useOutsideScrollClose(onScrollClose: () => void) {
  useEffect(() => {
    const handleScroll = () => onScrollClose();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onScrollClose]);
}

function HeaderToolsDropdown({ active = false }: { active?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex items-center gap-1 rounded-full px-3 py-2 transition-colors hover:text-[#5c36d6] ${
          active ? "bg-[#f3edff] text-[#5c36d6]" : "text-[#1a1731]"
        }`}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>Tools</span>
        <ChevronIcon
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div aria-hidden="true" className="absolute left-0 right-0 top-full h-3" />

      <div
        role="menu"
        className={`absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-[1.6rem] border border-[#e4dcfb] bg-[linear-gradient(180deg,rgba(248,243,255,0.98)_0%,rgba(255,255,255,0.94)_100%)] p-4 shadow-[0_22px_50px_rgba(125,96,207,0.12)] backdrop-blur-xl transition-all duration-200 ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-1"
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-[#6d44ec]/75">
            Tools
          </span>
          <span className="ml-3 h-px flex-1 bg-[#e8e1f8]" />
        </div>

        <div className="grid gap-2.5">
          {toolsMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              role="menuitem"
              className="rounded-[1.05rem] border border-white/80 bg-white px-4 py-4 text-[1rem] text-[#3d3a57] shadow-[0_8px_20px_rgba(125,96,207,0.06)] transition-colors hover:border-[#e3d8ff] hover:bg-[#f7f2ff] hover:text-[#5c36d6]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function NavButton({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="rounded-2xl px-4 py-3 transition-colors hover:bg-[#f2ebff] hover:text-[#5c36d6]"
    >
      {label}
    </Link>
  );
}

function PreviewCard() {
  return (
    <div className="rounded-[2rem] border border-[#eadcfb] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(249,243,255,0.96)_100%)] p-5 shadow-[0_22px_60px_rgba(125,96,207,0.12)] backdrop-blur-xl sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#6d44ec]/75">
            Creator Worth Report
          </p>
          <div className="mt-2 h-8 w-40 rounded-full bg-[#efe7ff]" />
        </div>
        <div className="rounded-full border border-[#eadcfb] bg-white px-3 py-1 text-[0.78rem] font-semibold text-[#6d44ec] shadow-[0_8px_16px_rgba(125,96,207,0.08)]">
          Preview mode
        </div>
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-white/80 bg-white/78 p-4">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 animate-pulse rounded-full bg-[#efe7ff]" />
          <div className="min-w-0 flex-1">
            <div className="h-4 w-28 rounded-full bg-[#efe7ff]" />
            <div className="mt-2 h-3 w-48 max-w-full rounded-full bg-[#f2edf8]" />
          </div>
          <div className="hidden sm:flex">
            <div className="h-11 w-11 animate-pulse rounded-full border-[4px] border-[#e3d8ff] border-t-[#6d44ec]" />
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[1.2rem] border border-[#f1ebfb] bg-[#fcfaff] p-3"
            >
              <div className="h-3 w-20 rounded-full bg-[#efe7ff]" />
              <div className="mt-3 h-5 w-24 rounded-full bg-[#f2edf8]" />
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-[1.4rem] border border-[#f1ebfb] bg-[linear-gradient(90deg,rgba(244,237,255,0.8)_0%,rgba(255,246,239,0.72)_100%)] p-4">
          <div className="flex flex-wrap items-center gap-2 text-[0.86rem] font-medium text-[#645f7a]">
            <span className="rounded-full bg-white/70 px-3 py-1">
              Only Instagram + YouTube supported
            </span>
            <span className="rounded-full bg-white/70 px-3 py-1">No fake platform data</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="h-20 rounded-[1.2rem] bg-white/80" />
            <div className="h-20 rounded-[1.2rem] bg-white/80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalysisCard({
  platform,
  step,
}: {
  platform: Platform | null;
  step: number;
}) {
  const activePlatform = platform ? platformMeta[platform] : null;

  return (
    <div className="rounded-[2rem] border border-[#eadcfb] bg-[linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(249,243,255,0.96)_100%)] p-5 shadow-[0_22px_60px_rgba(125,96,207,0.12)] backdrop-blur-xl sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#6d44ec]/75">
            Creator Worth Report
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-serif)] text-[clamp(1.8rem,2.6vw,2.35rem)] font-medium tracking-[-0.05em] text-[#17162b]">
            Preparing your {activePlatform?.label ?? "creator"} report
          </h3>
        </div>
        <div className="rounded-full border border-[#eadcfb] bg-white px-3 py-1 text-[0.78rem] font-semibold text-[#6d44ec] shadow-[0_8px_16px_rgba(125,96,207,0.08)]">
          Live analysis
        </div>
      </div>

      <div className="mt-6 rounded-[1.6rem] border border-white/85 bg-white/82 p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-full bg-[linear-gradient(135deg,rgba(109,68,236,0.16)_0%,rgba(255,255,255,1)_100%)]" />
            <div className="absolute inset-0 flex items-center justify-center text-[#6d44ec]">
              {activePlatform?.icon}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[1rem] font-semibold text-[#1c1b30]">
              {activePlatform?.label ?? "Creator"} profile
            </div>
            <div className="mt-1 text-[0.92rem] text-[#6c6780]">
              Checking the supported platform and preparing your report.
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-[4px] border-[#e6dff8] border-t-[#6d44ec]">
            <div className="text-[0.72rem] font-semibold text-[#6d44ec]">
              {step + 1}
              <span className="block text-[0.58rem] text-[#827d98]">/5</span>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {analysisSteps.map((label, index) => {
            const active = index === step;
            const done = index < step;
            return (
              <div
                key={label}
                className={`flex items-center gap-3 rounded-[1rem] border px-3 py-3 transition-colors ${
                  active ? "border-[#d9caff] bg-[#f6f1ff]" : "border-[#f2ebfb] bg-white/60"
                }`}
              >
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[0.82rem] font-semibold ${
                    done
                      ? "bg-[#6d44ec] text-white"
                      : active
                        ? "bg-[#ede4ff] text-[#6d44ec]"
                        : "bg-[#f4f0fb] text-[#8d87a7]"
                  }`}
                >
                  {done ? "✓" : index + 1}
                </span>
                <div className="flex-1">
                  <div className="text-[0.95rem] font-medium text-[#1f1d33]">{label}</div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[#ece6f6]">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        active || done ? "w-[72%] bg-[#6d44ec]" : "w-[18%] bg-[#d9d4e7]"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  children,
  eyebrow,
}: {
  title: string;
  children: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="rounded-[1.7rem] border border-[#eadff7] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(248,243,255,0.92)_100%)] p-4 shadow-[0_16px_38px_rgba(125,96,207,0.08)] sm:p-5">
      {eyebrow ? (
        <div className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
          {eyebrow}
        </div>
      ) : null}
      <h3 className={`text-[1.05rem] font-semibold text-[#17162b] ${eyebrow ? "mt-2" : ""}`}>
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ScoreRing({
  score,
  label,
  accent = "#6d44ec",
}: {
  score: number;
  label: string;
  accent?: string;
}) {
  const circumference = 2 * Math.PI * 38;
  const dashOffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center rounded-[1.5rem] border border-[#ece2fb] bg-white/80 p-4">
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg aria-hidden="true" viewBox="0 0 96 96" className="h-32 w-32 -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="38"
            fill="none"
            stroke="#ebe5f6"
            strokeWidth="7"
          />
          <circle
            cx="48"
            cy="48"
            r="38"
            fill="none"
            stroke={accent}
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-[2rem] font-semibold tracking-[-0.06em] text-[#17162b]">
            {score}
          </div>
          <div className="text-[0.82rem] text-[#7b7890]">/100</div>
        </div>
      </div>
      <div className="mt-2 text-[0.92rem] font-medium text-[#4f4d66]">{label}</div>
    </div>
  );
}

function TopBar({
  result,
  onRecalculate,
  onOpenDrawer,
  onShare,
  shareNotice,
}: {
  result: CreatorWorthResult;
  onRecalculate: () => void;
  onOpenDrawer: () => void;
  onShare: () => void;
  shareNotice: string | null;
}) {
  return (
    <motion.div
      layout
      className="rounded-[1.8rem] border border-[#e7dbfa] bg-[rgba(255,255,255,0.8)] p-4 shadow-[0_18px_45px_rgba(125,96,207,0.08)] backdrop-blur-xl sm:p-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.8rem] font-semibold"
              style={{ background: platformMeta[result.platform].softAccent, color: platformMeta[result.platform].accent }}
            >
              <span className="flex items-center">{platformMeta[result.platform].icon}</span>
              {platformMeta[result.platform].label}
            </span>
            <span className="rounded-full border border-[#ece2fb] bg-white/80 px-3 py-1 text-[0.8rem] font-semibold text-[#4f4d66]">
              {result.handle}
            </span>
            <span className="rounded-full border border-[#ece2fb] bg-white/80 px-3 py-1 text-[0.8rem] font-semibold text-[#4f4d66]">
              {formatDateTime(result.fetchedAt)}
            </span>
            <span className="rounded-full border border-[#ece2fb] bg-white/80 px-3 py-1 text-[0.8rem] font-semibold text-[#4f4d66]">
              Confidence {result.confidence}%
            </span>
          </div>
          <div className="mt-3 text-[0.94rem] text-[#625f73]">
            Source: {result.dataSource}
          </div>
          <div className="mt-1 max-w-[56rem] truncate text-[0.92rem] text-[#625f73]">
            {formatUrl(result.profileUrl)}
          </div>
          {shareNotice ? (
            <div className="mt-2 text-[0.86rem] font-medium text-[#5c36d6]">{shareNotice}</div>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onRecalculate}
            className="rounded-2xl border border-[#cdbcf8] bg-white/80 px-4 py-3 text-[0.95rem] font-semibold text-[#6d44ec] shadow-[0_10px_26px_rgba(125,96,207,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
          >
            Recalculate
          </button>
          <button
            type="button"
            onClick={onShare}
            className="rounded-2xl border border-[#eadff7] bg-[linear-gradient(180deg,#fff_0%,#faf7ff_100%)] px-4 py-3 text-[0.95rem] font-semibold text-[#1c1b30] shadow-[0_10px_26px_rgba(125,96,207,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Share Report
          </button>
              <button
              type="button"
              onClick={onOpenDrawer}
              className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-[0.95rem] font-semibold text-white shadow-[0_16px_30px_rgba(91,61,215,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
            >
            I&apos;m Interested
            </button>
        </div>
      </div>
    </motion.div>
  );
}

function ResultDashboard({ result }: { result: CreatorWorthResult }) {
  const scoreCards = [
    { title: "Audience Quality", score: result.scores.audienceQuality },
    { title: "Engagement Strength", score: result.scores.engagementStrength },
    { title: "Brand Fit", score: result.scores.brandFit },
    { title: "Invite Readiness", score: result.scores.inviteReadiness },
    { title: "Consistency", score: result.scores.consistency },
    { title: "Growth Momentum", score: result.scores.growthMomentum },
  ];

  return (
    <div className="mt-5 space-y-5">
      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <DashboardCard title="Creator snapshot" eyebrow="Report summary">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#ece2fb] bg-white/78 p-4">
              <div className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                Handle
              </div>
              <div className="mt-2 text-[1.1rem] font-semibold text-[#17162b]">{result.handle}</div>
              <div className="mt-4 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                Profile URL
              </div>
              <div className="mt-2 break-all text-[0.92rem] leading-[1.55] text-[#5e5a70]">
                {formatUrl(result.profileUrl)}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ece2fb] bg-white/78 p-4">
              <div className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                Confidence
              </div>
              <div className="mt-2 text-[2.1rem] font-semibold tracking-[-0.06em] text-[#17162b]">
                {result.confidence}%
              </div>
              <div className="mt-1 text-[0.92rem] text-[#625f73]">{result.dataSource}</div>
              <div className="mt-4 rounded-[1rem] bg-[linear-gradient(90deg,rgba(244,237,255,0.9)_0%,rgba(255,246,239,0.9)_100%)] p-3">
                <div className="text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                  Last calculated
                </div>
                <div className="mt-1 text-[0.95rem] font-medium text-[#1c1b30]">
                  {formatDateTime(result.fetchedAt)}
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Estimated worth" eyebrow="Per collaboration / potential">
          <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] border border-[#ece2fb] bg-white/78 p-4">
              <div className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                Per collaboration
              </div>
              <div className="mt-2 text-[1.7rem] font-semibold tracking-[-0.05em] text-[#17162b]">
                {formatRupees(result.estimate.perCollabMin)} - {formatRupees(result.estimate.perCollabMax)}
              </div>
              <div className="mt-4 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                Monthly potential
              </div>
              <div className="mt-2 text-[1.25rem] font-semibold text-[#17162b]">
                {formatLakhs(result.estimate.monthlyMin)} - {formatLakhs(result.estimate.monthlyMax)}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ece2fb] bg-[linear-gradient(180deg,rgba(244,237,255,0.9)_0%,rgba(255,255,255,0.88)_100%)] p-4">
              <div className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                Annual potential
              </div>
              <div className="mt-2 text-[1.25rem] font-semibold text-[#17162b]">
                {formatLakhs(result.estimate.annualMin)} - {formatLakhs(result.estimate.annualMax)}
              </div>
              <div className="mt-4 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                Raw signals
              </div>
              <div className="mt-2 space-y-2 text-[0.92rem] text-[#5e5a70]">
                <div className="flex items-center justify-between gap-3">
                  <span>Followers</span>
                  <span className="font-semibold text-[#17162b]">
                    {new Intl.NumberFormat("en-IN").format(result.rawSignals.followers)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Average views</span>
                  <span className="font-semibold text-[#17162b]">
                    {new Intl.NumberFormat("en-IN").format(result.rawSignals.averageViews)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Engagement rate</span>
                  <span className="font-semibold text-[#17162b]">
                    {result.rawSignals.engagementRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <DashboardCard title="Creator score breakdown" eyebrow="Scoring">
          <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
            <ScoreRing score={result.scores.creatorScore} label="Creator score" />
            <div className="grid gap-2">
              {scoreCards.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between gap-3 rounded-[1rem] border border-[#ece2fb] bg-white/80 px-4 py-3"
                >
                  <span className="text-[0.95rem] font-medium text-[#46435d]">{item.title}</span>
                  <span className="text-[1rem] font-semibold text-[#17162b]">{item.score}/100</span>
                </div>
              ))}
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Best opportunities" eyebrow="Actionable matches">
          <div className="space-y-3">
            {result.opportunities.map((item) => (
              <div
                key={item.title}
                className="rounded-[1.2rem] border border-[#ece2fb] bg-white/80 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-[0.98rem] font-semibold text-[#1c1b30]">{item.title}</div>
                  <div className="rounded-full bg-[#f4edff] px-3 py-1 text-[0.8rem] font-semibold text-[#6d44ec]">
                    {item.fit}% fit
                  </div>
                </div>
                <div className="mt-2 text-[0.92rem] leading-[1.55] text-[#625f73]">{item.detail}</div>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <DashboardCard title="Brand match" eyebrow="Brand fit">
          <div className="space-y-3">
            {result.brandMatches.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center justify-between gap-3 rounded-[1.2rem] border border-[#ece2fb] bg-white/80 px-4 py-3"
              >
                <div>
                  <div className="text-[0.98rem] font-semibold text-[#1c1b30]">{brand.name}</div>
                  <div className="text-[0.88rem] text-[#625f73]">{brand.category}</div>
                </div>
                <div className="text-[1rem] font-semibold text-[#6d44ec]">{brand.match}%</div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Limitations" eyebrow="Data quality">
          <div className="space-y-3">
            {result.limitations.map((item) => (
              <div
                key={item}
                className="rounded-[1.2rem] border border-[#ece2fb] bg-white/80 px-4 py-3 text-[0.93rem] leading-[1.6] text-[#625f73]"
              >
                {item}
              </div>
            ))}
            <div className="rounded-[1.2rem] border border-[#ece2fb] bg-[linear-gradient(90deg,rgba(244,237,255,0.9)_0%,rgba(255,246,239,0.9)_100%)] px-4 py-3">
              <div className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                Content style
              </div>
              <div className="mt-2 text-[0.95rem] font-medium text-[#1c1b30]">
                {result.rawSignals.contentStyle}
              </div>
              <div className="mt-2 text-[0.92rem] text-[#625f73]">
                Audience: {result.rawSignals.audienceMood}
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

function LeadDrawer({
  open,
  onClose,
  result,
}: {
  open: boolean;
  onClose: () => void;
  result: CreatorWorthResult | null;
}) {
  const [status, setStatus] = useState<"form" | "submitting" | "success">("form");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<LeadFormState>(() =>
    initialLeadState(result?.platform ?? null),
  );

  const profileUrl = result?.profileUrl ?? "";

  const setField = (key: keyof LeadFormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitLead = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!result) {
      setError("No report is loaded yet.");
      return;
    }

    setStatus("submitting");
    setError(null);

    const response = await fetch("/api/tools/creator-worth/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        report: result,
      }),
    });

    if (!response.ok) {
      setStatus("form");
      setError("We could not submit your enquiry right now.");
      return;
    }

    setStatus("success");
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#17162b]/30 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: 460, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 460, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="fixed right-0 top-0 z-[90] flex h-full w-full max-w-[460px] flex-col border-l border-[#eadff7] bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(249,243,255,0.98)_100%)] shadow-[-18px_0_45px_rgba(125,96,207,0.16)]"
          >
            <div className="flex items-center justify-between border-b border-[#ece2fb] px-5 py-4">
              <div>
                <div className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                  Get creator opportunities with Buzzroster
                </div>
                <div className="mt-1 text-[0.96rem] leading-[1.5] text-[#625f73]">
                  Your creator worth report is ready. Share your details and we will follow up.
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#dccfff] bg-white text-[#6d44ec]"
                aria-label="Close drawer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {status === "success" ? (
                <div className="rounded-[1.6rem] border border-[#dcefd9] bg-[linear-gradient(180deg,rgba(236,248,233,0.92)_0%,rgba(255,255,255,0.98)_100%)] p-5 shadow-[0_16px_34px_rgba(34,197,94,0.12)]">
                  <div className="text-[0.86rem] font-semibold uppercase tracking-[0.24em] text-[#16a34a]">
                    Success
                  </div>
                  <h3 className="mt-3 text-[1.3rem] font-semibold tracking-[-0.04em] text-[#17162b]">
                    Thanks! Your creator worth report has been shared with Buzzroster.
                  </h3>
                  <p className="mt-3 text-[0.96rem] leading-[1.7] text-[#5e5a70]">
                    Our team will reach out with next steps.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => window.open("/", "_self")}
                      className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-[0.95rem] font-semibold text-white"
                    >
                      Create Creator Profile
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-2xl border border-[#cdbcf8] bg-white/80 px-4 py-3 text-[0.95rem] font-semibold text-[#6d44ec]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitLead} className="space-y-4">
                  <div className="rounded-[1.6rem] border border-[#eadff7] bg-white/82 p-4">
                    <div className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                      Auto-filled report summary
                    </div>
                    {!result ? (
                      <div className="mt-3 text-[0.95rem] text-[#625f73]">
                        Load a report before sending an enquiry.
                      </div>
                    ) : (
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {[
                          ["Creator", result.handle],
                          ["Platform", platformMeta[result.platform].label],
                          ["Profile URL", formatUrl(result.profileUrl)],
                          [
                            "Estimated worth",
                            `${formatRupees(result.estimate.perCollabMin)} - ${formatRupees(result.estimate.perCollabMax)}`,
                          ],
                          [
                            "Monthly potential",
                            `${formatLakhs(result.estimate.monthlyMin)} - ${formatLakhs(result.estimate.monthlyMax)}`,
                          ],
                          ["Creator score", `${result.scores.creatorScore}/100`],
                          ["Confidence", `${result.confidence}%`],
                          [
                            "Best opportunity",
                            result.opportunities[0]?.title ?? "Creator collaboration",
                          ],
                          [
                            "Invite readiness",
                            `${result.scores.inviteReadiness}/100`,
                          ],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-[1.2rem] border border-[#ece2fb] bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(248,243,255,0.94)_100%)] p-3"
                          >
                            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#6d44ec]/70">
                              {label}
                            </div>
                            <div className="mt-2 text-[0.9rem] font-medium leading-[1.5] text-[#1c1b30]">
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-[0.9rem] font-medium text-[#35314a]">Full name</span>
                      <input
                        value={form.fullName}
                        onChange={(event) => setField("fullName", event.target.value)}
                        className="rounded-[1.1rem] border border-[#e6ddf7] bg-white px-4 py-3 text-[0.96rem] outline-none focus:border-[#cdbcf8]"
                        placeholder="Your full name"
                        required
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-[0.9rem] font-medium text-[#35314a]">Email</span>
                      <input
                        value={form.email}
                        onChange={(event) => setField("email", event.target.value)}
                        type="email"
                        className="rounded-[1.1rem] border border-[#e6ddf7] bg-white px-4 py-3 text-[0.96rem] outline-none focus:border-[#cdbcf8]"
                        placeholder="you@example.com"
                        required
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-[0.9rem] font-medium text-[#35314a]">Phone / WhatsApp</span>
                      <input
                        value={form.phone}
                        onChange={(event) => setField("phone", event.target.value)}
                        className="rounded-[1.1rem] border border-[#e6ddf7] bg-white px-4 py-3 text-[0.96rem] outline-none focus:border-[#cdbcf8]"
                        placeholder="+91 90000 00000"
                        required
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-[0.9rem] font-medium text-[#35314a]">Creator category</span>
                      <select
                        value={form.creatorCategory}
                        onChange={(event) => setField("creatorCategory", event.target.value)}
                        className="rounded-[1.1rem] border border-[#e6ddf7] bg-white px-4 py-3 text-[0.96rem] outline-none focus:border-[#cdbcf8]"
                        required
                      >
                        {creatorCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="grid gap-2">
                    <span className="text-[0.9rem] font-medium text-[#35314a]">Short message</span>
                    <textarea
                      value={form.message}
                      onChange={(event) => setField("message", event.target.value)}
                      className="min-h-[120px] rounded-[1.3rem] border border-[#e6ddf7] bg-white px-4 py-3 text-[0.96rem] outline-none focus:border-[#cdbcf8]"
                      placeholder={`I am interested in creator opportunities for ${result?.handle ?? "this profile"}.`}
                      required
                    />
                  </label>

                  <div className="rounded-[1.4rem] border border-[#ece2fb] bg-white/80 p-4 text-[0.94rem] text-[#5e5a70]">
                    <div className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                      Read-only profile URL
                    </div>
                    <div className="mt-2 break-all text-[#1c1b30]">{profileUrl}</div>
                  </div>

                  {error ? (
                    <div className="rounded-[1.1rem] border border-[#f4c8d4] bg-[#fff6f8] px-4 py-3 text-[0.92rem] text-[#b13254]">
                      {error}
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={!result || status === "submitting"}
                      className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-[0.95rem] font-semibold text-white shadow-[0_16px_30px_rgba(91,61,215,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === "submitting" ? "Sending..." : "Send Enquiry"}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-2xl border border-[#cdbcf8] bg-white/80 px-4 py-3 text-[0.95rem] font-semibold text-[#6d44ec]"
                    >
                      Create Creator Profile
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default function CreatorWorthCalculatorPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [toolState, setToolState] = useState<ToolState>("idle");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [inputUrl, setInputUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreatorWorthResult | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareNotice, setShareNotice] = useState<string | null>(null);
  const [loadTick, setLoadTick] = useState(0);
  const timersRef = useRef<number[]>([]);
  const requestIdRef = useRef(0);

  useOutsideScrollClose(() => {
    if (navOpen) {
      setToolsOpen(false);
      setNavOpen(false);
    }
  });

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  useEffect(() => {
    if (!shareNotice) {
      return undefined;
    }

    const timeout = window.setTimeout(() => setShareNotice(null), 2200);
    return () => window.clearTimeout(timeout);
  }, [shareNotice]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  const resetToIdle = () => {
    clearTimers();
    requestIdRef.current += 1;
    setToolState("idle");
    setAnalysisStep(0);
    setResult(null);
    setDrawerOpen(false);
    setError(null);
    setShareNotice(null);
    setLoadTick((current) => current + 1);
  };

  const runAnalysis = async (url: string) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    clearTimers();
    setResult(null);
    setDrawerOpen(false);
    setShareNotice(null);
    setError(null);
    setAnalysisStep(0);
    setToolState("validating");

    timersRef.current.push(
      window.setTimeout(() => {
        if (requestIdRef.current === requestId) {
          setToolState("fetching");
        }
      }, 280),
    );

    analysisSteps.forEach((_, index) => {
      timersRef.current.push(
        window.setTimeout(() => {
          if (requestIdRef.current === requestId) {
            setAnalysisStep(index);
            if (index === analysisSteps.length - 1) {
              setToolState("analyzing");
            }
          }
        }, 500 + index * 470),
      );
    });

    const [response] = await Promise.all([
      fetch("/api/tools/creator-worth/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      }),
      sleep(2650),
    ]);

    if (requestIdRef.current !== requestId) {
      return;
    }

    if (response.ok) {
      const payload = (await response.json()) as {
        code: string;
        result: CreatorWorthResult;
      };

      setResult(payload.result);
      setToolState("loaded");
      setAnalysisStep(analysisSteps.length - 1);
      setLoadTick((current) => current + 1);
      return;
    }

    const payload = (await response.json()) as {
      code?: string;
      message?: string;
    };

    if (payload.code === "UNSUPPORTED_PLATFORM") {
      setToolState("unsupported");
    } else if (payload.code === "INSUFFICIENT_DATA") {
      setToolState("insufficient_data");
    } else {
      setToolState("error");
    }

    setError(
      payload.message ??
        "We could not process that profile right now. Please try another Instagram or YouTube profile URL.",
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = inputUrl.trim();

    if (!trimmed) {
      setToolState("error");
      setError("Paste an Instagram or YouTube profile URL to continue.");
      return;
    }

    const platform = detectPlatform(trimmed);
    if (!platform) {
      setToolState("unsupported");
      setError("Only Instagram and YouTube creator profile URLs are supported here.");
      return;
    }

    const context = extractProfileContext(trimmed);
    if (!context?.handle) {
      setToolState("insufficient_data");
      setError(
        "We could not detect a creator profile handle from that URL. Please paste a full profile link.",
      );
      return;
    }

    await runAnalysis(trimmed);
  };

  const topAreaMode =
    toolState === "loaded" && result
      ? "loaded"
      : toolState === "validating" || toolState === "fetching" || toolState === "analyzing"
        ? "analysis"
        : "idle";

  const handleShare = async () => {
    if (!result) {
      return;
    }

    const summary = calculateClipCopy(result);

    try {
      await navigator.clipboard.writeText(summary);
      setShareNotice("Share summary copied to clipboard.");
    } catch {
      setShareNotice("Could not access clipboard. Please copy the summary manually.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,#fcf7f0_0%,#faf3eb_24%,#f8f0fa_58%,#f7efe8_100%)] text-[#17162b]">
      <div className="absolute inset-0 opacity-90 [background:radial-gradient(circle_at_14%_18%,rgba(180,154,255,0.42),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(245,219,187,0.75),transparent_20%),radial-gradient(circle_at_52%_56%,rgba(209,191,255,0.38),transparent_26%),radial-gradient(circle_at_18%_82%,rgba(255,220,170,0.45),transparent_22%),radial-gradient(circle_at_84%_82%,rgba(193,171,255,0.3),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(255,255,255,0.22)_100%)]" />

      <div className="relative mx-auto flex min-h-screen w-full flex-col px-4 pb-10 pt-4 sm:px-6 lg:px-8">
        <header className="fixed left-1/2 top-4 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 rounded-[1.75rem] border border-white/55 bg-[rgba(255,255,255,0.58)] px-4 py-3 shadow-[0_14px_40px_rgba(125,96,207,0.08)] backdrop-blur-xl sm:w-[calc(100vw-3rem)] sm:px-6 lg:w-[calc(100vw-4rem)] lg:px-8">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="group flex items-start gap-1 text-[2.1rem] leading-none text-[#5c36d6] transition-transform duration-200 hover:scale-[1.01] sm:text-[2.4rem] lg:text-[2.8rem]"
              aria-label="Buzzroster home"
            >
              <span className="font-[family-name:var(--font-pacifico)] tracking-tight">
                Buzzroster
              </span>
              <SparkIcon className="mt-1 h-4 w-4 text-[#5c36d6] transition-transform duration-200 group-hover:rotate-12" />
            </Link>

            <nav className="hidden items-center gap-2 text-[0.96rem] font-medium text-[#1a1731] xl:flex">
              {navItems.map((item) =>
                item.label === "Tools" ? (
                  <HeaderToolsDropdown key={item.label} active />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-full px-3 py-2 transition-colors hover:text-[#5c36d6]"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="hidden items-center gap-3 sm:gap-4 xl:flex">
              <Link
                href="/"
                className="rounded-2xl border border-[#cdbcf8] bg-white/55 px-5 py-3 text-[1rem] font-medium text-[#1a1731] shadow-[0_10px_30px_rgba(111,76,203,0.08)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/75"
              >
                Login
              </Link>
              <Link
                href="/"
                className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-[1rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.38)] transition-transform duration-200 hover:-translate-y-0.5 sm:px-6"
              >
                Join Buzzroster free
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                setNavOpen((current) => {
                  const next = !current;
                  if (!next) {
                    setToolsOpen(false);
                  }
                  return next;
                });
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8cfff] bg-white/70 text-[#5c36d6] shadow-[0_10px_24px_rgba(125,96,207,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/90 xl:hidden"
              aria-label={navOpen ? "Close menu" : "Open menu"}
              aria-expanded={navOpen}
            >
              {navOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>

          <div
            className={`mt-3 overflow-hidden rounded-[1.5rem] border border-[#e1d7fb] bg-[rgba(255,255,255,0.94)] shadow-[0_20px_50px_rgba(125,96,207,0.12)] transition-all duration-300 xl:hidden ${
              navOpen ? "max-h-[82vh] opacity-100" : "max-h-0 border-transparent opacity-0"
            }`}
          >
            <div className="flex max-h-[82vh] flex-col gap-4 overflow-y-auto p-4 pb-8 overscroll-contain no-scrollbar">
              <nav className="grid gap-2 text-[1rem] font-medium text-[#1a1731]">
                {navItems.map((item) =>
                  item.label === "Tools" ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setToolsOpen((current) => !current)}
                      className="flex items-center justify-between rounded-2xl bg-[#f4edff] px-4 py-3 text-left text-[#5c36d6]"
                      aria-expanded={toolsOpen}
                      aria-controls="calculator-mobile-tools"
                    >
                      <span>Tools</span>
                      <ChevronIcon
                        className={`h-4 w-4 transition-transform duration-300 ease-out ${
                          toolsOpen ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </button>
                  ) : (
                    <NavButton
                      key={item.label}
                      label={item.label}
                      href={item.href}
                      onClick={() => {
                        setToolsOpen(false);
                        setNavOpen(false);
                      }}
                    />
                  ),
                )}
              </nav>

              <div
                id="calculator-mobile-tools"
                className={`overflow-hidden rounded-[1.4rem] border border-[#efe7ff] bg-[#faf7ff] transition-all duration-300 ease-out ${
                  toolsOpen
                    ? "max-h-96 translate-y-0 opacity-100"
                    : "max-h-0 -translate-y-1 border-transparent opacity-0"
                }`}
              >
                <div className="p-4">
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#6d44ec]">
                    Tools
                  </p>
                  <div className="mt-3 grid gap-2">
                    {toolsMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setToolsOpen(false);
                          setNavOpen(false);
                        }}
                        className="rounded-2xl bg-white px-4 py-3 text-[0.98rem] text-[#302d47] shadow-[0_8px_20px_rgba(125,96,207,0.06)] transition-colors hover:bg-[#f4edff] hover:text-[#5c36d6]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 pt-2 pb-2">
                <Link
                  href="/"
                  onClick={() => {
                    setToolsOpen(false);
                    setNavOpen(false);
                  }}
                  className="rounded-2xl border border-[#cdbcf8] bg-white/70 px-4 py-3 text-center text-[1rem] font-medium text-[#1a1731] shadow-[0_10px_24px_rgba(111,76,203,0.08)] transition-colors hover:bg-white"
                >
                  Login
                </Link>
                <Link
                  href="/"
                  onClick={() => {
                    setToolsOpen(false);
                    setNavOpen(false);
                  }}
                  className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-center text-[1rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.32)]"
                >
                  Join Buzzroster free
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="relative mx-auto flex w-full max-w-[1280px] flex-1 flex-col pt-24 lg:pt-28">
          <AnimatePresence mode="wait">
            {topAreaMode === "loaded" && result ? (
              <motion.div
                key={`loaded-${loadTick}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <TopBar
                  result={result}
                  onRecalculate={resetToIdle}
                  onOpenDrawer={() => setDrawerOpen(true)}
                  onShare={handleShare}
                  shareNotice={shareNotice}
                />
              </motion.div>
            ) : topAreaMode === "analysis" ? (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start"
              >
                <div className="relative">
                  <AnalysisCard platform={detectPlatform(inputUrl)} step={analysisStep} />
                </div>
                <PreviewCard />
              </motion.div>
            ) : (
              <motion.div
                key={`idle-${toolState}-${loadTick}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid gap-8 lg:grid-cols-[1.04fr_0.96fr] lg:items-start"
              >
                <div className="relative">
                  <h1 className="max-w-[11.5ch] font-[family-name:var(--font-serif)] text-[clamp(3rem,5.4vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-[#17162b]">
                    <span className="block">Know your creator worth</span>
                    <span className="block text-[#6d44ec]">for Instagram and YouTube.</span>
                  </h1>

                  <p className="mt-5 max-w-[42rem] text-[clamp(1rem,1.5vw,1.18rem)] leading-[1.55] text-[#5e5a70]">
                    Paste a profile link and Buzzroster will generate a focused worth report for
                    supported Instagram or YouTube creator profiles only.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                    <div className="rounded-[1.6rem] border border-[#e7def7] bg-[rgba(255,255,255,0.8)] p-3 shadow-[0_16px_40px_rgba(125,96,207,0.08)] backdrop-blur-sm">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.2rem] border border-[#eee7fb] bg-white px-4 py-4">
                          <LinkIcon className="h-5 w-5 shrink-0 text-[#8d7bc8]" />
                          <input
                            value={inputUrl}
                            onChange={(event) => {
                              setInputUrl(event.target.value);
                              if (toolState === "error" || toolState === "unsupported" || toolState === "insufficient_data") {
                                setError(null);
                                setToolState("idle");
                              }
                            }}
                            type="url"
                            inputMode="url"
                            placeholder="Paste Instagram or YouTube profile URL"
                            className="min-w-0 flex-1 bg-transparent text-[1rem] text-[#1e1d31] outline-none placeholder:text-[#8b86a1]"
                          />
                        </div>
                        <button
                          type="submit"
                          className="inline-flex items-center justify-center gap-2 rounded-[1.2rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-5 py-4 text-[1rem] font-semibold text-white shadow-[0_18px_35px_rgba(91,61,215,0.28)] transition-transform duration-200 hover:-translate-y-0.5 sm:min-w-[14rem]"
                        >
                          Estimate My Worth
                          <SparkIcon className="h-4 w-4 text-white/85" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {Object.values(platformMeta).map((meta) => {
                        const active = toolState !== "idle" && result?.platform === meta.key;
                        return (
                          <span
                            key={meta.key}
                            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.95rem] font-medium shadow-[0_8px_20px_rgba(125,96,207,0.06)] ${
                              active
                                ? "border-transparent text-white"
                                : "border-[#ebe2fb] bg-white/75 text-[#4d4964]"
                            }`}
                            style={
                              active
                                ? {
                                    background: `linear-gradient(135deg, ${meta.accent} 0%, #5b3dd7 100%)`,
                                  }
                                : undefined
                            }
                          >
                            <span
                              className="flex h-6 w-6 items-center justify-center rounded-full"
                              style={
                                active
                                  ? { background: "rgba(255,255,255,0.16)", color: "white" }
                                  : { background: meta.softAccent, color: meta.accent }
                              }
                            >
                              {meta.icon}
                            </span>
                            {meta.label}
                          </span>
                        );
                      })}
                    </div>

                    <div
                      className={`text-[0.92rem] leading-[1.5] ${
                        toolState === "error" ||
                        toolState === "unsupported" ||
                        toolState === "insufficient_data"
                          ? "text-[#c54c69]"
                          : "text-[#6a6680]"
                      }`}
                    >
                      {error ? (
                        <span>{error}</span>
                      ) : (
                        <span>
                          Secure scan · No spam · Built for Instagram and YouTube creator profiles
                        </span>
                      )}
                    </div>
                  </form>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        title: "01 · Paste profile",
                        text: "Drop in a public Instagram or YouTube creator URL.",
                        icon: <LinkIcon className="h-5 w-5 text-[#6d44ec]" />,
                      },
                      {
                        title: "02 · Analyze signals",
                        text: "Buzzroster confirms the platform and prepares the report state.",
                        icon: <SparkIcon className="h-5 w-5 text-[#f0b44b]" />,
                      },
                      {
                        title: "03 · Continue forward",
                        text: "Move toward creator profile creation and brand discovery.",
                        icon: <ChevronIcon className="h-5 w-5 text-[#6d44ec]" />,
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.4rem] border border-white/75 bg-[rgba(255,255,255,0.72)] p-4 shadow-[0_14px_34px_rgba(125,96,207,0.06)] backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f4edff]">
                            {item.icon}
                          </div>
                          <div className="text-[0.95rem] font-semibold text-[#19182e]">
                            {item.title}
                          </div>
                        </div>
                        <p className="mt-3 text-[0.93rem] leading-[1.55] text-[#64607a]">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <PreviewCard />
              </motion.div>
            )}
          </AnimatePresence>

          {toolState === "loaded" && result ? <ResultDashboard result={result} /> : null}

          {toolState !== "loaded" ? (
            <section className="mt-10 grid gap-4 rounded-[2rem] border border-white/75 bg-[rgba(255,255,255,0.56)] p-4 shadow-[0_18px_48px_rgba(125,96,207,0.08)] backdrop-blur-sm lg:grid-cols-3 lg:p-5">
              {[
                {
                  title: "Focus",
                  value: "Instagram + YouTube",
                  text: "No extra social networks are included in this calculator.",
                },
                {
                  title: "Experience",
                  value: "Compact and premium",
                  text: "The layout stays laptop-first, then collapses cleanly on mobile.",
                },
                {
                  title: "Next step",
                  value: "Creator Profile",
                  text: "Guide creators into Buzzroster once the calculator flow is complete.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.5rem] border border-[#eadff7] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(248,243,255,0.92)_100%)] p-4"
                >
                  <div className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                    {item.title}
                  </div>
                  <div className="mt-2 text-[1.05rem] font-semibold text-[#17162b]">
                    {item.value}
                  </div>
                  <p className="mt-2 text-[0.95rem] leading-[1.55] text-[#645f77]">
                    {item.text}
                  </p>
                </div>
              ))}
            </section>
          ) : null}

          <section className="mt-6 rounded-[2rem] border border-[#eadff7] bg-[linear-gradient(90deg,rgba(244,237,255,0.92)_0%,rgba(255,245,237,0.88)_100%)] px-5 py-5 shadow-[0_18px_46px_rgba(125,96,207,0.08)] sm:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec]/70">
                  Supported scope
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-serif)] text-[clamp(1.8rem,2.5vw,2.6rem)] font-medium tracking-[-0.05em] text-[#17162b]">
                  Built only for Instagram and YouTube creator profiles.
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.values(platformMeta).map((meta) => (
                  <span
                    key={meta.key}
                    className="inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/70 px-4 py-2 text-[0.95rem] font-medium text-[#4d4964]"
                  >
                    <span style={{ color: meta.accent }}>{meta.icon}</span>
                    {meta.label}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </section>

        {toolState === "loaded" && result ? (
          <motion.button
            key={`worth-${result.fetchedAt}`}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: [1, 1.06, 1], x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            onClick={() => setDrawerOpen(true)}
            className="fixed bottom-5 right-5 z-40 hidden h-14 w-14 items-center justify-center rounded-[1.35rem] border border-[#eadff7] bg-[rgba(255,255,255,0.94)] shadow-[0_18px_40px_rgba(125,96,207,0.16)] backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 md:flex"
            aria-label="Open creator worth contact drawer"
          >
            <MailIcon className="h-6 w-6" />
          </motion.button>
        ) : null}

        <LeadDrawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          result={result}
        />
      </div>
    </main>
  );
}
