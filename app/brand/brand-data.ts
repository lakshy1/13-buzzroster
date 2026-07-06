import type { MetricCard } from "../dashboard/dashboard-data";

export type BrandSidebarItem = {
  label: string;
  href: string;
  icon: "dashboard" | "campaigns" | "discover" | "creators" | "invites" | "messages" | "analytics" | "billing" | "settings";
};

export const brandSidebarItems: BrandSidebarItem[] = [
  { label: "Dashboard", href: "/brand/dashboard", icon: "dashboard" },
  { label: "Campaigns", href: "/brand/campaigns", icon: "campaigns" },
  { label: "Discover Creators", href: "/brand/discover-creators", icon: "discover" },
  { label: "Creator Profiles", href: "/brand/creators/creator-lakshya", icon: "creators" },
  { label: "Invites", href: "/brand/invites", icon: "invites" },
  { label: "Messages", href: "/brand/messages", icon: "messages" },
  { label: "Analytics", href: "/brand/analytics", icon: "analytics" },
  { label: "Billing", href: "/brand/billing", icon: "billing" },
  { label: "Settings", href: "/brand/settings", icon: "settings" },
];

export const brandMetrics: MetricCard[] = [
  { label: "Active campaigns", value: "6", note: "2 launch this week", tone: "violet", icon: "briefcase" as const },
  { label: "Invites sent", value: "42", note: "8 pending replies", tone: "orange", icon: "mail" as const },
  { label: "Accepted creators", value: "14", note: "Across 6 campaigns", tone: "green", icon: "spark" as const },
  { label: "Campaign spend", value: "INR 4.8L", note: "Current month total", tone: "blue", icon: "wallet" as const },
];

export const brandCampaigns = [
  { title: "Summer Glow Launch", objective: "Product launch", budget: "INR 1.2L", invited: "18 creators", accepted: "6 accepted", status: "Active" },
  { title: "Barrier Repair Series", objective: "Brand awareness", budget: "INR 95K", invited: "12 creators", accepted: "4 accepted", status: "Draft" },
  { title: "Monsoon Skincare Picks", objective: "Sales lift", budget: "INR 1.6L", invited: "22 creators", accepted: "7 accepted", status: "Active" },
];

export const discoverCreators = [
  { name: "Lakshya Sharma", niche: "Beauty / Skincare", followers: "573K", engagement: "5.4%", location: "Delhi", accent: "#7a51f4" },
  { name: "Aarav Jain", niche: "Tech / Lifestyle", followers: "312K", engagement: "4.8%", location: "Bangalore", accent: "#4d7cff" },
  { name: "Sana Qureshi", niche: "Fashion / Beauty", followers: "811K", engagement: "6.1%", location: "Mumbai", accent: "#ef7f58" },
];
