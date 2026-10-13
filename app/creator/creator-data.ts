export type SidebarItem = {
  label: string;
  href: string;
  icon: "dashboard" | "invites" | "campaigns" | "portfolio" | "earnings" | "messages" | "profile" | "calculator" | "settings";
};

export type MetricCard = {
  label: string;
  value: string;
  note: string;
  tone: "violet" | "green" | "orange" | "blue";
  icon: "mail" | "briefcase" | "wallet" | "spark";
};

export type AttentionItem = {
  brand: string;
  campaign: string;
  status: string;
  statusTone: "violet" | "orange" | "blue";
  deadline: string;
  action: string;
};

export type InviteCard = {
  brand: string;
  campaign: string;
  niche: string;
  payout: string;
  deliverables: string;
  fit: string;
  accent: string;
};

export type CampaignRow = {
  brand: string;
  campaign: string;
  progress: Array<"done" | "current" | "upcoming">;
};

export type PaymentRow = {
  campaign: string;
  amount: string;
  status: string;
  date: string;
};

export type MessageRow = {
  brand: string;
  text: string;
  time: string;
  unread?: string;
};

export const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/creator/dashboard", icon: "dashboard" },
  { label: "Opportunities", href: "/creator/invites", icon: "invites" },
  { label: "Campaigns", href: "/creator/campaigns", icon: "campaigns" },
  { label: "Profile", href: "/creator/profile", icon: "profile" },
  { label: "Portfolio", href: "/creator/portfolio", icon: "portfolio" },
  { label: "Earnings", href: "/creator/earnings", icon: "earnings" },
  { label: "Messages", href: "/creator/messages", icon: "messages" },
  { label: "Settings", href: "/creator/settings", icon: "settings" },
];

export const metricCards: MetricCard[] = [
  { label: "Total invites", value: "12", note: "5 need a response", tone: "violet", icon: "mail" },
  { label: "Active campaigns", value: "5", note: "2 due this week", tone: "green", icon: "briefcase" },
  { label: "Estimated earnings", value: "INR 48,750", note: "3 payments pending", tone: "orange", icon: "wallet" },
  { label: "Profile strength", value: "82%", note: "Good standing", tone: "blue", icon: "spark" },
];

export const attentionItems: AttentionItem[] = [
  {
    brand: "Skinsi",
    campaign: "Summer Glow Campaign",
    status: "Invite pending",
    statusTone: "violet",
    deadline: "Respond by May 18",
    action: "View invite",
  },
  {
    brand: "Plum Goodness",
    campaign: "Monsoon Skincare Picks",
    status: "Delivery due",
    statusTone: "orange",
    deadline: "Submit by May 16",
    action: "Continue",
  },
  {
    brand: "Mamaearth",
    campaign: "Urban Range Campaign",
    status: "Payment",
    statusTone: "blue",
    deadline: "Processing in 2-3 days",
    action: "View payment",
  },
];

export const inviteCards: InviteCard[] = [
  {
    brand: "Dot & Key",
    campaign: "Hydration Heroes Campaign",
    niche: "Skincare",
    payout: "INR 35,000",
    deliverables: "3 deliverables",
    fit: "92% match",
    accent: "#53bed0",
  },
  {
    brand: "mCaffeine",
    campaign: "Wake Up & Glow Campaign",
    niche: "Beauty",
    payout: "INR 28,000",
    deliverables: "2 deliverables",
    fit: "88% match",
    accent: "#161616",
  },
  {
    brand: "The Derma Co.",
    campaign: "Clear Skin Challenge",
    niche: "Skincare",
    payout: "INR 40,000",
    deliverables: "3 deliverables",
    fit: "90% match",
    accent: "#5b2db8",
  },
  {
    brand: "Minimalist",
    campaign: "Barrier Repair Series",
    niche: "Skincare",
    payout: "INR 24,000",
    deliverables: "2 deliverables",
    fit: "86% match",
    accent: "#4f7ef6",
  },
];

export const activeCampaigns: CampaignRow[] = [
  {
    brand: "Plum Goodness",
    campaign: "Monsoon Skincare Picks",
    progress: ["done", "done", "current", "upcoming", "upcoming"],
  },
  {
    brand: "Mamaearth",
    campaign: "Urban Range Campaign",
    progress: ["done", "done", "current", "upcoming", "upcoming"],
  },
  {
    brand: "Dot & Key",
    campaign: "Hydration Heroes Campaign",
    progress: ["done", "current", "upcoming", "upcoming", "upcoming"],
  },
];

export const payments: PaymentRow[] = [
  { campaign: "Mamaearth - Urban Range", amount: "INR 32,000", status: "Processing", date: "May 12, 2025" },
  { campaign: "Plum - Monsoon Picks", amount: "INR 28,500", status: "Paid", date: "May 08, 2025" },
  { campaign: "Dot & Key - Hydration Heroes", amount: "INR 18,000", status: "Released", date: "May 01, 2025" },
  { campaign: "Skinsi - Summer Glow", amount: "INR 21,000", status: "Queued", date: "Apr 24, 2025" },
];

export const messages: MessageRow[] = [
  {
    brand: "Plum Goodness",
    text: "Just checking in on the content delivery timeline.",
    time: "10:30 AM",
    unread: "2",
  },
  {
    brand: "Skinsi",
    text: "Loved your work. Shall we discuss the next phase?",
    time: "Yesterday",
  },
  {
    brand: "Dot & Key",
    text: "Your content is performing really well. Great job.",
    time: "May 13",
  },
  {
    brand: "Minimalist",
    text: "Can you share an alternate cut for stories?",
    time: "May 10",
  },
];

export const calendarItems = [
  { label: "Plum Goodness - Submission Due", date: "May 16", dot: "#7f56f4" },
  { label: "Skinsi - Response Deadline", date: "May 18", dot: "#ff8a4d" },
  { label: "Dot & Key - Content Review", date: "May 20", dot: "#4d7cff" },
  { label: "Mamaearth - Payment Payout", date: "May 22", dot: "#25b38b" },
];

export const profileChecklist = [
  { label: "Profile photo added", done: true },
  { label: "Bio looks great", done: true },
  { label: "Niche selected", done: true },
  { label: "Portfolio added", done: true },
  { label: "Add social links", done: false },
];

export const creatorPlatforms = [
  { name: "Instagram", handle: "@lakshya.creates", followers: "423.9K", engagement: "5.4%", accent: "#ef7f58" },
  { name: "YouTube", handle: "@lakshyastudio", followers: "127.1K", engagement: "6.2%", accent: "#ff5d5d" },
  { name: "LinkedIn", handle: "@lakshya-creator-ops", followers: "22.4K", engagement: "3.1%", accent: "#4d7cff" },
];

export const audienceBreakdown = [
  { label: "Women 18-24", share: "34%" },
  { label: "Women 25-34", share: "29%" },
  { label: "Men 18-24", share: "18%" },
  { label: "Men 25-34", share: "11%" },
];

export const creatorShowcase = [
  { title: "Morning routine reel", value: "182K views", type: "Instagram Reel", tone: "violet" },
  { title: "Skincare shelf breakdown", value: "96K views", type: "YouTube Short", tone: "orange" },
  { title: "Campaign behind the scenes", value: "68K views", type: "Story set", tone: "blue" },
  { title: "Creator pricing tips", value: "41K views", type: "LinkedIn post", tone: "green" },
];

export const collaborationWins = [
  { brand: "Plum Goodness", result: "4.7x ROAS lift on creator code", note: "Repeat partner for 3 campaigns" },
  { brand: "Dot & Key", result: "1.2M combined impressions", note: "Strong performance on skin barrier series" },
  { brand: "Mamaearth", result: "23% click-through on launch sequence", note: "Fast review cycle and on-time delivery" },
];

export const dashboardDestinations = [
  {
    title: "Invites",
    href: "/creator/invites",
    description: "Review briefs, compare payouts, and prioritize high-fit collaborations.",
  },
  {
    title: "Campaigns",
    href: "/creator/campaigns",
    description: "Track deliverables, approvals, and the current stage of every live campaign.",
  },
  {
    title: "Profile",
    href: "/creator/profile",
    description: "Manage your public creator presence, audience proof, and media kit details.",
  },
  {
    title: "Portfolio",
    href: "/creator/portfolio",
    description: "Showcase your strongest content, testimonials, and collaboration outcomes.",
  },
  {
    title: "Earnings",
    href: "/creator/earnings",
    description: "Monitor payouts, monthly cash flow, and what is still pending.",
  },
  {
    title: "Messages",
    href: "/creator/messages",
    description: "Stay close to brands with a single inbox for timelines, approvals, and feedback.",
  },
];
