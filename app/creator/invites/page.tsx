"use client";

import { useMemo, useState } from "react";

import { useResponsiveSidebar } from "../../components/responsive-sidebar-context";

type OpportunityTab = "All" | "Invited" | "Recommended" | "Saved";

type OpportunityRow = {
  brand: string;
  subtitle: string;
  payout: string;
  badge?: string;
  logo: "nike" | "boat" | "nykaa" | "amazon" | "philips";
};

const tabs: OpportunityTab[] = ["All", "Invited", "Recommended", "Saved"];

const opportunities: OpportunityRow[] = [
  {
    brand: "Nike India",
    subtitle: "Instagram Reel",
    payout: "INR 12,000",
    badge: "New",
    logo: "nike",
  },
  {
    brand: "boAt Lifestyle",
    subtitle: "UGC video",
    payout: "INR 8,500",
    badge: "New",
    logo: "boat",
  },
  {
    brand: "Nykaa",
    subtitle: "Instagram Story",
    payout: "INR 10,000",
    logo: "nykaa",
  },
  {
    brand: "Amazon India",
    subtitle: "Product review",
    payout: "INR 10,000",
    logo: "amazon",
  },
  {
    brand: "Philips India",
    subtitle: "YouTube integration",
    payout: "INR 12,000",
    logo: "philips",
  },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <circle cx="11" cy="11" r="5.75" stroke="currentColor" strokeWidth="1.8" />
      <path d="m15.2 15.2 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M4.5 6.25h15M7 12h10M9.75 17.75h4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

function SidebarToggleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path d="M4.5 7h15M4.5 12h15M4.5 17h15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function NikeLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path d="M10 24c7.8-4.8 15-8 26-11-6.7 5.5-11.8 10.1-18.5 17.1-3.1 3.2-5.8 3.8-7.5 2.4-1.8-1.4-1.5-5 0-8.5Z" fill="currentColor" />
    </svg>
  );
}

function BoatLogo() {
  return <span className="text-[0.78rem] font-black tracking-[-0.06em] text-white">boAt</span>;
}

function NykaaLogo() {
  return <span className="text-[0.72rem] font-black uppercase tracking-[0.12em] text-white">nykaa</span>;
}

function AmazonLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path d="M11 29.5c7.8 4.2 18.1 4.2 26 0" stroke="#f7b500" strokeWidth="2.4" strokeLinecap="round" />
      <path d="m30.8 27.5 6.2 2-2 6" stroke="#f7b500" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhilipsLogo() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
      <path d="M18 14h12l-1.4 7.5h-9.2L18 14Z" fill="currentColor" />
      <path d="M16 25c2.2-1.4 4.8-2.1 8-2.1s5.8.7 8 2.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BrandBadge({ row }: { row: OpportunityRow }) {
  const badgeTone =
    row.logo === "nike"
      ? "bg-black text-white"
      : row.logo === "boat"
        ? "bg-black text-white"
        : row.logo === "nykaa"
          ? "bg-[#ee7aa4] text-white"
          : row.logo === "amazon"
            ? "bg-black text-white"
            : "bg-[#3c66cf] text-white";

  return (
    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-[0_12px_24px_rgba(0,0,0,0.14)] ${badgeTone}`}>
      {row.logo === "nike" ? (
        <NikeLogo />
      ) : row.logo === "boat" ? (
        <BoatLogo />
      ) : row.logo === "nykaa" ? (
        <NykaaLogo />
      ) : row.logo === "amazon" ? (
        <AmazonLogo />
      ) : (
        <PhilipsLogo />
      )}
    </div>
  );
}

function emptyResultMessage(query: string, tab: OpportunityTab) {
  return `No opportunities found for "${query || "all"}" in ${tab.toLowerCase()} right now.`;
}

export default function CreatorOpportunitiesPage() {
  const sidebar = useResponsiveSidebar();
  const [activeTab, setActiveTab] = useState<OpportunityTab>("All");
  const [query, setQuery] = useState("");

  const filteredRows = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return opportunities.filter((row) => {
      const matchesQuery =
        !normalized ||
        [row.brand, row.subtitle, row.payout, row.badge ?? ""].some((value) => value.toLowerCase().includes(normalized));

      const matchesTab = activeTab === "All" || activeTab === "Invited" || activeTab === "Recommended" || activeTab === "Saved";

      return matchesQuery && matchesTab;
    });
  }, [activeTab, query]);

  return (
    <>
      {sidebar ? (
        <div className="mb-3 flex items-center justify-end gap-3 lg:hidden">
          <button
            type="button"
            onClick={sidebar.toggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground"
            aria-label={sidebar.isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <SidebarToggleIcon />
          </button>
        </div>
      ) : null}

      <div className="space-y-4">
        <label className="flex h-12 w-full items-center gap-3 rounded-full border border-border bg-surface-muted px-4 text-muted-foreground shadow-[0_10px_24px_rgba(20,20,35,0.04)] transition-colors focus-within:border-accent/30">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search opportunities..."
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/80 focus:outline-none"
            aria-label="Search opportunities"
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => {
              const active = tab === activeTab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active
                      ? "bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] text-accent-foreground shadow-[0_12px_24px_rgba(109,68,236,0.18)]"
                      : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-border bg-surface px-4 text-sm font-semibold text-foreground shadow-[0_10px_24px_rgba(20,20,35,0.04)] transition-colors hover:border-accent/30"
          >
            <FilterIcon />
            Filters
          </button>
        </div>

        <div className="divide-y divide-border/70 rounded-[1.65rem] border border-border/80 bg-[rgba(255,255,255,0.36)] dark:bg-white/[0.03]">
          {filteredRows.length ? (
            filteredRows.map((row) => (
              <article key={row.brand} className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-surface-muted/70 sm:px-5">
                <BrandBadge row={row} />

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate text-[1.02rem] font-semibold tracking-[-0.04em] text-foreground">{row.brand}</h2>
                    {row.badge ? (
                      <span className="rounded-full bg-[rgba(109,68,236,0.10)] px-2.5 py-1 text-[0.72rem] font-semibold text-accent">
                        {row.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{row.subtitle}</p>
                  <p className="mt-1.5 text-sm font-medium text-foreground">{row.payout}</p>
                </div>

                <button
                  type="button"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                  aria-label={`Save ${row.brand}`}
                >
                  <BookmarkIcon />
                </button>
              </article>
            ))
          ) : (
            <div className="px-5 py-12 text-center text-sm text-muted-foreground">{emptyResultMessage(query, activeTab)}</div>
          )}
        </div>
      </div>
    </>
  );
}
