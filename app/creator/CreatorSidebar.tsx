"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { sidebarItems } from "./creator-data";
import { SidebarIcon } from "./creator-ui";
import { BrandLogo } from "../components/BrandLogo";

function isActive(pathname: string, href: string) {
  if (href === "/creator/dashboard") {
    return pathname === href || pathname === "/creator";
  }

  return pathname.startsWith(href);
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} fill="none" aria-hidden="true">
      <path d="M9.5 6.5 15 12l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserAvatar() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-[linear-gradient(135deg,rgba(109,68,236,0.92),rgba(255,255,255,0.22))] text-sm font-semibold text-white shadow-[0_14px_28px_rgba(109,68,236,0.24)]">
      LS
    </div>
  );
}

export function CreatorSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.localStorage.getItem("buzzroster-creator-sidebar") === "collapsed";
  });

  useEffect(() => {
    window.localStorage.setItem("buzzroster-creator-sidebar", collapsed ? "collapsed" : "expanded");
    document.documentElement.style.setProperty("--creator-sidebar-width", collapsed ? "84px" : "252px");
  }, [collapsed]);

  return (
    <aside
      className={`fixed left-4 top-4 z-30 hidden h-[calc(100vh-2rem)] w-full shrink-0 flex-col overflow-visible bg-transparent p-0 transition-[width] duration-300 ease-out lg:flex ${
        collapsed ? "lg:w-[84px]" : "lg:w-[252px]"
      }`}
    >
      <div className="flex h-full flex-col overflow-hidden p-3">
        <div className={`flex items-start gap-3 ${collapsed ? "justify-center" : "justify-between"}`}>
          <BrandLogo compact={collapsed} />
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1">
          {sidebarItems.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-[1rem] px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-[linear-gradient(135deg,rgba(109,68,236,0.18),rgba(109,68,236,0.08))] text-accent shadow-[0_12px_24px_rgba(109,68,236,0.12)]"
                    : "text-muted-foreground hover:bg-[rgba(109,68,236,0.06)] hover:text-foreground dark:hover:bg-white/5"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <SidebarIcon icon={item.icon} className={`h-4 w-4 shrink-0 ${active ? "text-accent" : "text-current"}`} />
                <span className={`whitespace-nowrap transition-opacity duration-200 ${collapsed ? "lg:pointer-events-none lg:absolute lg:opacity-0" : "opacity-100"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className={`rounded-[1.35rem] border border-border bg-[linear-gradient(180deg,rgba(109,68,236,0.10),rgba(109,68,236,0.03))] p-3 ${collapsed ? "px-2" : ""}`}>
          <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
            <UserAvatar />
            {!collapsed ? (
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold tracking-[-0.03em] text-foreground">Lakshya Sharma</div>
                <div className="text-xs text-muted-foreground">View profile</div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setCollapsed((value) => !value)}
        className="sidebar-handle absolute right-[-0.85rem] top-1/2 z-40 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(109,68,236,0.28)] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] text-accent-foreground shadow-[0_14px_28px_rgba(109,68,236,0.22)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1/2 hover:scale-[1.05] hover:border-[rgba(109,68,236,0.42)] hover:shadow-[0_18px_34px_rgba(109,68,236,0.26)] dark:border-[rgba(255,255,255,0.12)]"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronIcon collapsed={collapsed} />
      </button>
    </aside>
  );
}
