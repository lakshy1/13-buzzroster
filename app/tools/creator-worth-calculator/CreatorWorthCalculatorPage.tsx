"use client";

import Link from "next/link";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type FormEvent } from "react";

type Currency = "INR" | "USD";
type Platform = "Instagram" | "YouTube" | "TikTok" | "LinkedIn" | "X";

type CreatorWorthResult = {
  platform: Platform;
  handle: string;
  niche: string;
  followers: number;
  engagementRate: number;
  audienceQualityScore: number;
  profileStrengthScore: number;
  inviteReadinessScore: number;
  estimatedPerPostMin: number;
  estimatedPerPostMax: number;
  estimatedMonthlyMin: number;
  estimatedMonthlyMax: number;
  bestCollabTypes: string[];
  recommendedActions: string[];
};

type PreviewProfile = {
  platform: Platform | null;
  handle: string;
  displayName: string;
  niche: string;
  accent: string;
  followers: string;
  quality: string;
  status: string;
};

const supportedPlatformHints: Record<
  Platform,
  {
    label: string;
    multiplier: number;
    followerMin: number;
    followerMax: number;
    engagementMin: number;
    engagementMax: number;
    format: string;
    bestCollabs: string[];
  }
> = {
  Instagram: {
    label: "Instagram creator",
    multiplier: 1.05,
    followerMin: 8000,
    followerMax: 220000,
    engagementMin: 0.024,
    engagementMax: 0.07,
    format: "Reels, carousels and stories",
    bestCollabs: ["UGC Video", "Reel Promotion", "Story Package", "Brand Ambassador"],
  },
  YouTube: {
    label: "YouTube channel",
    multiplier: 1.18,
    followerMin: 12000,
    followerMax: 350000,
    engagementMin: 0.02,
    engagementMax: 0.06,
    format: "Long-form reviews and Shorts",
    bestCollabs: ["Product Review", "Brand Integration", "Affiliate Campaign", "Brand Ambassador"],
  },
  TikTok: {
    label: "TikTok profile",
    multiplier: 1.0,
    followerMin: 10000,
    followerMax: 260000,
    engagementMin: 0.03,
    engagementMax: 0.11,
    format: "Short-form trends and creator-led UGC",
    bestCollabs: ["UGC Video", "Reel Promotion", "Unboxing", "Story Package"],
  },
  LinkedIn: {
    label: "LinkedIn creator",
    multiplier: 1.22,
    followerMin: 5000,
    followerMax: 120000,
    engagementMin: 0.016,
    engagementMax: 0.045,
    format: "Thought leadership and expert posts",
    bestCollabs: ["Brand Ambassador", "Event Promotion", "Product Review", "Affiliate Campaign"],
  },
  X: {
    label: "X profile",
    multiplier: 0.88,
    followerMin: 7000,
    followerMax: 150000,
    engagementMin: 0.014,
    engagementMax: 0.035,
    format: "Fast-moving posts and threads",
    bestCollabs: ["Sponsored Thread", "Brand Integration", "Event Promotion", "UGC Video"],
  },
};

const nicheOptions = [
  { name: "Beauty", multiplier: 1.18 },
  { name: "Tech", multiplier: 1.16 },
  { name: "Lifestyle", multiplier: 1.08 },
  { name: "Fashion", multiplier: 1.14 },
  { name: "Fitness", multiplier: 1.12 },
  { name: "Travel", multiplier: 1.1 },
  { name: "Education", multiplier: 1.2 },
  { name: "Business", multiplier: 1.24 },
  { name: "Food", multiplier: 1.06 },
  { name: "Wellness", multiplier: 1.13 },
];

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function seededRandom(seed: number, salt: number) {
  const value = Math.sin(seed + salt * 97.13) * 10000;
  return value - Math.floor(value);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(Math.round(value));
}

function formatMoney(value: number, currency: Currency) {
  const rounded = Math.round(value);
  if (currency === "USD") {
    return `$${formatNumber(rounded)}`;
  }
  return `Rs ${formatNumber(rounded)}`;
}

function currencyMultiplier(currency: Currency) {
  return currency === "USD" ? 1 : 83;
}

function formatConvertedMoney(valueUsd: number, currency: Currency) {
  return formatMoney(valueUsd * currencyMultiplier(currency), currency);
}

function detectPlatform(profileUrl: string): Platform | null {
  let parsed: URL;
  try {
    parsed = new URL(profileUrl.startsWith("http") ? profileUrl : `https://${profileUrl}`);
  } catch {
    return null;
  }

  const host = parsed.hostname.toLowerCase();

  if (host.includes("instagram.com")) return "Instagram";
  if (host.includes("youtube.com") || host.includes("youtu.be")) return "YouTube";
  if (host.includes("tiktok.com")) return "TikTok";
  if (host.includes("linkedin.com")) return "LinkedIn";
  if (host.includes("x.com") || host.includes("twitter.com")) return "X";
  return null;
}

function extractHandle(profileUrl: string, platform: Platform) {
  const parsed = new URL(profileUrl.startsWith("http") ? profileUrl : `https://${profileUrl}`);
  const segments = parsed.pathname.split("/").filter(Boolean);

  if (platform === "LinkedIn" && segments[0] === "in" && segments[1]) {
    return segments[1].replace("@", "");
  }

  if (platform === "YouTube") {
    const handle = segments.find((segment) => segment.startsWith("@"));
    if (handle) return handle.replace("@", "");
  }

  const firstSegment = segments[0]?.replace("@", "");
  return firstSegment || parsed.hostname.replace(/^www\./, "");
}

function getPreviewProfile(profileUrl: string): PreviewProfile {
  const platform = detectPlatform(profileUrl);

  if (!platform) {
    return {
      platform: null,
      handle: "creator.profile",
      displayName: "Profile preview",
      niche: "Waiting for a supported link",
      accent: "#d0c5ff",
      followers: "Paste a link",
      quality: "No analysis yet",
      status: "Enter a supported profile URL",
    };
  }

  const seed = hashString(profileUrl.toLowerCase());
  const config = supportedPlatformHints[platform];
  const handle = extractHandle(profileUrl, platform);
  const followerCount = Math.round(config.followerMin + seededRandom(seed, 12) * (config.followerMax - config.followerMin));
  const niche = nicheOptions[seed % nicheOptions.length];
  const audienceQuality = clamp(Math.round(60 + seededRandom(seed, 3) * 30), 55, 96);

  return {
    platform,
    handle,
    displayName: `@${handle}`,
    niche: niche.name,
    accent: platform === "YouTube" ? "#ef7f58" : platform === "TikTok" ? "#17162b" : platform === "LinkedIn" ? "#4d7bd6" : "#6d44ec",
    followers: `${formatNumber(followerCount)} followers`,
    quality: `${audienceQuality}/100 audience quality`,
    status: config.label,
  };
}

function estimateCreatorWorth(profileUrl: string): CreatorWorthResult {
  const platform = detectPlatform(profileUrl);
  if (!platform) throw new Error("unsupported");

  const seed = hashString(profileUrl.toLowerCase());
  const platformConfig = supportedPlatformHints[platform];
  const niche = nicheOptions[seed % nicheOptions.length];

  const followerBias = Math.pow(seededRandom(seed, 1), 0.72);
  const followers = Math.round(
    platformConfig.followerMin + (platformConfig.followerMax - platformConfig.followerMin) * followerBias,
  );

  const engagementRate =
    platformConfig.engagementMin +
    (platformConfig.engagementMax - platformConfig.engagementMin) * seededRandom(seed, 2);

  const audienceQualityScore = clamp(
    Math.round(60 + seededRandom(seed, 3) * 26 + (niche.multiplier - 1) * 22 + (platformConfig.multiplier - 1) * 16),
    52,
    96,
  );

  const consistencyScore = clamp(Math.round(58 + seededRandom(seed, 4) * 25), 50, 95);
  const formatScore = clamp(Math.round(55 + seededRandom(seed, 5) * 28), 50, 95);

  const profileStrengthScore = clamp(
    Math.round(audienceQualityScore * 0.38 + consistencyScore * 0.32 + formatScore * 0.3),
    50,
    98,
  );

  const inviteReadinessScore = clamp(
    Math.round(profileStrengthScore * 0.92 + audienceQualityScore * 0.06 + seededRandom(seed, 6) * 6),
    50,
    99,
  );

  const audienceQualityMultiplier = 0.9 + (audienceQualityScore / 100) * 0.45;
  const contentFormatMultiplier = 0.94 + seededRandom(seed, 7) * 0.18;

  const estimatedPerPostUsd =
    followers *
    engagementRate *
    platformConfig.multiplier *
    niche.multiplier *
    audienceQualityMultiplier *
    contentFormatMultiplier *
    0.02;

  const estimatedPerPostMin = estimatedPerPostUsd * 0.76;
  const estimatedPerPostMax = estimatedPerPostUsd * 1.34;

  const collaborationFloor = profileStrengthScore > 82 ? 6 : profileStrengthScore > 70 ? 5 : 4;
  const collaborationCeil = profileStrengthScore > 82 ? 9 : profileStrengthScore > 70 ? 8 : 6;

  const estimatedMonthlyMin = estimatedPerPostMin * collaborationFloor;
  const estimatedMonthlyMax = estimatedPerPostMax * collaborationCeil;

  const collabOptions = platformConfig.bestCollabs;
  const bestCollabTypes = Array.from(
    new Set([
      collabOptions[seed % collabOptions.length],
      collabOptions[(seed + 1) % collabOptions.length],
      collabOptions[(seed + 2) % collabOptions.length],
      collabOptions[(seed + 3) % collabOptions.length],
    ]),
  );

  const actionOptions = [
    "Complete your Buzzroster creator profile",
    "Add portfolio samples",
    "Add collaboration rates",
    "Connect social links",
    "Add past brand work",
    "Improve bio and niche clarity",
  ];

  const recommendedActions = [
    actionOptions[seed % actionOptions.length],
    actionOptions[(seed + 2) % actionOptions.length],
    actionOptions[(seed + 4) % actionOptions.length],
    actionOptions[(seed + 1) % actionOptions.length],
  ];

  return {
    platform,
    handle: extractHandle(profileUrl, platform),
    niche: niche.name,
    followers,
    engagementRate,
    audienceQualityScore,
    profileStrengthScore,
    inviteReadinessScore,
    estimatedPerPostMin,
    estimatedPerPostMax,
    estimatedMonthlyMin,
    estimatedMonthlyMax,
    bestCollabTypes,
    recommendedActions,
  };
}

function SmallIcon({
  kind,
  className = "",
  color = "#6d44ec",
}: {
  kind: "search" | "spark" | "phone" | "camera" | "check" | "chart" | "help" | "link";
  className?: string;
  color?: string;
}) {
  switch (kind) {
    case "search":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
          <circle cx="11" cy="11" r="6.5" stroke={color} strokeWidth="1.8" />
          <path d="M16 16L20 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "spark":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M12 3l1.7 4.6L18.5 9l-4.8 1.4L12 15l-1.7-4.6L5.5 9l4.8-1.4L12 3Z"
            fill={color}
            fillOpacity="0.16"
            stroke={color}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "phone":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="7" y="3" width="10" height="18" rx="2.5" stroke={color} strokeWidth="1.8" />
          <path d="M10 6.5h4" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="18.1" r="0.9" fill={color} />
        </svg>
      );
    case "camera":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="4" y="7" width="16" height="11" rx="2.5" stroke={color} strokeWidth="1.8" />
          <path d="M8 7l1.4-2h5.2L16 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="12.5" r="2.6" stroke={color} strokeWidth="1.8" />
        </svg>
      );
    case "check":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M6.5 12.5 10 16l7.5-8" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chart":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M4 18.5h16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M6.5 15v-4M11.5 15V8.5M16.5 15v-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "help":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
          <path
            d="M10.1 9a2.1 2.1 0 1 1 4 0c0 1.7-2 2.1-2 3.8"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="17.1" r="1" fill={color} />
          <path d="M4.8 12a7.2 7.2 0 1 0 14.4 0 7.2 7.2 0 0 0-14.4 0Z" stroke={color} strokeWidth="1.6" />
        </svg>
      );
    case "link":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
          <path d="M9.5 14.5 14.5 9.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path
            d="M10 6.5 8 4.5a4.2 4.2 0 0 0-5.9 5.9l2 2"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 17.5 16 19.5a4.2 4.2 0 0 0 5.9-5.9l-2-2"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function ScoreRing({ score, accent }: { score: number; accent: string }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference - (score / 100) * circumference;

  return (
    <svg aria-hidden="true" viewBox="0 0 120 120" className="h-[120px] w-[120px] -rotate-90">
      <circle cx="60" cy="60" r={radius} fill="none" stroke="#ede7f7" strokeWidth="8" />
      <motion.circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={accent}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: dash }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <g transform="rotate(90 60 60)">
        <text x="60" y="65" textAnchor="middle" className="fill-[#17162b] text-[2rem] font-semibold">
          {score}
        </text>
        <text x="60" y="84" textAnchor="middle" className="fill-[#7a7690] text-[0.9rem]">
          /100
        </text>
      </g>
    </svg>
  );
}

function MetricCard({
  label,
  value,
  note,
}: {
  label: string;
  value?: string | null;
  note: string;
}) {
  return (
    <div className="rounded-[1.35rem] border border-[#efe7fb] bg-white/88 p-5 shadow-[0_10px_28px_rgba(125,96,207,0.06)]">
      <div className="text-[0.88rem] text-[#7b778e]">{label}</div>
      {value ? (
        <div className="mt-3 text-[clamp(1.45rem,2vw,2rem)] font-semibold tracking-[-0.05em] text-[#17162b]">
          {value}
        </div>
      ) : (
        <div className="mt-3 text-[1.1rem] font-semibold text-[#c2b9da]">Awaiting analysis</div>
      )}
      <div className="mt-2 text-[0.9rem] leading-[1.5] text-[#68647d]">{note}</div>
    </div>
  );
}

function SignalRow({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[1.2rem] border border-[#efe7fb] bg-[#fcf9ff] px-4 py-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: accent }}>
        <SmallIcon kind="spark" className="h-4 w-4" color="#ffffff" />
      </div>
      <div className="min-w-0">
        <div className="text-[0.84rem] uppercase tracking-[0.14em] text-[#807a95]">{label}</div>
        <div className="mt-1 text-[0.98rem] font-semibold leading-[1.45] text-[#1c1b30]">{value}</div>
      </div>
    </div>
  );
}

function CreatorWorthHeroVisual({
  result,
  loading,
  currency,
  profile,
}: {
  result: CreatorWorthResult | null;
  loading: boolean;
  currency: Currency;
  profile: PreviewProfile;
}) {
  const hasResult = Boolean(result);
  const perPost = result
    ? `${formatConvertedMoney(result.estimatedPerPostMin, currency)} - ${formatConvertedMoney(result.estimatedPerPostMax, currency)}`
    : null;
  const monthly = result
    ? `${formatConvertedMoney(result.estimatedMonthlyMin, currency)} - ${formatConvertedMoney(result.estimatedMonthlyMax, currency)}`
    : null;
  const annual = result
    ? `${formatConvertedMoney(result.estimatedMonthlyMin * 12, currency)} - ${formatConvertedMoney(result.estimatedMonthlyMax * 12, currency)}`
    : null;

  return (
    <div className="relative min-h-[760px] w-full">
      <div className="absolute left-8 top-4 h-24 w-24 rounded-full bg-[#e7ddff] blur-3xl" />
      <div className="absolute right-10 top-12 h-28 w-28 rounded-full bg-[#ffe8cc] blur-3xl" />
      <div className="absolute bottom-8 left-12 h-24 w-24 rounded-full bg-[#f4dfff] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="absolute inset-0 rounded-[2rem] border border-white/75 bg-[rgba(255,255,255,0.78)] p-5 shadow-[0_18px_50px_rgba(125,96,207,0.12)] backdrop-blur-xl sm:p-6"
      >
        <div className="flex h-full flex-col gap-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-[64%]">
              <div className="inline-flex items-center rounded-full bg-[#f1ebff] px-4 py-2 text-[0.86rem] font-semibold text-[#6d44ec]">
                Creator Worth Report
              </div>
              <div className="mt-5 flex items-center gap-4">
                <div
                  className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#efe7f9] bg-white text-[2rem] font-semibold text-[#6d44ec]"
                  style={{ boxShadow: `0 0 0 8px ${profile.accent}12` }}
                >
                  {profile.platform ? profile.platform.slice(0, 2).toUpperCase() : "PR"}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="truncate text-[1.4rem] font-semibold text-[#17162b]">{profile.displayName}</div>
                    <span className="rounded-full bg-[#eef3ff] px-2.5 py-1 text-[0.76rem] font-semibold text-[#4f72d7]">
                      verified
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[0.96rem] text-[#67657a]">
                    <SmallIcon kind="camera" className="h-4 w-4" color="#ef7f58" />
                    <span>{profile.platform || "Waiting for a supported link"}</span>
                  </div>
                  <div className="mt-3 inline-flex rounded-full bg-[#f0eaff] px-4 py-2 text-[0.86rem] font-semibold text-[#6d44ec]">
                    {profile.niche}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              {hasResult ? (
                <>
                  <ScoreRing score={result!.inviteReadinessScore} accent={profile.accent} />
                  <div className="text-[0.92rem] font-semibold text-[#19182e]">
                    Creator Score <span className="text-[#f2b13d]">*</span>
                  </div>
                </>
              ) : (
                <div className="flex h-[140px] w-[140px] flex-col items-center justify-center rounded-full border border-dashed border-[#d9cfff] bg-white/70 text-center text-[#6d44ec]">
                  <SmallIcon kind="spark" className="h-7 w-7" color="#6d44ec" />
                  <div className="mt-2 text-[0.84rem] font-semibold text-[#6d44ec]">Awaiting analysis</div>
                </div>
              )}
            </div>
          </div>

          <div className="grid flex-1 gap-5 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="grid gap-5">
              <div className="rounded-[1.6rem] border border-[#f0ebf8] bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(248,243,255,0.92))] p-5 sm:p-6">
                <div className="text-[0.9rem] uppercase tracking-[0.18em] text-[#7a7690]">
                  Estimated earnings per collaboration
                </div>
                {loading ? (
                  <div className="mt-5 space-y-3">
                    <div className="h-12 w-3/4 rounded-2xl bg-[#efe7fb]" />
                    <div className="h-4 w-1/2 rounded-full bg-[#f2ecff]" />
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="h-24 rounded-[1.2rem] bg-[#f7f2ff]" />
                      <div className="h-24 rounded-[1.2rem] bg-[#f7f2ff]" />
                      <div className="h-24 rounded-[1.2rem] bg-[#f7f2ff]" />
                    </div>
                  </div>
                ) : hasResult ? (
                  <>
                    <div className="mt-4 text-[clamp(2.3rem,3vw,4rem)] font-semibold tracking-[-0.06em] text-[#6d44ec]">
                      {perPost}
                    </div>
                    <div className="mt-2 text-[0.9rem] text-[#8a859d]">Average range based on public signals</div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <MetricCard
                        label="Per post / reel"
                        value={perPost}
                        note="A collaboration starter range"
                      />
                      <MetricCard
                        label="Monthly potential"
                        value={monthly}
                        note="Typical monthly earning window"
                      />
                      <MetricCard
                        label="Annual potential"
                        value={annual}
                        note="Longer-term collaboration range"
                      />
                    </div>
                  </>
                ) : (
                  <div className="mt-5 grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
                    <div className="rounded-[1.35rem] border border-dashed border-[#dccdf7] bg-white/75 p-5">
                      <div className="text-[1rem] font-semibold text-[#1c1b30]">Enter a supported profile URL</div>
                      <p className="mt-2 text-[0.95rem] leading-[1.7] text-[#68647d]">
                        We will detect the platform, estimate the range, and show a clean breakdown of audience quality,
                        brand fit, and collaboration value.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Instagram", "YouTube", "TikTok", "LinkedIn", "X"].map((item) => (
                          <span key={item} className="rounded-full bg-[#f4edff] px-3 py-1 text-[0.84rem] font-semibold text-[#5c36d6]">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <MetricCard label="Per post / reel" note="Unlock after analysis" />
                      <MetricCard label="Monthly potential" note="Unlock after analysis" />
                      <MetricCard label="Annual potential" note="Unlock after analysis" />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <MetricCard
                  label="Audience signal"
                  value={hasResult ? `${result!.audienceQualityScore}/100` : null}
                  note={hasResult ? "How brand-safe and relevant the audience looks" : "Audience score will appear after analysis"}
                />
                <MetricCard
                  label="Profile strength"
                  value={hasResult ? `${result!.profileStrengthScore}/100` : null}
                  note={hasResult ? "Signals how collaboration-ready the profile is" : "Profile strength will appear after analysis"}
                />
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[1.6rem] border border-[#ece6f8] bg-white/90 p-5 shadow-[0_10px_28px_rgba(125,96,207,0.06)]">
                <div className="text-[1rem] font-semibold uppercase tracking-[0.18em] text-[#7a7690]">
                  Profile scan card
                </div>
                <div className="mt-4 rounded-[1.4rem] bg-[linear-gradient(135deg,rgba(109,68,236,0.08),rgba(245,186,132,0.12))] p-4">
                  <div className="text-[0.95rem] font-semibold text-[#6d44ec]">What Buzzroster reads from a public link</div>
                  <p className="mt-2 text-[0.94rem] leading-[1.6] text-[#676278]">
                    Public platform, handle, audience cues, niche alignment, and profile readiness all influence the report.
                  </p>
                </div>
                <div className="mt-4 grid gap-3">
                  <SignalRow
                    label="Platform"
                    value={profile.platform ? supportedPlatformHints[profile.platform].label : "Waiting for a supported link"}
                    accent="#f4edff"
                  />
                  <SignalRow label="Profile identity" value={profile.displayName} accent="#fff4e8" />
                  <SignalRow label="Audience quality" value={profile.quality} accent="#edf7ee" />
                  <SignalRow label="Status" value={profile.status} accent="#eef6ff" />
                </div>
              </div>

              <div className="rounded-[1.6rem] border border-[#ece6f8] bg-white/90 p-5 shadow-[0_10px_28px_rgba(125,96,207,0.06)]">
                <div className="text-[1rem] font-semibold text-[#1c1b30]">
                  {hasResult ? "Best collaboration types" : "Your report will unlock here"}
                </div>
                {hasResult ? (
                  <>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {result!.bestCollabTypes.map((type) => (
                        <span key={type} className="rounded-full border border-[#dccdf7] bg-[#f8f4ff] px-4 py-2 text-[0.92rem] font-semibold text-[#5c36d6]">
                          {type}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 space-y-3">
                      {result!.recommendedActions.map((action) => (
                        <div key={action} className="flex items-start gap-3 rounded-2xl bg-[#faf7ff] px-4 py-3">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#edf7ee] text-[#2f8a45]">
                            <SmallIcon kind="check" className="h-4 w-4" color="#2f8a45" />
                          </span>
                          <span className="text-[0.96rem] leading-[1.65] text-[#5f5b73]">{action}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mt-4 rounded-[1.35rem] border border-dashed border-[#dccdf7] bg-[#fcfaff] p-5">
                    <div className="text-[0.98rem] font-semibold text-[#1c1b30]">Paste a URL to see the full analysis.</div>
                    <p className="mt-2 text-[0.94rem] leading-[1.7] text-[#676278]">
                      Once you click Estimate My Worth, Buzzroster will detect the platform and populate the live report.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {["Brand fit", "Invite readiness", "Audience quality"].map((item) => (
                        <span key={item} className="rounded-full bg-[#f2ecff] px-3 py-1 text-[0.82rem] font-semibold text-[#6d44ec]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-4 top-4 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(109,68,236,0.12)_0%,rgba(255,255,255,0)_75%)]" />
      </motion.div>
    </div>
  );
}

function InterestModal({
  open,
  onClose,
  onInterested,
  successMessage,
}: {
  open: boolean;
  onClose: () => void;
  onInterested: () => void;
  successMessage: string;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#140f26]/45 px-4 py-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.24 }}
            className="w-full max-w-[560px] rounded-[1.6rem] border border-white/70 bg-[rgba(255,255,255,0.96)] p-6 shadow-[0_24px_70px_rgba(31,24,57,0.22)]"
          >
            <div className="inline-flex rounded-full bg-[#f2ecff] px-4 py-2 text-[0.86rem] font-semibold text-[#6d44ec]">
              Get creator opportunities with Buzzroster
            </div>
            <div className="mt-3 text-[1.5rem] font-semibold tracking-[-0.04em] text-[#17162b]">
              Want Buzzroster to help you get real brand opportunities?
            </div>
            <p className="mt-2 text-[0.98rem] leading-[1.65] text-[#68647d]">
              Your estimate is just the starting point. Create your Buzzroster profile so brands can discover you, invite you,
              and collaborate with you directly.
            </p>

            {successMessage ? (
              <div className="mt-5 rounded-[1.2rem] border border-[#d4efd9] bg-[#f1fbf3] px-4 py-3 text-[0.96rem] font-medium text-[#226b35]">
                {successMessage}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={onInterested}
                className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-5 py-3 text-[0.98rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.3)]"
              >
                I&apos;m Interested
              </button>
              <Link
                href="/"
                className="rounded-2xl border border-[#d6caf8] px-5 py-3 text-[0.98rem] font-semibold text-[#5c36d6]"
              >
                Join as Creator
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-[#ece6f8] px-5 py-3 text-[0.98rem] font-semibold text-[#6b6880]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function CreatorWorthCalculatorPage() {
  const prefersReducedMotion = useReducedMotion();
  const [profileUrl, setProfileUrl] = useState("");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [result, setResult] = useState<CreatorWorthResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [interestOpen, setInterestOpen] = useState(false);
  const [interestSuccess, setInterestSuccess] = useState("");
  const previewProfile = getPreviewProfile(profileUrl);

  useEffect(() => {
    if (!loading) return;

    const timer = window.setTimeout(() => {
      try {
        const nextResult = estimateCreatorWorth(profileUrl);
        setResult(nextResult);
        setLoading(false);
      } catch {
        setError("Please paste a valid creator profile link.");
        setLoading(false);
      }
    }, 1450);

    return () => window.clearTimeout(timer);
  }, [loading, profileUrl]);

  const submitEstimate = (event: FormEvent) => {
    event.preventDefault();
    const value = profileUrl.trim();

    if (!value) {
      setError("Paste your social profile link to continue.");
      return;
    }

    const detectedPlatform = detectPlatform(value);
    if (!detectedPlatform) {
      setError("We currently support Instagram, YouTube, TikTok, LinkedIn, and X/Twitter links.");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);
  };

  const convertedResult = result
    ? {
        perPostMin: result.estimatedPerPostMin * currencyMultiplier(currency),
        perPostMax: result.estimatedPerPostMax * currencyMultiplier(currency),
        monthlyMin: result.estimatedMonthlyMin * currencyMultiplier(currency),
        monthlyMax: result.estimatedMonthlyMax * currencyMultiplier(currency),
        annualMin: result.estimatedMonthlyMin * currencyMultiplier(currency) * 12,
        annualMax: result.estimatedMonthlyMax * currencyMultiplier(currency) * 12,
      }
    : null;

  const handleInterestClick = () => {
    console.log("creator_interest_lead", {
      profileUrl,
      estimated_monthly_min: convertedResult ? Math.round(convertedResult.monthlyMin) : null,
      estimated_monthly_max: convertedResult ? Math.round(convertedResult.monthlyMax) : null,
    });
    setInterestSuccess(
      result
        ? `Thanks! We captured your interest for @${result.handle} and will use this analysis as a starting point.`
        : "Thanks! We captured your interest and will use your profile link as the starting point.",
    );
  };

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
      <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fcf7f0_0%,#faf3eb_28%,#f8f0fa_62%,#f7efe8_100%)] text-[#17162b]">
        <div className="absolute inset-0 opacity-85 [background:radial-gradient(circle_at_14%_18%,rgba(180,154,255,0.42),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(245,219,187,0.75),transparent_20%),radial-gradient(circle_at_52%_56%,rgba(209,191,255,0.38),transparent_26%),radial-gradient(circle_at_18%_82%,rgba(255,220,170,0.45),transparent_22%),radial-gradient(circle_at_84%_82%,rgba(193,171,255,0.3),transparent_24%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(255,255,255,0.24)_100%)]" />

        <header className="fixed left-1/2 top-4 z-50 flex w-[calc(100vw-2rem)] -translate-x-1/2 items-center justify-between gap-4 rounded-[1.75rem] border border-white/60 bg-[rgba(255,255,255,0.72)] px-4 py-3 shadow-[0_14px_40px_rgba(125,96,207,0.1)] backdrop-blur-xl sm:w-[calc(100vw-3rem)] sm:px-6 md:w-[calc(100vw-4rem)] md:px-8">
          <Link
            href="/"
            className="group flex items-start gap-1 text-[2.4rem] leading-none text-[#5c36d6] transition-transform duration-200 hover:scale-[1.01] md:text-[2.8rem]"
            aria-label="Back to Buzzroster home"
          >
            <span className="font-[family-name:var(--font-pacifico)] tracking-tight">Buzzroster</span>
            <SmallIcon kind="spark" className="mt-1 h-4 w-4" color="#5c36d6" />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="rounded-2xl border border-[#cdbcf8] bg-white/65 px-5 py-3 text-[1rem] font-medium text-[#1a1731] shadow-[0_10px_30px_rgba(111,76,203,0.08)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/85"
            >
              Back home
            </Link>
            <Link
              href="/"
              className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-[1rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.38)] transition-transform duration-200 hover:-translate-y-0.5 sm:px-6"
            >
              Join as Creator
            </Link>
          </div>
        </header>

        <div className="relative mx-auto flex min-h-screen w-full flex-col px-4 pb-0 pt-24 sm:px-6 md:px-8 md:pt-28">
          <section className="mx-auto flex w-[85vw] max-w-none flex-col gap-10 lg:min-h-[calc(100vh-9rem)] lg:flex-row lg:items-center lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42 }}
              className="relative z-10 flex-[0.96]"
            >
              <h1 className="mt-5 max-w-[760px] font-[family-name:var(--font-bodoni)] text-[clamp(2.8rem,4.7vw,5.7rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[#17162b]">
                <span className="block">
                  Know your <span className="text-[#6d44ec]">creator worth</span>
                </span>
                <span className="block">
                  before your <span className="text-[#6d44ec]">next brand deal.</span>
                </span>
              </h1>
              <p className="mt-5 max-w-[660px] text-[clamp(1rem,1.15vw,1.18rem)] leading-[1.72] text-[#605c72]">
                Paste your social media profile link to instantly estimate your potential brand deal value, monthly earnings,
                and creator opportunity.
              </p>

              <form onSubmit={submitEstimate} className="mt-8 max-w-[760px]">
                <div className="relative rounded-full border border-[#d9cbf8] bg-white/82 p-2 shadow-[0_18px_45px_rgba(125,96,207,0.1)]">
                  <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top_left,rgba(109,68,236,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(245,186,132,0.16),transparent_28%)]" />
                  <div className="relative flex items-center gap-3 rounded-full border border-transparent bg-white/45 px-4 py-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f4edff]">
                      <SmallIcon kind="link" className="h-5 w-5" color="#6d44ec" />
                    </div>
                    <input
                      value={profileUrl}
                      onChange={(event) => setProfileUrl(event.target.value)}
                      className="min-w-0 flex-1 bg-transparent text-[1rem] text-[#1b1a2b] outline-none placeholder:text-[#8a859d]"
                      placeholder="Paste Instagram / YouTube / TikTok / LinkedIn / X profile URL"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="rounded-full bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-5 py-3 text-[0.98rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.3)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      Estimate My Worth
                    </button>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  {[
                    { label: "Instagram", color: "#ef7f58" },
                    { label: "YouTube", color: "#e34d4d" },
                    { label: "TikTok", color: "#17162b" },
                    { label: "LinkedIn", color: "#4d7bd6" },
                    { label: "X", color: "#17162b" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center gap-2 rounded-full border border-[#e7e0f5] bg-white/80 px-4 py-2 text-[0.92rem] font-semibold text-[#1d1b2f] shadow-[0_8px_24px_rgba(125,96,207,0.06)]"
                    >
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                      {item.label}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.92rem] text-[#6b6880]">
                  <span>No signup required for a basic estimate.</span>
                  <span className="hidden h-1 w-1 rounded-full bg-[#c8bce8] sm:inline-flex" />
                  <span>Supported: Instagram, YouTube, TikTok, LinkedIn and X/Twitter.</span>
                </div>
                {error ? (
                  <div className="mt-4 rounded-[1rem] border border-[#f2d6d8] bg-[#fff5f5] px-4 py-3 text-[0.95rem] text-[#b14d57]">
                    {error}
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrency("INR")}
                    className={`rounded-full border px-4 py-2 text-[0.92rem] font-semibold transition ${
                      currency === "INR"
                        ? "border-[#6d44ec] bg-[#f4edff] text-[#5c36d6]"
                        : "border-[#d9d0f1] bg-white/70 text-[#5f5a73]"
                    }`}
                  >
                    INR
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("USD")}
                    className={`rounded-full border px-4 py-2 text-[0.92rem] font-semibold transition ${
                      currency === "USD"
                        ? "border-[#6d44ec] bg-[#f4edff] text-[#5c36d6]"
                        : "border-[#d9d0f1] bg-white/70 text-[#5f5a73]"
                    }`}
                  >
                    USD
                  </button>
                </div>
              </form>
            </motion.div>

            <div className="relative flex-[1.04]">
              <CreatorWorthHeroVisual result={result} loading={loading} currency={currency} profile={previewProfile} />
            </div>
          </section>
        </div>

        <motion.button
          type="button"
          onClick={() => setInterestOpen(true)}
          aria-label="Open creator opportunities popup"
          className="fixed bottom-5 right-5 z-[90] flex h-16 w-16 items-center justify-center rounded-full border border-white/75 bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] text-white shadow-[0_20px_40px_rgba(91,61,215,0.35)] backdrop-blur-sm"
          animate={{ rotate: [0, -4, 4, -4, 0], y: [0, -1, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <SmallIcon kind="help" className="h-7 w-7" color="#ffffff" />
        </motion.button>

        <InterestModal
          open={interestOpen}
          onClose={() => setInterestOpen(false)}
          onInterested={handleInterestClick}
          successMessage={interestSuccess}
        />
      </main>
    </MotionConfig>
  );
}
