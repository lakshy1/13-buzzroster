"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { sidebarItems } from "./dashboard-data";
import { BrandLogo } from "../components/BrandLogo";
import { SidebarIcon } from "./dashboard-ui";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
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
      TS
    </div>
  );
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const stored = window.localStorage.getItem("buzzroster-dashboard-sidebar");
    return stored === "collapsed";
  });

  useEffect(() => {
    window.localStorage.setItem("buzzroster-dashboard-sidebar", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);

  return (
    <aside
      className={`z-30 flex h-auto w-full shrink-0 flex-col overflow-hidden rounded-[2rem] border border-border bg-surface/95 p-4 shadow-[0_18px_44px_rgba(114,84,242,0.08)] backdrop-blur-xl transition-[width] duration-300 ease-out lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] ${
        collapsed ? "lg:w-[92px]" : "lg:w-[280px]"
      }`}
    >
      <div className={`flex items-start gap-3 ${collapsed ? "justify-center" : "justify-between"}`}>
        <BrandLogo compact={collapsed} />
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronIcon collapsed={collapsed} />
        </button>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1.5">
        {sidebarItems.map((item) => {
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-[1.1rem] px-3 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-[linear-gradient(135deg,rgba(109,68,236,0.16),rgba(109,68,236,0.08))] text-accent shadow-[0_12px_24px_rgba(109,68,236,0.10)]"
                  : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <SidebarIcon icon={item.icon} className={`h-5 w-5 shrink-0 ${active ? "text-accent" : "text-current"}`} />
              <span className={`whitespace-nowrap transition-opacity duration-200 ${collapsed ? "lg:pointer-events-none lg:absolute lg:opacity-0" : "opacity-100"}`}>
                {item.label}
              </span>
              {item.label === "Messages" ? <span className={`ml-auto rounded-full bg-accent px-2 py-0.5 text-[0.68rem] font-semibold text-white ${collapsed ? "lg:absolute lg:opacity-0" : ""}`}>3</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className={`rounded-[1.5rem] border border-border bg-[linear-gradient(180deg,rgba(109,68,236,0.10),rgba(109,68,236,0.03))] p-3 ${collapsed ? "px-2" : ""}`}>
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <UserAvatar />
          {!collapsed ? (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-[-0.03em] text-foreground">Tanmay Singh</div>
              <div className="text-xs text-muted-foreground">View profile</div>
            </div>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
