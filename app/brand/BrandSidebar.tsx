"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { brandSidebarItems } from "./brand-data";
import { LogoMark, SidebarIcon } from "./brand-ui";

function isActive(pathname: string, href: string) {
  if (href === "/brand/dashboard") {
    return pathname === href || pathname === "/brand";
  }

  return pathname.startsWith(href);
}

export function BrandSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-[#ece6f8] bg-white/78 px-4 py-5 backdrop-blur-xl lg:sticky lg:top-0 lg:h-screen lg:w-[272px] lg:border-r lg:border-b-0 lg:px-5 lg:py-7">
      <div className="flex items-center justify-between gap-4 lg:block">
        <LogoMark />
        <Link
          href="/brand/campaigns/create"
          className="inline-flex items-center rounded-full border border-[#e8defd] bg-[#f7f1ff] px-4 py-2 text-sm font-semibold text-[#6d44ec] transition-colors hover:bg-[#efe6ff] lg:hidden"
        >
          Create campaign
        </Link>
      </div>

      <nav className="mt-5 flex gap-2 overflow-x-auto pb-1 no-scrollbar lg:mt-8 lg:block lg:space-y-1">
        {brandSidebarItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`inline-flex min-w-max items-center gap-3 rounded-[1.1rem] px-4 py-3 text-sm font-medium transition-all duration-200 lg:flex ${
                active
                  ? "bg-[linear-gradient(135deg,rgba(114,84,242,0.14),rgba(114,84,242,0.06))] text-[#6d44ec] shadow-[0_14px_28px_rgba(114,84,242,0.08)]"
                  : "text-[#49465d] hover:bg-white hover:text-[#1b1930]"
              }`}
            >
              <SidebarIcon icon={item.icon === "discover" ? "invites" : item.icon === "creators" ? "profile" : item.icon === "analytics" ? "calculator" : item.icon === "billing" ? "earnings" : item.icon} className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 hidden rounded-[1.35rem] border border-[#ebe2fb] bg-[linear-gradient(180deg,rgba(248,244,255,0.94),rgba(255,255,255,0.98))] p-3.5 shadow-[0_12px_26px_rgba(120,96,198,0.06)] lg:block">
        <div className="text-[0.92rem] font-semibold tracking-[-0.03em] text-[#201d34]">Campaign health</div>
        <div className="mt-0.5 text-[0.72rem] font-medium text-[#6b6680]">6 active campaigns, 82% on track</div>
        <div className="mt-2.5 h-1.5 rounded-full bg-[#ece7f6]">
          <div className="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,#6d44ec_0%,#9c7dff_100%)]" />
        </div>
        <Link href="/brand/analytics" className="mt-2.5 inline-flex text-[0.76rem] font-semibold text-[#6d44ec] transition-colors hover:text-[#5b3dd7]">
          Open analytics
        </Link>
      </div>
    </aside>
  );
}
