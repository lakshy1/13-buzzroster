"use client";

import type { ReactNode } from "react";
import { useState } from "react";

function Pill({
  children,
  tone = "lavender",
}: {
  children: ReactNode;
  tone?: "lavender" | "peach" | "green" | "pink";
}) {
  const palette = {
    lavender:
      "bg-[linear-gradient(135deg,rgba(141,121,246,0.18),rgba(255,255,255,0.92))] text-[color:var(--accent)] border-[color:var(--accent-soft)]",
    peach:
      "bg-[linear-gradient(135deg,rgba(240,140,90,0.12),rgba(255,255,255,0.92))] text-[color:#d35e2d] border-[#f3d6c6]",
    green:
      "bg-[linear-gradient(135deg,rgba(104,191,113,0.12),rgba(255,255,255,0.92))] text-[color:#4d8f55] border-[#d8eadb]",
    pink:
      "bg-[linear-gradient(135deg,rgba(234,108,152,0.12),rgba(255,255,255,0.92))] text-[color:#bc4d75] border-[#f0d5e0]",
  };
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.78rem] font-semibold ${palette[tone]}`}>{children}</span>;
}

function SectionCard({
  eyebrow,
  title,
  children,
  className = "",
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[1.8rem] border border-[color:rgba(225,215,251,0.9)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(250,247,255,0.9))] p-5 shadow-[0_16px_45px_rgba(125,96,207,0.08)] ${className}`}
    >
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">{eyebrow}</p>
      <h2 className="mt-2 text-[1.25rem] font-semibold text-[color:var(--text-primary)]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function ContentPlannerPage() {
  const [planName] = useState("Creator Content Sprint");

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="rounded-[2rem] border border-[color:rgba(225,215,251,0.9)] bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(244,237,255,0.76))] p-6 shadow-[0_16px_45px_rgba(125,96,207,0.08)]">
          <Pill tone="peach">Creator Content Planner</Pill>
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.5rem,4.3vw,5.1rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-[color:var(--text-primary)]">
            Turn content ideas into a clear weekly plan.
          </h1>
          <p className="mt-4 max-w-[52rem] text-[1.04rem] leading-[1.72] text-[color:var(--text-secondary)]">
            Add your content goals, platforms, ideas, and deadlines. Buzzroster turns them into a visual dashboard,
            task list, reminders, and content calendar.
          </p>

          <div className="mt-6 rounded-[1.8rem] border border-[color:rgba(225,215,251,0.88)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(250,247,255,0.84))] p-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {["Plan name", "Main goal", "Platforms", "Posting frequency", "Reminder preference", "Content ideas"].map((field) => (
                <label key={field} className="grid gap-2">
                  <span className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">{field}</span>
                  {field === "Content ideas" ? (
                    <textarea className="min-h-[7.6rem] rounded-2xl border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-3 text-[1rem] text-[color:var(--text-primary)] outline-none placeholder:text-[#8b88a0] md:col-span-2" placeholder="Paste ideas, campaign dates, angles, or notes..." />
                  ) : (
                    <input className="rounded-2xl border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-3 text-[1rem] text-[color:var(--text-primary)] outline-none placeholder:text-[#8b88a0]" placeholder={field === "Plan name" ? "Creator Content Sprint" : "Select / type here"} />
                  )}
                </label>
              ))}
            </div>
            <button className="mt-5 rounded-2xl bg-[linear-gradient(135deg,#6D44EC_0%,#5B3DD7_100%)] px-6 py-3 text-[0.98rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.38)]">
              Build My Plan
            </button>
          </div>

          <div className="mt-5 rounded-[1.8rem] border border-[color:rgba(225,215,251,0.88)] bg-white/70 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[color:rgba(225,215,251,0.95)] bg-[rgba(250,247,255,0.95)] px-3 py-2 text-[0.9rem] text-[color:var(--text-primary)]">
                <span className="font-semibold text-[color:var(--accent)]">Plan:</span> {planName}
              </span>
              <span className="rounded-full border border-[color:rgba(225,215,251,0.95)] bg-[rgba(250,247,255,0.95)] px-3 py-2 text-[0.9rem] text-[color:var(--text-primary)]">
                <span className="font-semibold text-[color:var(--accent)]">Status:</span> Ready for input
              </span>
              <span className="rounded-full border border-[color:rgba(225,215,251,0.95)] bg-[rgba(250,247,255,0.95)] px-3 py-2 text-[0.9rem] text-[color:var(--text-primary)]">
                <span className="font-semibold text-[color:var(--accent)]">Progress:</span> Will appear here
              </span>
            </div>
          </div>
        </section>

        <aside className="rounded-[2rem] border border-[color:rgba(225,215,251,0.9)] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,250,240,0.86))] p-6 shadow-[0_16px_45px_rgba(125,96,207,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">Your content week</p>
              <h2 className="mt-2 text-[1.35rem] font-semibold text-[color:var(--text-primary)]">Empty planner state</h2>
            </div>
            <Pill tone="green">No fake tasks</Pill>
          </div>

          <div className="mt-5 rounded-[1.8rem] border border-dashed border-[color:rgba(205,188,248,0.9)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(250,247,255,0.96))] p-5">
            <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.9)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
              Build your plan to unlock the weekly board, reminders, and progress overview.
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <SectionCard eyebrow="Dashboard" title="Weekly Content Board" className="lg:col-span-8">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-[rgba(255,255,255,0.82)] p-5 text-[0.96rem] leading-[1.7] text-[color:var(--text-secondary)]">
            Your task board will appear once you add ideas and deadlines.
          </div>
        </SectionCard>

        <SectionCard eyebrow="Focus" title="Today&apos;s Focus" className="lg:col-span-4">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
            Due today, next deadline, and reminders will show here after setup.
          </div>
        </SectionCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <SectionCard eyebrow="Overview" title="Progress Overview" className="lg:col-span-5">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
            Planned posts, in-progress work, ready-to-post, and overdue counts will appear here once tasks are added.
          </div>
        </SectionCard>

        <SectionCard eyebrow="Mix" title="Content Mix Insights" className="lg:col-span-7">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
            Education, story, and trend mix insights will populate after the plan is built.
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
