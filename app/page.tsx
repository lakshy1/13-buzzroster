"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import heroSection from "../assets/Images/Hero-Section-1.png";
import ctaImage from "../assets/Images/CTA-Image.png";
import faqImage from "../assets/Images/FAQ.png";

const navItems = [
  { label: "About us", href: "#about-us" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Resources", href: "#resources" },
  { label: "Tools", href: "#tools", chevron: true },
];

const toolsMenuItems = [
  { label: "Creator Worth Calculator", href: "/tools/creator-worth-calculator" },
  { label: "Creator Workspace", href: "#features" },
  { label: "Campaign Tracking", href: "#pricing" },
  { label: "Support & Resources", href: "#resources" },
];

const trustedBrands = [
  { name: "Kanthast", icon: "kanthast" },
  { name: "Soul Pharma", icon: "soulpharma" },
  { name: "Aconic Technologies", icon: "aconic" },
  { name: "Cloud Duty", icon: "cloudduty" },
  { name: "Learning Tree", icon: "learningtree" },
];

const repeatedTrustedBrands = [...trustedBrands, ...trustedBrands];

const howItWorksSteps = [
  {
    number: "1",
    title: "Create your profile",
    description: "Add your socials, niche, portfolio and rates.",
    color: "#7360ff",
    icon: "profile",
  },
  {
    number: "2",
    title: "Receive brand invites",
    description: "Get invited to campaigns that match your style.",
    color: "#ea6c98",
    icon: "bell",
  },
  {
    number: "3",
    title: "Accept what fits you",
    description: "Review briefs and accept the best opportunities.",
    color: "#f08c5a",
    icon: "check",
  },
  {
    number: "4",
    title: "Create & submit",
    description: "Submit your content and keep brands in the loop.",
    color: "#f2b13d",
    icon: "document",
  },
  {
    number: "5",
    title: "Get reviewed",
    description: "Receive feedback and submit revisions if needed.",
    color: "#58c26b",
    icon: "message",
  },
  {
    number: "6",
    title: "Get approved",
    description: "Content approved? You’re good to go!",
    color: "#5d7cf2",
    icon: "gear",
  },
  {
    number: "7",
    title: "Pay paid & grow",
    description: "Track earnings and build long-term collabs.",
    color: "#7358f5",
    icon: "dollar",
  },
];

const brandWorksSteps = [
  {
    number: "1",
    title: "Discover creators",
    description: "Browse profiles that match your niche, audience and budget.",
    color: "#7360ff",
    icon: "profile",
  },
  {
    number: "2",
    title: "Send invites",
    description: "Reach out with clear briefs and timelines in one place.",
    color: "#ea6c98",
    icon: "bell",
  },
  {
    number: "3",
    title: "Review submissions",
    description: "Check content drafts, leave feedback and keep approvals moving.",
    color: "#f08c5a",
    icon: "check",
  },
  {
    number: "4",
    title: "Manage deliverables",
    description: "Track files, deadlines and campaign assets without the chaos.",
    color: "#f2b13d",
    icon: "document",
  },
  {
    number: "5",
    title: "Collaborate live",
    description: "Keep communication organized with brand-to-creator updates.",
    color: "#58c26b",
    icon: "message",
  },
  {
    number: "6",
    title: "Approve faster",
    description: "Finalize content, request changes and clear approvals quickly.",
    color: "#5d7cf2",
    icon: "gear",
  },
  {
    number: "7",
    title: "Scale campaigns",
    description: "Measure results and grow repeat collaborations with ease.",
    color: "#7358f5",
    icon: "dollar",
  },
];

const testimonials = [
  {
    name: "Ananya S.",
    handle: "@ananyacreates",
    role: "Creator",
    accent: "#6957f2",
    background: "rgba(239, 232, 255, 0.88)",
    text: "BuzzRoster changed the way I manage brand deals. Everything is organized, professional and easy to track.",
  },
  {
    name: "Rohit Mehta",
    handle: "Marketing Manager",
    role: "Brand",
    accent: "#ef7f58",
    background: "rgba(252, 244, 233, 0.9)",
    text: "Finding the right creators used to take hours. Now we discover, invite and track everything in one place.",
  },
  {
    name: "Priya Kapoor",
    handle: "Campaign Lead",
    role: "Agency",
    accent: "#68bf71",
    background: "rgba(242, 251, 243, 0.9)",
    text: "Our campaigns run smoother than ever. BuzzRoster helps us manage creators, deadlines and deliverables effortlessly.",
  },
  {
    name: "Maya Reed",
    handle: "@mayareels",
    role: "Creator",
    accent: "#6d63f2",
    background: "rgba(239, 232, 255, 0.88)",
    text: "I finally have one place for invites, approvals, revisions and payments. It makes me feel far more professional with brands.",
  },
  {
    name: "Aarav Jain",
    handle: "@frameswithaarav",
    role: "Creator",
    accent: "#6d63f2",
    background: "rgba(239, 232, 255, 0.88)",
    text: "The workflow is simple, clean and fast. I spend less time chasing updates and more time actually creating content.",
  },
  {
    name: "Sana Qureshi",
    handle: "@sanaedits",
    role: "Creator",
    accent: "#6d63f2",
    background: "rgba(239, 232, 255, 0.88)",
    text: "BuzzRoster gives me clarity on deadlines, deliverables and payouts. It turns collabs into a proper business system.",
  },
];

const brandTestimonials = [
  {
    name: "Kanthast",
    handle: "Operations Team",
    role: "Brand",
    accent: "#6957f2",
    background: "rgba(239, 232, 255, 0.88)",
    text: "We can discover creators, send briefs and track approvals in one clean flow. It keeps our campaigns moving.",
  },
  {
    name: "Soul Pharma",
    handle: "Growth Manager",
    role: "Brand",
    accent: "#ef7f58",
    background: "rgba(252, 244, 233, 0.9)",
    text: "The workflow makes it easy to manage submissions, revisions and deadlines without endless back-and-forth.",
  },
  {
    name: "Cloud Duty",
    handle: "Campaign Lead",
    role: "Brand",
    accent: "#68bf71",
    background: "rgba(242, 251, 243, 0.9)",
    text: "Our team gets more done because everything from invites to approvals stays visible and organized.",
  },
  {
    name: "Aconic Technologies",
    handle: "Partnership Team",
    role: "Brand",
    accent: "#ef7f58",
    background: "rgba(252, 244, 233, 0.9)",
    text: "The creator matching and review flow save us hours every week. The platform feels built for modern campaign operations.",
  },
  {
    name: "Learning Tree",
    handle: "Marketing Team",
    role: "Brand",
    accent: "#68bf71",
    background: "rgba(242, 251, 243, 0.9)",
    text: "We can see progress clearly across invites, content and approvals. It makes creator collaboration feel reliable and scalable.",
  },
  {
    name: "FitFuel",
    handle: "Campaign Ops",
    role: "Brand",
    accent: "#ef7f58",
    background: "rgba(252, 244, 233, 0.9)",
    text: "BuzzRoster helps us move faster without losing control. Communication, deliverables and approvals all stay in sync.",
  },
];

const pricingPlans = [
  {
    name: "Creator",
    price: "Free",
    accent: "#8d79f6",
    border: "rgba(143, 121, 246, 0.28)",
    badge: null,
    features: [
      "Create profile",
      "Receive unlimited invites",
      "Manage campaigns",
      "Track earnings",
      "Community access",
    ],
    cta: "Join as Creator",
  },
  {
    name: "Brand Starter",
    price: "$29",
    period: "/ month",
    accent: "#7a61ef",
    border: "rgba(122, 97, 239, 0.38)",
    badge: "Recommended",
    features: [
      "Discover & filter creators",
      "Send up to 50 invites / month",
      "1 active campaign at a time",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start 7-day free trial",
  },
  {
    name: "Agency",
    price: "$99",
    period: "/ month",
    accent: "#cfe7c8",
    border: "rgba(191, 221, 184, 0.82)",
    badge: null,
    features: [
      "Advanced creator discovery",
      "Unlimited invites",
      "Unlimited active campaigns",
      "Advanced analytics",
      "Priority support",
      "Team members",
    ],
    cta: "Start 7-day free trial",
  },
];

type FaqItem = {
  question: string;
  answer: string;
};

const faqItems: FaqItem[] = [
  {
    question: "What is BuzzRoster?",
    answer:
      "BuzzRoster is a creator-brand collaboration workspace that helps creators manage invites, campaigns, content reviews, and payments in one place.",
  },
  {
    question: "Is BuzzRoster free for creators?",
    answer:
      "Yes. Creators can use BuzzRoster to build a profile, receive invites, and manage collaborations without paying to get started.",
  },
  {
    question: "Can brands search and filter creators?",
    answer:
      "Yes. Brands can discover creators, filter by fit, and send invites that match the campaign brief, audience, and budget.",
  },
  {
    question: "How do campaign invites work?",
    answer:
      "Brands send collaboration invitations, creators review the brief, and both sides can track the approval and delivery flow inside BuzzRoster.",
  },
  {
    question: "Can agencies use BuzzRoster?",
    answer:
      "Absolutely. Agencies can manage multiple creators, coordinate submissions, and keep campaigns organized across teams.",
  },
];

function BrandIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "kanthast":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-black"
        >
          <path
            d="M5 19V5M5 12L15 5M5 12L16 19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "soulpharma":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-black"
        >
          <path
            d="M12 20.2c-4.7-2.8-7.5-6-7.5-9.3A4.2 4.2 0 0 1 12 7.9a4.2 4.2 0 0 1 7.5 3c0 3.3-2.8 6.5-7.5 9.3Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 7v10M7 12h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "aconic":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-black"
        >
          <path
            d="M12 4 20 12l-8 8-8-8 8-8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 8.2 15.8 12 12 15.8 8.2 12 12 8.2Z"
            fill="currentColor"
            opacity="0.18"
          />
        </svg>
      );
    case "cloudduty":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-black"
        >
          <path
            d="M7.5 17.5h8.2a3.3 3.3 0 0 0 .3-6.58 4.6 4.6 0 0 0-8.9 1.23A2.9 2.9 0 0 0 7.5 17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.2 17.5v-2.2m2.8 2.2v-3.6m2.8 3.6v-1.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "learningtree":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-black"
        >
          <path
            d="M12 4v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 7c-2.2 0-3.8-1.2-5-3 2.7.2 4.4 1.1 5 3Zm0 0c2.2 0 3.8-1.2 5-3-2.7.2-4.4 1.1-5 3Zm0 4c-2.6 0-4.4-1.3-5.8-3.3C9.4 8 11.2 9 12 11Zm0 0c2.6 0 4.4-1.3 5.8-3.3C14.6 8 12.8 9 12 11Zm0 0v9"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2.5L13.76 8.24L19.5 10L13.76 11.76L12 17.5L10.24 11.76L4.5 10L10.24 8.24L12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
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

function ToolsDropdown() {
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
        className="flex items-center gap-1 transition-colors hover:text-[#5c36d6]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>Tools</span>
        <ChevronIcon
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-full h-3"
      />

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
          <span className="h-px flex-1 bg-[#e8e1f8] ml-3" />
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

function StepIcon({ kind, color }: { kind: string; color: string }) {
  const common = "h-12 w-12";

  switch (kind) {
    case "profile":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M24 24.5a6.2 6.2 0 1 0 0-12.4 6.2 6.2 0 0 0 0 12.4Zm-9 12.5c.8-4.9 4.9-8.5 9-8.5s8.2 3.6 9 8.5"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bell":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M20 31h8c-.7-1.2-1-2.5-1-4v-4.4a5 5 0 1 0-10 0V27c0 1.5-.3 2.8-1 4h4Z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M28.5 17.5 30 16m-12 1.5L16.5 16"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <rect x="14" y="13" width="20" height="22" rx="2.8" stroke={color} strokeWidth="2.2" />
          <path d="M18 24.5 22 28l8-8" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "document":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M18 13.5h9.5L30 16v18.5a1.5 1.5 0 0 1-1.5 1.5H18a1.5 1.5 0 0 1-1.5-1.5v-20a1.5 1.5 0 0 1 1.5-1.5Z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M27.5 13.5V16H30" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M20 23h8M20 28h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "message":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M16 17.5h16a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5H23l-5 4v-4h-2a2.5 2.5 0 0 1-2.5-2.5V20a2.5 2.5 0 0 1 2.5-2.5Z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M19 24h10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "gear":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M24 16.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0-4.5 2.2 2.7a10.7 10.7 0 0 1 2.1.9l3.5-.7 2 3.5-2.3 2.6c.1.7.1 1.4 0 2.1l2.3 2.6-2 3.5-3.5-.7a10.7 10.7 0 0 1-2.1.9L24 36.5l-2.2-2.7a10.7 10.7 0 0 1-2.1-.9l-3.5.7-2-3.5 2.3-2.6c-.1-.7-.1-1.4 0-2.1L14.2 23l2-3.5 3.5.7a10.7 10.7 0 0 1 2.1-.9L24 12Z"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "dollar":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <circle cx="24" cy="24" r="9" stroke={color} strokeWidth="2.2" />
          <path d="M24 18v12m3-9.2c0-1.4-1.4-2.3-3-2.3s-3 .9-3 2.3c0 1.5 1.7 2 3 2.3 1.3.3 3 .8 3 2.3 0 1.4-1.4 2.3-3 2.3s-3-.9-3-2.3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function Avatar({ initials, tint }: { initials: string; tint: string }) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/80 text-[0.95rem] font-semibold text-white shadow-sm"
      style={{ background: tint }}
    >
      {initials}
    </div>
  );
}

function StarRow({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-5 w-5"
          style={{ color }}
        >
          <path d="M10 2.5 12.4 7l5 .8-3.6 3.5.8 5L10 14l-4.6 2.3.8-5L2.6 7.8l5-.8L10 2.5Z" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  const [audience, setAudience] = useState<"creators" | "brands">("creators");
  const [visibleTestimonialCards, setVisibleTestimonialCards] = useState(1);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const [mobileStepsPage, setMobileStepsPage] = useState(0);
  const [mobilePricingPage, setMobilePricingPage] = useState(0);
  const testimonialViewportRef = useRef<HTMLDivElement | null>(null);
  const mobileStepsViewportRef = useRef<HTMLDivElement | null>(null);
  const mobilePricingViewportRef = useRef<HTMLDivElement | null>(null);
  const activeSteps = audience === "creators" ? howItWorksSteps : brandWorksSteps;
  const activeTestimonials = audience === "creators" ? testimonials : brandTestimonials;
  const testimonialPageCount = Math.ceil(
    activeTestimonials.length / visibleTestimonialCards,
  );
  const mobileStepsLastIndex = Math.max(0, activeSteps.length - 1);
  const mobilePricingLastIndex = Math.max(0, pricingPlans.length - 1);
  const mobileTestimonialLastIndex = Math.max(0, activeTestimonials.length - 1);
  const testimonialLastPageIndex = Math.max(0, testimonialPageCount - 1);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleTestimonialCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleTestimonialCards(2);
      } else {
        setVisibleTestimonialCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    const closeOnScroll = () => {
      if (mobileNavOpen) {
        setMobileToolsOpen(false);
        setMobileNavOpen(false);
      }
    };

    window.addEventListener("scroll", closeOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeOnScroll);
  }, [mobileNavOpen]);

  const setActiveAudience = (nextAudience: "creators" | "brands") => {
    setAudience(nextAudience);
    setTestimonialPage(0);
    setMobileStepsPage(0);
    setMobilePricingPage(0);

    if (testimonialViewportRef.current) {
      testimonialViewportRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    if (mobileStepsViewportRef.current) {
      mobileStepsViewportRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
    if (mobilePricingViewportRef.current) {
      mobilePricingViewportRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollTestimonials = (direction: "prev" | "next") => {
    const viewport = testimonialViewportRef.current;
    if (!viewport) {
      return;
    }

    const nextLeft =
      direction === "next"
        ? viewport.scrollLeft + viewport.clientWidth
        : viewport.scrollLeft - viewport.clientWidth;

    viewport.scrollTo({
      left: nextLeft,
      behavior: "smooth",
    });
  };

  const handleTestimonialsScroll = () => {
    const viewport = testimonialViewportRef.current;
    if (!viewport) {
      return;
    }

    const nextPage = Math.round(viewport.scrollLeft / viewport.clientWidth);
    setTestimonialPage(nextPage);
  };

  const scrollMobileSteps = (direction: "prev" | "next") => {
    const viewport = mobileStepsViewportRef.current;
    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      left:
        direction === "next"
          ? viewport.scrollLeft + viewport.clientWidth
          : viewport.scrollLeft - viewport.clientWidth,
      behavior: "smooth",
    });
  };

  const handleMobileStepsScroll = () => {
    const viewport = mobileStepsViewportRef.current;
    if (!viewport) {
      return;
    }

    setMobileStepsPage(Math.round(viewport.scrollLeft / viewport.clientWidth));
  };

  const scrollMobilePricing = (direction: "prev" | "next") => {
    const viewport = mobilePricingViewportRef.current;
    if (!viewport) {
      return;
    }

    viewport.scrollTo({
      left:
        direction === "next"
          ? viewport.scrollLeft + viewport.clientWidth
          : viewport.scrollLeft - viewport.clientWidth,
      behavior: "smooth",
    });
  };

  const handleMobilePricingScroll = () => {
    const viewport = mobilePricingViewportRef.current;
    if (!viewport) {
      return;
    }

    setMobilePricingPage(Math.round(viewport.scrollLeft / viewport.clientWidth));
  };

  const toggleFaq = (question: string) => {
    setOpenFaq((current) => (current === question ? null : question));
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fcf7f0_0%,#faf3eb_24%,#f8f0fa_58%,#f7efe8_100%)] text-[#17162b]">
      <div className="absolute inset-0 opacity-90 [background:radial-gradient(circle_at_14%_18%,rgba(180,154,255,0.42),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(245,219,187,0.75),transparent_20%),radial-gradient(circle_at_52%_56%,rgba(209,191,255,0.38),transparent_26%),radial-gradient(circle_at_18%_82%,rgba(255,220,170,0.45),transparent_22%),radial-gradient(circle_at_84%_82%,rgba(193,171,255,0.3),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(255,255,255,0.22)_100%)]" />

      <div className="relative mx-auto flex min-h-screen w-full flex-col px-4 pb-0 pt-5 sm:px-6 md:px-8">
        <header className="fixed left-1/2 top-4 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 rounded-[1.75rem] border border-white/55 bg-[rgba(255,255,255,0.58)] px-4 py-3 shadow-[0_14px_40px_rgba(125,96,207,0.08)] backdrop-blur-xl sm:w-[calc(100vw-3rem)] sm:px-6 md:w-[calc(100vw-4rem)] md:px-8">
          <div className="flex items-center justify-between gap-3">
            <a
              href="#"
              className="group flex items-start gap-1 text-[2.4rem] leading-none text-[#5c36d6] transition-transform duration-200 hover:scale-[1.01] sm:text-[2.6rem] md:text-[3.1rem]"
              aria-label="Buzzroster home"
            >
              <span className="font-[family-name:var(--font-pacifico)] tracking-tight">
                Buzzroster
              </span>
              <SparkIcon className="mt-1 h-4 w-4 text-[#5c36d6] transition-transform duration-200 group-hover:rotate-12 md:h-5 md:w-5" />
            </a>

            <nav className="hidden items-center gap-6 text-[0.98rem] font-medium text-[#1a1731] lg:flex xl:gap-10">
              {navItems.map((item) => (
                item.label === "Tools" ? (
                  <ToolsDropdown key={item.label} />
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-1 transition-colors hover:text-[#5c36d6]"
                  >
                    <span>{item.label}</span>
                  </a>
                )
              ))}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <Link
                href="/#resources"
                className="rounded-2xl border border-[#cdbcf8] bg-white/55 px-5 py-3 text-[1rem] font-medium text-[#1a1731] shadow-[0_10px_30px_rgba(111,76,203,0.08)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/75"
              >
                Contact sales
              </Link>
              <Link
                href="/auth"
                className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-6 py-3 text-[1rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.38)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                Log in
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileNavOpen((current) => {
                  const next = !current;
                  if (!next) {
                    setMobileToolsOpen(false);
                  }
                  return next;
                });
              }}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8cfff] bg-white/70 text-[#5c36d6] shadow-[0_10px_24px_rgba(125,96,207,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/90 lg:hidden"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
            >
              <span className="sr-only">{mobileNavOpen ? "Close menu" : "Open menu"}</span>
              <span className="relative flex h-4 w-4 flex-col justify-center">
                <span
                  className={`block h-0.5 rounded-full bg-current transition-all duration-200 ${
                    mobileNavOpen ? "translate-y-1 rotate-45" : "-translate-y-1"
                  }`}
                />
                <span
                  className={`block h-0.5 rounded-full bg-current transition-all duration-200 ${
                    mobileNavOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`block h-0.5 rounded-full bg-current transition-all duration-200 ${
                    mobileNavOpen ? "-translate-y-1 -rotate-45" : "translate-y-1"
                  }`}
                />
              </span>
            </button>
          </div>

          <div
            className={`mt-3 overflow-hidden rounded-[1.5rem] border border-[#e1d7fb] bg-[rgba(255,255,255,0.94)] shadow-[0_20px_50px_rgba(125,96,207,0.12)] transition-all duration-300 lg:hidden ${
              mobileNavOpen ? "max-h-[78vh] opacity-100" : "max-h-0 border-transparent opacity-0"
            }`}
          >
            <div className="flex max-h-[78vh] flex-col gap-4 overflow-y-auto p-4 pb-6 overscroll-contain">
              <nav className="grid gap-2 text-[1rem] font-medium text-[#1a1731]">
                {navItems.map((item) =>
                  item.label === "Tools" ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setMobileToolsOpen((current) => !current)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors hover:bg-[#f2ebff] hover:text-[#5c36d6]"
                      aria-expanded={mobileToolsOpen}
                      aria-controls="mobile-tools-menu"
                    >
                      <span>Tools</span>
                      <ChevronIcon
                        className={`h-4 w-4 transition-transform duration-300 ease-out ${
                          mobileToolsOpen ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </button>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => {
                        setMobileToolsOpen(false);
                        setMobileNavOpen(false);
                      }}
                      className="rounded-2xl px-4 py-3 transition-colors hover:bg-[#f2ebff] hover:text-[#5c36d6]"
                    >
                      {item.label}
                    </a>
                  ),
                )}
              </nav>

              <div
                id="mobile-tools-menu"
                className={`overflow-hidden rounded-[1.4rem] border border-[#efe7ff] bg-[#faf7ff] transition-all duration-300 ease-out ${
                  mobileToolsOpen
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
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setMobileToolsOpen(false);
                          setMobileNavOpen(false);
                        }}
                        className="rounded-2xl bg-white px-4 py-3 text-[0.98rem] text-[#302d47] shadow-[0_8px_20px_rgba(125,96,207,0.06)] transition-colors hover:bg-[#f4edff] hover:text-[#5c36d6]"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-3 pt-2 pb-2">
                <Link
                  href="/#resources"
                  onClick={() => {
                    setMobileToolsOpen(false);
                    setMobileNavOpen(false);
                  }}
                  className="rounded-2xl border border-[#cdbcf8] bg-white/70 px-4 py-3 text-center text-[1rem] font-medium text-[#1a1731] shadow-[0_10px_24px_rgba(111,76,203,0.08)] transition-colors hover:bg-white"
                >
                  Contact sales
                </Link>
                <Link
                  href="/auth"
                  onClick={() => {
                    setMobileToolsOpen(false);
                    setMobileNavOpen(false);
                  }}
                  className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-center text-[1rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.32)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section
          id="about-us"
          className="mx-auto flex w-[85vw] max-w-none scroll-mt-36 flex-1 flex-col items-center pt-20 text-center sm:pt-24"
        >
          <h1 className="mt-4 max-w-[1120px] font-[family-name:var(--font-serif)] text-[clamp(2.85rem,5.9vw,6rem)] font-medium leading-[0.92] tracking-[-0.05em] text-[#17162b] md:mt-6 xl:text-[clamp(2.35rem,4vw,4.1rem)] 2xl:text-[clamp(2.15rem,3.4vw,3.8rem)]">
            <span className="block">A visual collaboration workspace</span>
            <span className="block">built for modern creators.</span>
          </h1>

          <p className="mt-4 max-w-[930px] text-[clamp(1.05rem,1.8vw,1.45rem)] leading-[1.32] text-[#5d5a6f] md:mt-5">
            <span className="block">
              Organize invites, campaigns, reviews, payments, and deliverables
            </span>
            <span className="block">
              across mobile - without the chaos of DMs and spreadsheets.
            </span>
          </p>

          <div className="relative mt-5 w-full flex-1 pb-2 md:mt-7">
            <div className="absolute left-1/2 top-0 h-28 w-[76%] -translate-x-1/2 rounded-full bg-white/35 blur-3xl" />
            <div className="relative mx-auto flex w-full items-end justify-center">
              <Image
                src={heroSection as StaticImageData}
                alt="Buzzroster product hero showing the mobile app interface"
                priority
                className="h-auto w-[min(100%,1540px)] select-none object-contain drop-shadow-[0_35px_70px_rgba(93,61,179,0.1)]"
                sizes="(max-width: 768px) 100vw, 1540px"
              />
            </div>
          </div>
        </section>

        <section
          id="tools"
          className="relative left-1/2 w-screen -translate-x-1/2 scroll-mt-36 pb-6 pt-2 sm:pb-8"
        >
          <div className="bg-transparent">
            <p className="px-5 pt-5 text-center text-[0.98rem] font-semibold tracking-[-0.01em] text-black/90 sm:text-[1.05rem]">
              Trusted by creators, brands & agencies worldwide
            </p>
            <div className="overflow-hidden px-5 py-5 sm:px-8">
              <div className="brand-marquee flex w-max items-center gap-12 text-black sm:gap-14">
                {repeatedTrustedBrands.map((brand, index) => (
                  <div
                    key={`${brand}-${index}`}
                    className="flex shrink-0 items-center gap-2.5 px-1 py-1"
                  >
                    <BrandIcon kind={brand.icon} />
                    <span className="font-[family-name:var(--font-serif)] text-[1.02rem] font-semibold not-italic tracking-[-0.02em] text-black opacity-100 sm:text-[1.1rem]">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="mx-auto w-[85vw] max-w-none scroll-mt-36 pb-14 pt-12 sm:pb-20 sm:pt-16"
        >
          <div className="mx-auto max-w-[780px] text-center">
            <h2 className="text-[clamp(2rem,2.4vw,3rem)] font-semibold tracking-[-0.04em] text-[#17162b]">
              How <span className="text-[#6d44ec]">BuzzRoster</span> works
            </h2>
          <div className="mx-auto mt-5 flex w-full max-w-[360px] items-center justify-between border-b border-[#e9e4f3] text-[1rem] font-semibold text-[#4f4d66]">
              <button
                type="button"
                onClick={() => setActiveAudience("creators")}
                className={`relative flex-1 pb-4 transition-colors ${
                  audience === "creators" ? "text-[#403c68]" : "text-[#66637d]"
                }`}
              >
                For Creators
                {audience === "creators" ? (
                  <span className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-[#6d44ec]" />
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => setActiveAudience("brands")}
                className={`relative flex-1 pb-4 transition-colors ${
                  audience === "brands" ? "text-[#403c68]" : "text-[#66637d]"
                }`}
              >
                For Brands
                {audience === "brands" ? (
                  <span className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-[#6d44ec]" />
                ) : null}
              </button>
            </div>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-[5%] right-[5%] top-[58px] hidden h-px bg-[#eef0f5] lg:block" />

            <div className="relative lg:hidden">
              <div
                key={`${audience}-mobile-steps`}
                ref={mobileStepsViewportRef}
                onScroll={handleMobileStepsScroll}
                className="no-scrollbar toggle-panel -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3"
              >
                {activeSteps.map((step) => (
                  <div
                    key={step.number}
                    className="relative min-w-[calc(100vw-2rem)] snap-center rounded-[1.5rem] border border-white/80 bg-white/70 px-6 py-8 text-center shadow-[0_16px_45px_rgba(125,96,207,0.08)] sm:min-w-[calc(100vw-3rem)]"
                  >
                    <div className="mx-auto flex h-[112px] w-[112px] items-center justify-center rounded-full" style={{ background: `${step.color}1f` }}>
                      <StepIcon kind={step.icon} color={step.color} />
                    </div>
                    <div className="mx-auto mt-7 flex h-7 w-7 items-center justify-center rounded-full bg-[#6d44ec] text-[0.82rem] font-semibold text-white shadow-[0_8px_18px_rgba(109,68,236,0.25)]">
                      {step.number}
                    </div>
                    <h3 className="mt-5 text-[1.08rem] font-semibold leading-[1.28] tracking-[-0.02em] text-[#19182e]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[0.98rem] leading-[1.55] text-[#656278]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollMobileSteps("prev")}
                  disabled={mobileStepsPage <= 0}
                  className="text-[1.45rem] leading-none text-[#6d44ec] transition-opacity disabled:cursor-not-allowed disabled:text-[#6d44ec]/20"
                  aria-label="Previous steps"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollMobileSteps("next")}
                  disabled={mobileStepsPage >= mobileStepsLastIndex}
                  className="text-[1.45rem] leading-none text-[#6d44ec] transition-opacity disabled:cursor-not-allowed disabled:text-[#6d44ec]/20"
                  aria-label="Next steps"
                >
                  →
                </button>
              </div>
            </div>

            <div key={audience} className="toggle-panel hidden grid-cols-1 gap-10 md:grid md:grid-cols-2 lg:grid lg:grid-cols-7 lg:gap-6">
              {activeSteps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  <div className="flex h-[112px] w-[112px] items-center justify-center rounded-full" style={{ background: `${step.color}1f` }}>
                    <StepIcon kind={step.icon} color={step.color} />
                  </div>
                  <div className="mt-7 flex h-7 w-7 items-center justify-center rounded-full bg-[#6d44ec] text-[0.82rem] font-semibold text-white shadow-[0_8px_18px_rgba(109,68,236,0.25)]">
                    {step.number}
                  </div>
                  <h3 className="mt-5 max-w-[160px] text-[1.08rem] font-semibold leading-[1.28] tracking-[-0.02em] text-[#19182e]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[170px] text-[0.98rem] leading-[1.55] text-[#656278]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-3 md:flex-row md:gap-5">
            <div className="hidden h-px flex-1 bg-[#eceaf3] md:block" />
            <h3 className="whitespace-nowrap text-center text-[clamp(1.8rem,2.2vw,2.7rem)] font-semibold tracking-[-0.04em] text-[#17162b]">
              Loved by creators & brands
            </h3>
            <div className="hidden h-px flex-1 bg-[#eceaf3] md:block" />
          </div>

          <div
            key={`${audience}-testimonials`}
            className="toggle-panel mt-8 grid grid-cols-[minmax(0,1fr)] items-center gap-4 lg:grid-cols-[40px_minmax(0,1fr)_40px] lg:gap-6"
          >
            <button
              type="button"
              onClick={() => scrollTestimonials("prev")}
              disabled={testimonialPage <= 0}
              className="hidden text-[2.8rem] leading-none text-[#19182e] transition-opacity hover:text-[#6d44ec] disabled:cursor-not-allowed disabled:text-[#19182e]/20 lg:flex"
              aria-label="Previous testimonials"
            >
              ‹
            </button>

            <div
              ref={testimonialViewportRef}
              onScroll={handleTestimonialsScroll}
              className="overflow-x-auto scroll-smooth no-scrollbar"
            >
              <div className="flex snap-x snap-mandatory gap-6">
                {activeTestimonials.map((testimonial) => (
                  <article
                    key={testimonial.name}
                    className="min-w-[calc(100vw-2rem)] snap-start rounded-[1.5rem] border border-white/80 p-7 shadow-[0_16px_45px_rgba(125,96,207,0.08)] sm:min-w-[calc(100vw-3rem)] md:min-w-[calc(50%-12px)] lg:min-w-[calc((100%-48px)/3)]"
                    style={{ background: testimonial.background }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar initials={testimonial.name.split(" ").map((part) => part[0]).join("").slice(0, 2)} tint={testimonial.accent} />
                        <div>
                          <div className="text-[1rem] font-semibold text-[#1c1b30]">{testimonial.name}</div>
                          <div className="text-[0.95rem] text-[#6c6780]">{testimonial.handle}</div>
                        </div>
                      </div>
                      <span
                        className="rounded-md px-3 py-1 text-[0.92rem] font-semibold text-white"
                        style={{ background: testimonial.accent }}
                      >
                        {testimonial.role}
                      </span>
                    </div>

                    <p className="mt-6 max-w-[520px] text-[1.25rem] leading-[1.55] tracking-[-0.02em] text-[#2b283b]">
                      {testimonial.text}
                    </p>

                    <div className="mt-7">
                      <StarRow color={testimonial.accent} />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollTestimonials("next")}
              disabled={testimonialPage >= testimonialLastPageIndex}
              className="hidden text-[2.8rem] leading-none text-[#19182e] transition-opacity hover:text-[#6d44ec] disabled:cursor-not-allowed disabled:text-[#19182e]/20 lg:flex"
              aria-label="Next testimonials"
            >
              ›
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
            <button
              type="button"
              onClick={() => scrollTestimonials("prev")}
              disabled={testimonialPage <= 0}
              className="text-[1.45rem] leading-none text-[#6d44ec] transition-opacity disabled:cursor-not-allowed disabled:text-[#6d44ec]/20"
              aria-label="Previous testimonials"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollTestimonials("next")}
              disabled={testimonialPage >= mobileTestimonialLastIndex}
              className="text-[1.45rem] leading-none text-[#6d44ec] transition-opacity disabled:cursor-not-allowed disabled:text-[#6d44ec]/20"
              aria-label="Next testimonials"
            >
              →
            </button>
          </div>

          <div className="mt-5 hidden justify-center gap-2 md:flex">
            {Array.from({ length: testimonialPageCount }).map((_, index) => (
              <span
                key={index}
                className={`h-3 w-3 rounded-full transition-colors ${
                  index === testimonialPage ? "bg-[#6d44ec]" : "bg-[#ded8ea]"
                }`}
              />
            ))}
          </div>
        </section>

        <section
          id="pricing"
          className="mx-auto w-[85vw] max-w-none scroll-mt-36 pb-20 pt-8 sm:pb-28 sm:pt-12"
        >
          <div>
            <h2 className="text-[clamp(2rem,2.6vw,3.25rem)] font-semibold tracking-[-0.05em] text-[#17162b]">
              Simple pricing for everyone
            </h2>
            <p className="mt-2 text-[1.15rem] text-[#66637d]">
              Choose a plan that fits your goals.
            </p>

            <div className="relative mt-10 lg:hidden">
              <div
                ref={mobilePricingViewportRef}
                onScroll={handleMobilePricingScroll}
                className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3"
              >
                {pricingPlans.map((plan) => (
                  <article
                    key={plan.name}
                    className={`relative min-w-[calc(100vw-2rem)] snap-center overflow-hidden rounded-[1.8rem] border p-8 shadow-[0_16px_45px_rgba(125,96,207,0.08)] backdrop-blur-sm sm:min-w-[calc(100vw-3rem)] ${
                      plan.badge ? "border-[#d9cffc]" : ""
                    }`}
                    style={{
                      borderColor: plan.badge ? "rgba(141, 121, 246, 0.28)" : plan.border,
                      background: plan.badge
                        ? "linear-gradient(180deg, rgba(141,121,246,0.10) 0%, rgba(255,255,255,0.95) 26%, rgba(111,195,161,0.05) 100%)"
                        : "rgba(255,255,255,0.70)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-[1.05rem] font-semibold text-[#27243f]">
                        {plan.name}
                      </div>
                      {plan.badge ? (
                        <div className="rounded-full border border-[#e5dcff] bg-[linear-gradient(135deg,rgba(141,121,246,0.14)_0%,rgba(255,255,255,0.72)_45%,rgba(111,195,161,0.06)_100%)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#6d44ec]/55 shadow-[0_8px_18px_rgba(109,68,236,0.08)]">
                          {plan.badge}
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-end gap-2">
                      <span className="text-[3.2rem] font-semibold tracking-[-0.06em] text-[#17162b]">
                        {plan.price}
                      </span>
                      {plan.period ? (
                        <span className="pb-2 text-[1.05rem] text-[#7b7890]">
                          {plan.period}
                        </span>
                      ) : null}
                    </div>
                    <p className="relative z-10 mt-4 text-[1.05rem] text-[#66637d]">
                      {plan.name === "Creator"
                        ? "Everything you need to grow"
                        : plan.name === "Brand Starter"
                          ? "Perfect for small brands"
                          : "For agencies & growing teams"}
                    </p>

                    <ul className="relative z-10 mt-8 space-y-4 text-[1rem] text-[#4a475c]">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="mt-0.5 h-5 w-5 shrink-0"
                            style={{ color: plan.accent }}
                          >
                            <path
                              d="M16.5 5.5 8.5 14 3.8 9.5"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="relative z-10 mt-auto pt-8">
                      <a
                        href="#"
                        className="flex w-full items-center justify-center rounded-2xl px-5 py-4 text-[1.05rem] font-semibold text-white shadow-[0_18px_35px_rgba(109,68,236,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
                        style={{
                          background:
                            plan.name === "Agency"
                              ? "linear-gradient(135deg, #7d68f4 0%, #5b3dd7 55%, #6fc3a1 100%)"
                              : `linear-gradient(135deg, ${plan.accent} 0%, #5b3dd7 100%)`,
                        }}
                      >
                        {plan.cta}
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => scrollMobilePricing("prev")}
                  disabled={mobilePricingPage <= 0}
                  className="text-[1.6rem] leading-none text-[#6d44ec] transition-opacity disabled:cursor-not-allowed disabled:text-[#6d44ec]/20"
                  aria-label="Previous pricing plan"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollMobilePricing("next")}
                  disabled={mobilePricingPage >= mobilePricingLastIndex}
                  className="text-[1.6rem] leading-none text-[#6d44ec] transition-opacity disabled:cursor-not-allowed disabled:text-[#6d44ec]/20"
                  aria-label="Next pricing plan"
                >
                  →
                </button>
              </div>
            </div>

            <div className="mt-10 hidden gap-6 xl:grid xl:grid-cols-3">
              {pricingPlans.map((plan) => (
                  <article
                    key={plan.name}
                    className="relative flex min-h-[470px] flex-col rounded-[1.8rem] border p-7 shadow-[0_16px_45px_rgba(125,96,207,0.08)] backdrop-blur-sm"
                    style={{
                      borderColor: plan.badge ? "rgba(141, 121, 246, 0.28)" : plan.border,
                      background: plan.badge
                        ? "linear-gradient(180deg, rgba(141,121,246,0.10) 0%, rgba(255,255,255,0.95) 26%, rgba(111,195,161,0.05) 100%)"
                        : "rgba(255,255,255,0.70)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-[1.05rem] font-semibold text-[#27243f]">
                        {plan.name}
                      </div>
                      {plan.badge ? (
                        <div className="rounded-full border border-[#e5dcff] bg-[linear-gradient(135deg,rgba(141,121,246,0.14)_0%,rgba(255,255,255,0.72)_45%,rgba(111,195,161,0.06)_100%)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#6d44ec]/55 shadow-[0_8px_18px_rgba(109,68,236,0.08)]">
                          {plan.badge}
                        </div>
                      ) : null}
                    </div>

                  <div className="mt-5 flex items-end gap-2">
                    <span className="text-[3.2rem] font-semibold tracking-[-0.06em] text-[#17162b]">
                      {plan.price}
                    </span>
                    {plan.period ? (
                      <span className="pb-2 text-[1.05rem] text-[#7b7890]">
                        {plan.period}
                      </span>
                    ) : null}
                  </div>
                  <p className="relative z-10 mt-4 text-[1.05rem] text-[#66637d]">
                    {plan.name === "Creator"
                      ? "Everything you need to grow"
                      : plan.name === "Brand Starter"
                        ? "Perfect for small brands"
                        : "For agencies & growing teams"}
                  </p>

                  <ul className="relative z-10 mt-8 space-y-4 text-[1rem] text-[#4a475c]">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                          fill="none"
                          className="mt-0.5 h-5 w-5 shrink-0"
                          style={{ color: plan.accent }}
                        >
                          <path
                            d="M16.5 5.5 8.5 14 3.8 9.5"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="relative z-10 mt-auto pt-8">
                    <a
                      href="#"
                      className="flex w-full items-center justify-center rounded-2xl px-5 py-4 text-[1.05rem] font-semibold text-white shadow-[0_18px_35px_rgba(109,68,236,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
                      style={{
                        background:
                          plan.name === "Agency"
                            ? "linear-gradient(135deg, #7d68f4 0%, #5b3dd7 55%, #6fc3a1 100%)"
                            : `linear-gradient(135deg, ${plan.accent} 0%, #5b3dd7 100%)`,
                      }}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div id="faq" className="mt-12 scroll-mt-36">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_minmax(0,1.1fr)] lg:items-start lg:gap-10">
              <div className="relative max-w-[28rem] lg:min-h-[24.75rem]">
                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-[#6d44ec]/65">
                  Help center
                </p>
                <h2 className="mt-3 text-[clamp(1.8rem,2.3vw,2.9rem)] font-semibold tracking-[-0.05em] text-[#17162b]">
                  Frequently asked questions
                </h2>

                <div className="pointer-events-none absolute left-0 top-[6.6rem] hidden w-[15.25rem] lg:block xl:top-[7rem] xl:w-[16.5rem]">
                  <Image
                    src={faqImage as StaticImageData}
                    alt="Decorative FAQ illustration"
                    sizes="(max-width: 1279px) 15.25rem, 16.5rem"
                    className="h-auto w-full object-contain"
                  />
                </div>

                <a
                  href="#"
                  className="hidden lg:absolute lg:bottom-[-0.35rem] lg:left-0 lg:inline-flex lg:items-center lg:gap-2 lg:text-[0.98rem] lg:font-semibold lg:text-[#6d44ec] xl:text-[1.05rem]"
                >
                  <span>View all FAQs</span>
                  <span className="text-[1.4rem] leading-none">&rarr;</span>
                </a>
              </div>

              <div className="space-y-2.5">
                {faqItems.map((item) => {
                  const open = openFaq === item.question;

                  return (
                    <div
                      key={item.question}
                      className={`overflow-hidden rounded-[1.35rem] border transition-all duration-300 ${
                        open
                          ? "border-[#d6cafb] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(248,243,255,0.98)_100%)] shadow-[0_18px_40px_rgba(125,96,207,0.1)]"
                          : "border-[#ece8f5] bg-white/72 shadow-[0_10px_24px_rgba(125,96,207,0.04)]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(item.question)}
                        aria-expanded={open}
                        className="flex w-full items-start justify-between gap-4 px-5 py-3 text-left transition-colors hover:bg-white/40 sm:px-6 sm:py-3.5"
                      >
                        <span className="max-w-[calc(100%-2.5rem)] text-[0.98rem] font-medium leading-[1.35] tracking-[-0.02em] text-[#2f2d45] sm:text-[1.04rem]">
                          {item.question}
                        </span>
                        <span
                          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#ddd4f8] text-[1rem] font-semibold leading-none text-[#6d44ec] transition-transform duration-300 ${
                            open ? "rotate-45 bg-[#f5f0ff]" : "bg-white"
                          }`}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden px-5 pb-4 pt-0 text-[0.94rem] leading-[1.68] text-[#5f5b72] sm:px-6 sm:pb-4">
                          <div className="h-px w-full bg-[linear-gradient(90deg,rgba(109,68,236,0.18),rgba(109,68,236,0.04),transparent)]" />
                          <p className="pt-3">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <a
              href="#"
              className="mt-6 inline-flex items-center gap-2 text-[0.98rem] font-semibold text-[#6d44ec] sm:text-[1.05rem] lg:hidden"
            >
              <span>View all FAQs</span>
              <span className="text-[1.4rem] leading-none">&rarr;</span>
            </a>
          </div>
        </section>

        <section className="mx-auto w-[85vw] max-w-none pb-12 sm:pb-18">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(90deg,rgba(240,233,255,0.92)_0%,rgba(247,243,255,0.84)_28%,rgba(255,250,240,0.74)_100%)] shadow-[0_18px_50px_rgba(125,96,207,0.08)]">
            <div className="lg:hidden">
              <div className="relative h-[220px] w-full overflow-hidden sm:h-[260px]">
                <Image
                  src={ctaImage as StaticImageData}
                  alt="Creators collaborating around a campaign board"
                  priority={false}
                  sizes="100vw"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,237,255,0.06)_0%,rgba(243,237,255,0.38)_48%,rgba(243,237,255,0.92)_100%)]" />
              </div>

              <div className="px-5 pb-6 pt-5 sm:px-7 sm:pb-7">
                <h2 className="max-w-[18ch] font-[family-name:var(--font-serif)] text-[clamp(1.95rem,8vw,3rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[#17162b]">
                  Ready to build your creator roster?
                </h2>
                <p className="mt-4 max-w-[34ch] text-[1rem] leading-[1.45] text-[#55526b] sm:text-[1.05rem]">
                  Join thousands of creators and brands building meaningful
                  partnerships that grow.
                </p>

                <div className="mt-6 grid gap-3">
                  <a
                    href="#"
                    className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-6 py-4 text-center text-[1.02rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.34)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Join as Creator
                  </a>
                  <a
                    href="#"
                    className="rounded-2xl border border-[#c9bef4] bg-white/65 px-6 py-4 text-center text-[1.02rem] font-semibold text-[#6d44ec] shadow-[0_10px_30px_rgba(111,76,203,0.08)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/80"
                  >
                    Join as Brand
                  </a>
                </div>
              </div>
            </div>

            <div className="relative hidden h-[240px] w-full sm:h-[295px] lg:block lg:h-[315px]">
              <Image
                src={ctaImage as StaticImageData}
                alt="Creators collaborating around a campaign board"
                priority={false}
                sizes="(max-width: 768px) 100vw, 85vw"
                className="h-full w-full object-cover object-right"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,237,255,0.97)_0%,rgba(243,237,255,0.93)_22%,rgba(243,237,255,0.74)_38%,rgba(255,250,240,0.28)_58%,rgba(255,250,240,0.08)_100%)]" />
              <div className="absolute left-8 top-1/2 z-10 w-[44%] max-w-[560px] -translate-y-1/2 sm:left-12 lg:left-16">
                <h2 className="max-w-[18ch] font-[family-name:var(--font-serif)] text-[clamp(1.95rem,2.65vw,3.6rem)] font-medium leading-[1.03] tracking-[-0.05em] text-[#17162b] xl:text-[clamp(2.05rem,2.9vw,3.8rem)]">
                  Ready to build your
                  <span className="block">creator roster?</span>
                </h2>
                <p className="mt-5 max-w-[440px] text-[clamp(0.98rem,1.18vw,1.12rem)] leading-[1.48] text-[#55526b]">
                  Join thousands of creators and brands building meaningful
                  partnerships that grow.
                </p>

                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="#"
                    className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-7 py-4 text-[1.02rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.34)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Join as Creator
                  </a>
                  <a
                    href="#"
                    className="rounded-2xl border border-[#c9bef4] bg-white/55 px-7 py-4 text-[1.02rem] font-semibold text-[#6d44ec] shadow-[0_10px_30px_rgba(111,76,203,0.08)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/75"
                  >
                    Join as Brand
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer
          id="resources"
          className="relative left-1/2 w-screen -translate-x-1/2 scroll-mt-64 pb-0"
        >
          <div className="relative w-full overflow-hidden rounded-none border-t border-[#e7e2f0] bg-[linear-gradient(180deg,rgba(252,247,240,0.96)_0%,rgba(250,243,235,0.96)_24%,rgba(248,240,250,0.96)_58%,rgba(247,239,232,0.96)_100%)] px-8 py-10 shadow-[0_-10px_40px_rgba(125,96,207,0.06)] backdrop-blur-sm sm:px-12 sm:py-12 lg:px-24 xl:px-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.55),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(193,171,255,0.18),transparent_20%),radial-gradient(circle_at_50%_100%,rgba(255,220,170,0.12),transparent_26%)]" />
            <div className="relative z-10 grid gap-10 text-left lg:grid-cols-[0.95fr_minmax(0,1.55fr)_0.75fr] lg:items-start lg:gap-8">
              <div className="flex flex-col items-start border-b border-[#ece7f4] pb-8 text-left lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
                <a
                  href="#"
                  className="inline-flex items-start gap-1 text-[2.9rem] leading-none text-[#11101f]"
                  aria-label="Buzzroster home"
                >
                  <span className="font-[family-name:var(--font-pacifico)] tracking-tight">
                    Buzzroster
                  </span>
                  <SparkIcon className="mt-1 h-4 w-4 text-[#f0b44b]" />
                </a>
                <p className="mt-5 max-w-[290px] text-[1rem] leading-[1.55] text-[#656278]">
                  The all-in-one platform for creator-brand collaborations.
                  Connect, collaborate and grow together.
                </p>

                <div className="mt-8 flex items-center justify-start gap-5 text-[#19182e]">
                  {[
                    "instagram",
                    "tiktok",
                    "youtube",
                    "linkedin",
                    "x",
                  ].map((item) => (
                    <a
                      key={item}
                      href="#"
                      aria-label={item}
                      className="transition-transform duration-200 hover:-translate-y-0.5"
                    >
                      <SocialIcon kind={item} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid justify-items-start gap-8 text-left sm:grid-cols-4 lg:gap-10">
                <FooterColumn
                  title="Product"
                  items={["Features", "For Creators", "For Brands", "How It Works", "Pricing", "Changelog"]}
                />
                <FooterColumn
                  title="Users"
                  items={["Creators", "Brands", "Agencies", "Content Teams", "Community", "Help Center"]}
                />
                <FooterColumn
                  title="Company"
                  items={["About Us", "Blog", "Careers", "Partners", "Press Kit", "Contact Us"]}
                />
                <FooterColumn
                  title="Legal"
                  items={["Terms of Service", "Privacy Policy", "Cookies Policy", "Refund Policy", "Security"]}
                />
              </div>

              <div className="flex flex-col items-start justify-between gap-8 border-t border-[#ece7f4] pt-8 text-left lg:border-t-0 lg:pt-0">
                <p className="w-max max-w-none text-[1rem] leading-[1.5] text-[#5f5d6f]">
                  © 2024 Buzzroster, Inc.
                  <br />
                  All rights reserved.
                </p>
                <div className="flex flex-col items-start gap-3 text-[#19182e] opacity-80">
                  <HeartMark />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-[1.05rem] font-semibold text-[#19182e]">{title}</h3>
      <ul className="mt-4 space-y-2 text-[0.98rem] leading-[1.4] text-[#66637d]">
        {items.map((item) => (
          <li key={item}>
            <a href="#" className="transition-colors hover:text-[#6d44ec]">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  const common = "h-8 w-8 text-[#19182e]";

  switch (kind) {
    case "instagram":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={common}>
          <rect x="4.5" y="4.5" width="15" height="15" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16.4" cy="7.6" r="1.1" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={common}>
          <path
            d="M14 5.5c.8 2.4 2.4 3.7 4.5 3.9v3.1c-1.7-.1-3.3-.7-4.5-1.6v4.7a5 5 0 1 1-4-4.9v3.4a1.7 1.7 0 1 0 1.4 1.7V5.5H14Z"
            fill="currentColor"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={common}>
          <rect x="3.5" y="6" width="17" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 9.5 15 12l-5 2.5v-5Z" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={common}>
          <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="3.3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8.2 10.4v5.4M8.2 8.2v.1M11.2 15.8v-2.9c0-1.5.8-2.3 1.9-2.3s1.8.8 1.8 2.3v2.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "x":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={common}>
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function HeartMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 54" fill="none" className="h-12 w-28">
      <path
        d="M8 34c20-16 38-20 54-10 9 6 18 11 31 11 8 0 14-3 17-7"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M86.5 16.8c0-4.2 3.4-7.6 7.6-7.6 2.3 0 4.5 1.1 5.9 2.9 1.4-1.8 3.6-2.9 5.9-2.9 4.2 0 7.6 3.4 7.6 7.6 0 8.1-13.5 15.8-13.5 15.8s-13.5-7.7-13.5-15.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}
