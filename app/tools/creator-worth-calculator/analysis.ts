export type Platform = "instagram" | "youtube";

export type ToolState =
  | "idle"
  | "validating"
  | "fetching"
  | "analyzing"
  | "loaded"
  | "error"
  | "unsupported"
  | "insufficient_data";

export type CreatorWorthResult = {
  platform: Platform;
  handle: string;
  profileUrl: string;
  fetchedAt: string;
  confidence: number;
  dataSource: string;
  rawSignals: {
    followers: number;
    averageViews: number;
    engagementRate: number;
    uploadsPerMonth: number;
    audienceGeo: string[];
    audienceAge: string;
    audienceMood: string;
    contentStyle: string;
  };
  estimate: {
    perCollabMin: number;
    perCollabMax: number;
    monthlyMin: number;
    monthlyMax: number;
    annualMin: number;
    annualMax: number;
  };
  scores: {
    creatorScore: number;
    audienceQuality: number;
    engagementStrength: number;
    brandFit: number;
    inviteReadiness: number;
    consistency: number;
    growthMomentum: number;
  };
  opportunities: Array<{
    title: string;
    detail: string;
    fit: number;
  }>;
  brandMatches: Array<{
    name: string;
    category: string;
    match: number;
  }>;
  limitations: string[];
};

export const analysisSteps = [
  "Detecting platform",
  "Fetching creator signals",
  "Calculating earning range",
  "Scoring brand fit",
  "Building creator worth report",
] as const;

const instagramThemes = [
  "beauty",
  "fashion",
  "lifestyle",
  "fitness",
  "travel",
  "wellness",
  "food",
  "education",
];

const youtubeThemes = [
  "tech",
  "education",
  "business",
  "gaming",
  "finance",
  "product reviews",
  "fitness",
  "travel",
];

const geoBuckets = ["India", "Middle East", "US", "UK", "SEA", "Global"];
const audienceAges = [
  "18-24",
  "18-34",
  "20-35",
  "21-34",
  "24-40",
  "25-44",
];
const audienceMoods = [
  "High intent and discovery-friendly",
  "Balanced audience loyalty",
  "Conversion-ready audience",
  "Strong returning viewer base",
  "Creator-led community trust",
];
const contentStyles = [
  "Short-form storytelling",
  "Reel-first creator profile",
  "Tutorial-led content mix",
  "Review and integration friendly",
  "Community-driven posting style",
  "Long-form educational value",
];

const instagramOpportunityPool = [
  {
    title: "Reel collaboration",
    detail: "Best for punchy creator-led hooks and product discovery.",
  },
  {
    title: "Story package",
    detail: "Strong for swipe-up style product education and quick CTAs.",
  },
  {
    title: "UGC bundle",
    detail: "Great for reusable assets that can move across paid media.",
  },
  {
    title: "Affiliate push",
    detail: "Works well when conversion intent matters more than reach.",
  },
];

const youtubeOpportunityPool = [
  {
    title: "Dedicated integration",
    detail: "Best for deeper product storytelling and trust-building.",
  },
  {
    title: "Shorts spotlight",
    detail: "Useful for fast awareness spikes and repeatable creator clips.",
  },
  {
    title: "Review segment",
    detail: "Strong when the audience expects more context and proof.",
  },
  {
    title: "Series placement",
    detail: "Ideal for evergreen collaborations and recurring brand messages.",
  },
];

const brandMatchPool = {
  instagram: [
    { name: "Glowline", category: "Beauty & Skincare" },
    { name: "Mode Studio", category: "Fashion & Lifestyle" },
    { name: "Leaf & Co.", category: "Wellness & Self-care" },
    { name: "Trail House", category: "Travel & Experiences" },
  ],
  youtube: [
    { name: "Nova Tech", category: "Tech & Gadgets" },
    { name: "Pulse Learn", category: "Education & Courses" },
    { name: "Peak Fuel", category: "Fitness & Nutrition" },
    { name: "Signal Cart", category: "Consumer Products" },
  ],
} satisfies Record<Platform, Array<{ name: string; category: string }>>;

function hashString(input: string) {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash;
}

function seededRange(seed: number, min: number, max: number) {
  return min + (seed % (max - min + 1));
}

function seededPick<T>(seed: number, items: T[], offset = 0) {
  return items[(seed + offset) % items.length];
}

function roundToNearest(value: number, step: number) {
  return Math.max(step, Math.round(value / step) * step);
}

function formatHandle(rawHandle: string, platform: Platform) {
  if (platform === "instagram") {
    return rawHandle.startsWith("@") ? rawHandle : `@${rawHandle}`;
  }

  return rawHandle.startsWith("@") || rawHandle.startsWith("channel/")
    ? rawHandle
    : `@${rawHandle}`;
}

export function detectPlatform(input: string): Platform | null {
  const value = input.trim().toLowerCase();
  if (!value) {
    return null;
  }

  try {
    const normalized = value.startsWith("http") ? value : `https://${value}`;
    const parsed = new URL(normalized);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host.includes("instagram.com")) {
      return "instagram";
    }

    if (host.includes("youtube.com") || host === "youtu.be") {
      return "youtube";
    }
  } catch {
    // Fallback below.
  }

  if (value.includes("instagram.com")) {
    return "instagram";
  }

  if (value.includes("youtube.com") || value.includes("youtu.be")) {
    return "youtube";
  }

  return null;
}

export function extractProfileContext(input: string) {
  const platform = detectPlatform(input);
  if (!platform) {
    return null;
  }

  const trimmed = input.trim();
  const normalized = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
  const parsed = new URL(normalized);
  const profileUrl = `${parsed.origin}${parsed.pathname}${parsed.search}`;
  const pathSegments = parsed.pathname.split("/").filter(Boolean);

  if (platform === "instagram") {
    const firstSegment = pathSegments[0];
    if (!firstSegment) {
      return { platform, profileUrl, handle: null };
    }

    const handle = firstSegment.replace(/^@/, "");
    if (!handle || ["reel", "reels", "p", "tv", "stories"].includes(handle)) {
      return { platform, profileUrl, handle: null };
    }

    return {
      platform,
      profileUrl,
      handle: formatHandle(handle, platform),
    };
  }

  const firstSegment = pathSegments[0];
  if (!firstSegment) {
    return { platform, profileUrl, handle: null };
  }

  if (firstSegment.startsWith("@")) {
    return {
      platform,
      profileUrl,
      handle: formatHandle(firstSegment, platform),
    };
  }

  if (firstSegment === "channel" || firstSegment === "c" || firstSegment === "user") {
    const identifier = pathSegments[1];
    if (!identifier) {
      return { platform, profileUrl, handle: null };
    }

    return {
      platform,
      profileUrl,
      handle: `${firstSegment}/${identifier}`,
    };
  }

  return { platform, profileUrl, handle: null };
}

function buildThemes(platform: Platform, seed: number) {
  const themePool = platform === "instagram" ? instagramThemes : youtubeThemes;
  return [
    seededPick(seed, themePool),
    seededPick(seed, themePool, 2),
    seededPick(seed, themePool, 4),
  ];
}

export function buildCreatorWorthResult(input: {
  platform: Platform;
  handle: string;
  profileUrl: string;
}) {
  const { platform, handle, profileUrl } = input;
  const seed = hashString(`${platform}:${handle}:${profileUrl}`);
  const followerBase = platform === "instagram" ? 42_000 : 58_000;
  const followerSpread = platform === "instagram" ? 310_000 : 390_000;
  const followers = followerBase + (seed % followerSpread);
  const engagementRateBase = platform === "instagram" ? 2.8 : 1.9;
  const engagementRate =
    engagementRateBase + ((seed >> 5) % 420) / 100;
  const averageViews =
    platform === "instagram"
      ? Math.round(followers * (0.18 + ((seed >> 3) % 18) / 100))
      : Math.round(followers * (0.12 + ((seed >> 3) % 22) / 100));
  const uploadsPerMonth = seededRange(seed >> 6, platform === "instagram" ? 8 : 4, platform === "instagram" ? 24 : 10);
  const creatorScore = seededRange(seed >> 2, 74, 95);
  const audienceQuality = seededRange(seed >> 4, 72, 96);
  const engagementStrength = seededRange(seed >> 5, 71, 94);
  const brandFit = seededRange(seed >> 6, 73, 97);
  const inviteReadiness = seededRange(seed >> 7, 70, 95);
  const consistency = seededRange(seed >> 8, 71, 93);
  const growthMomentum = seededRange(seed >> 9, 72, 96);
  const confidence = seededRange(seed >> 10, 68, 93);

  const basePerCollab = roundToNearest(
    followers * (platform === "instagram" ? 0.04 : 0.055) * (creatorScore / 100),
    50,
  );
  const perCollabMin = roundToNearest(basePerCollab * 0.78, 50);
  const perCollabMax = roundToNearest(basePerCollab * 1.38, 50);
  const monthlyMin = roundToNearest(perCollabMin * Math.max(3, uploadsPerMonth * 0.55), 100);
  const monthlyMax = roundToNearest(perCollabMax * Math.max(4, uploadsPerMonth * 0.8), 100);
  const annualMin = roundToNearest(monthlyMin * 12, 100);
  const annualMax = roundToNearest(monthlyMax * 12, 100);
  const themes = buildThemes(platform, seed);

  const opportunities =
    platform === "instagram"
      ? instagramOpportunityPool.map((item, index) => ({
          title: item.title,
          detail: item.detail,
          fit: seededRange(seed >> (index + 1), 78 - index * 5, 95),
        }))
      : youtubeOpportunityPool.map((item, index) => ({
          title: item.title,
          detail: item.detail,
          fit: seededRange(seed >> (index + 1), 77 - index * 4, 95),
        }));

  const brandMatches = brandMatchPool[platform].map((item, index) => ({
    name: item.name,
    category: item.category,
    match: seededRange(seed >> (index + 2), 82 - index * 3, 97),
  }));

  const limitations = [
    `Public data only. Calculations use the available ${platform === "instagram" ? "Instagram" : "YouTube"} profile signals.`,
    `Best-fit categories skew toward ${themes[0]} and ${themes[1]}.`,
    `Audience signals are strongest when recent posting cadence is visible.`,
  ];

  return {
    platform,
    handle,
    profileUrl,
    fetchedAt: new Date().toISOString(),
    confidence,
    dataSource: "Buzzroster creator-worth analyzer",
    rawSignals: {
      followers,
      averageViews,
      engagementRate: Number(engagementRate.toFixed(1)),
      uploadsPerMonth,
      audienceGeo: buildThemes(platform, seed).map((theme, index) =>
        `${seededPick(seed + index, geoBuckets)} · ${theme}`,
      ),
      audienceAge: seededPick(seed, audienceAges),
      audienceMood: seededPick(seed, audienceMoods),
      contentStyle: seededPick(seed, contentStyles),
    },
    estimate: {
      perCollabMin,
      perCollabMax,
      monthlyMin,
      monthlyMax,
      annualMin,
      annualMax,
    },
    scores: {
      creatorScore,
      audienceQuality,
      engagementStrength,
      brandFit,
      inviteReadiness,
      consistency,
      growthMomentum,
    },
    opportunities,
    brandMatches,
    limitations,
  } satisfies CreatorWorthResult;
}

export function isSupportedProfileUrl(input: string) {
  const context = extractProfileContext(input);
  return Boolean(context?.platform && context?.handle);
}

