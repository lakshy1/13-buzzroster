"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { CreatorSidebar } from "./CreatorSidebar";
import { SidebarIcon } from "./creator-ui";
import { ResponsiveSidebarProvider } from "../components/responsive-sidebar-context";
import { sidebarItems } from "./creator-data";
import Link from "next/link";

function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
  }, [open]);

  return (
    <div className={`fixed inset-0 z-50 lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        type="button"
        className={`absolute inset-0 bg-black/35 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-label="Close sidebar"
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-[320px] max-w-[86vw] flex-col border-l border-border bg-surface p-4 shadow-[0_28px_70px_rgba(0,0,0,0.22)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Menu</div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground"
            aria-label="Close sidebar"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="mt-6 flex flex-1 flex-col gap-1.5">
          {sidebarItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-[1.1rem] px-3 py-3 text-sm font-medium transition-all ${
                  active
                    ? "bg-[linear-gradient(135deg,rgba(109,68,236,0.16),rgba(109,68,236,0.08))] text-accent"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                <SidebarIcon icon={item.icon} className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}

export default function CreatorLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <ResponsiveSidebarProvider
      value={{
        isSidebarOpen: open,
        toggleSidebar: () => setOpen((value) => !value),
        closeSidebar: () => setOpen(false),
      }}
    >
      <main className="theme-shell min-h-screen w-full">
        <div className="flex min-h-screen w-full flex-col gap-4 bg-surface/35 p-3 shadow-[0_24px_70px_rgba(20,20,35,0.08)] backdrop-blur-xl sm:p-4 lg:px-4 lg:py-4 lg:pl-[calc(var(--creator-sidebar-width)+2rem)]">
          <CreatorSidebar />
          <MobileSidebar open={open} onClose={() => setOpen(false)} />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </main>
    </ResponsiveSidebarProvider>
  );
}
