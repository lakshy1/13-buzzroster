import type { ReactNode } from "react";

import { DashboardSidebar } from "./DashboardSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="theme-shell min-h-screen w-full">
      <div className="flex min-h-screen w-full flex-col gap-4 overflow-hidden bg-surface/35 p-3 shadow-[0_24px_70px_rgba(20,20,35,0.08)] backdrop-blur-xl sm:p-4 lg:flex-row lg:p-4">
        <DashboardSidebar />
        <section className="min-w-0 flex flex-1 flex-col overflow-hidden rounded-[1.6rem] border border-border/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.1))] p-3 shadow-[0_18px_42px_rgba(20,20,35,0.04)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] sm:p-4 lg:p-5">
          {children}
        </section>
      </div>
    </main>
  );
}
