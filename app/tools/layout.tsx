"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "../components/BrandLogo";
import { ThemeToggle } from "../components/theme-toggle";

const navItems = [
  { label: "About us", href: "/#about-us" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Resources", href: "/#resources" },
  { label: "Tools", href: "/#tools", chevron: true },
];

const toolsMenuItems = [
  { label: "Creator Worth Calculator", href: "/tools/creator-worth-calculator" },
  { label: "Reel Idea Studio", href: "/tools/reel-idea-studio" },
  { label: "Creator Content Planner", href: "/tools/content-planner" },
  { label: "Tax Calculator", href: "/tools/tax-calculator" },
];

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

function ToolsDropdown() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-1 transition-colors hover:text-accent"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span>Tools</span>
        <ChevronIcon className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <div aria-hidden="true" className="absolute left-0 right-0 top-full h-3" />

      <div
        role="menu"
        className={`absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-[1.6rem] border border-border bg-surface p-4 shadow-[0_22px_50px_rgba(125,96,207,0.12)] backdrop-blur-xl transition-all duration-200 ${
          open
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-1"
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-accent/75">
            Tools
          </span>
          <span className="ml-3 h-px flex-1 bg-border" />
        </div>

        <div className="grid gap-2.5">
          {toolsMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              role="menuitem"
              className={`rounded-[1.05rem] border px-4 py-4 text-[1rem] shadow-[0_8px_20px_rgba(125,96,207,0.06)] transition-colors hover:bg-surface-muted hover:text-accent ${
                pathname === item.href
                  ? "border-[color:var(--accent-soft)] bg-[linear-gradient(135deg,rgba(141,121,246,0.12),rgba(255,255,255,0.92))] text-[color:var(--accent)]"
                  : "border-border bg-surface text-foreground"
              }`}
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
      className="rounded-2xl px-4 py-3 transition-colors hover:bg-surface-muted hover:text-accent"
    >
      {label}
    </Link>
  );
}

export default function ToolsLayout({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <main className="theme-shell min-h-screen overflow-hidden px-4 pb-5 pt-2 sm:px-6 sm:pb-5 sm:pt-2 xl:px-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-5 pt-[4.4rem] sm:pt-[4.8rem]">
        <header className="glass-panel fixed left-1/2 top-2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 rounded-[1.75rem] px-4 py-3 sm:w-[calc(100vw-3rem)] sm:px-6 md:w-[calc(100vw-4rem)] md:px-8">
          <div className="flex items-center justify-between gap-3">
            <BrandLogo />

            <nav className="hidden items-center gap-6 text-[0.98rem] font-medium text-foreground lg:flex xl:gap-10">
              {navItems.map((item) =>
                item.label === "Tools" ? (
                  <ToolsDropdown key={item.label} />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-1 transition-colors hover:text-accent"
                  >
                    <span>{item.label}</span>
                  </Link>
                ),
              )}
            </nav>

            <div className="hidden items-center gap-3 lg:flex">
              <ThemeToggle />
              <Link
                href="/#resources"
                className="rounded-2xl border border-border bg-surface px-5 py-3 text-[1rem] font-medium text-foreground shadow-[0_10px_30px_rgba(111,76,203,0.08)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-surface-muted"
              >
                Contact sales
              </Link>
              <Link
                href="/auth"
                className="rounded-2xl bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-6 py-3 text-[1rem] font-semibold text-accent-foreground shadow-glow transition-transform duration-200 hover:-translate-y-0.5"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-surface text-accent shadow-[0_10px_24px_rgba(125,96,207,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-surface-muted lg:hidden"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
            >
              <span className="sr-only">{mobileNavOpen ? "Close menu" : "Open menu"}</span>
              {mobileNavOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>

          <div
            className={`glass-panel mt-3 overflow-hidden rounded-[1.5rem] transition-all duration-300 lg:hidden ${
              mobileNavOpen ? "max-h-[78vh] opacity-100" : "max-h-0 border-transparent opacity-0"
            }`}
          >
            <div className="flex max-h-[78vh] flex-col gap-4 overflow-y-auto p-4 pb-6 overscroll-contain">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Theme</p>
                  <p className="text-xs text-muted-foreground">Switch light or dark mode</p>
                </div>
                <ThemeToggle compact />
              </div>

              <nav className="grid gap-2 text-[1rem] font-medium text-foreground">
                {navItems.map((item) =>
                  item.label === "Tools" ? (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setMobileToolsOpen((current) => !current)}
                      className="flex items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors hover:bg-surface-muted hover:text-accent"
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
                    <NavButton
                      key={item.label}
                      label={item.label}
                      href={item.href}
                      onClick={() => {
                        setMobileToolsOpen(false);
                        setMobileNavOpen(false);
                      }}
                    />
                  ),
                )}
              </nav>

              <div
                id="mobile-tools-menu"
                className={`overflow-hidden rounded-[1.4rem] border border-border bg-surface transition-all duration-300 ease-out ${
                  mobileToolsOpen
                    ? "max-h-96 translate-y-0 opacity-100"
                    : "max-h-0 -translate-y-1 border-transparent opacity-0"
                }`}
              >
                <div className="p-4">
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-accent">
                    Tools
                  </p>
                  <div className="mt-3 grid gap-2">
                    {toolsMenuItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => {
                          setMobileToolsOpen(false);
                          setMobileNavOpen(false);
                        }}
                        className="rounded-2xl border border-border bg-surface px-4 py-3 text-[0.98rem] text-foreground shadow-[0_8px_20px_rgba(125,96,207,0.06)] transition-colors hover:bg-surface-muted hover:text-accent"
                      >
                        {item.label}
                      </Link>
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
                  className="rounded-2xl border border-border bg-surface px-4 py-3 text-center text-[1rem] font-medium text-foreground shadow-[0_10px_24px_rgba(111,76,203,0.08)] transition-colors hover:bg-surface-muted"
                >
                  Contact sales
                </Link>
                <Link
                  href="/auth"
                  onClick={() => {
                    setMobileToolsOpen(false);
                    setMobileNavOpen(false);
                  }}
                  className="rounded-2xl bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-4 py-3 text-center text-[1rem] font-semibold text-accent-foreground shadow-[0_16px_35px_rgba(91,61,215,0.32)]"
                >
                  Log in
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div
          className={`flex-1 rounded-[2rem] pb-2 ${pathname?.startsWith("/tools") ? "pt-0" : "pt-0"}`}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
