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
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.78rem] font-semibold ${palette[tone]}`}>
      {children}
    </span>
  );
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

export default function ReelIdeaStudioPage() {
  const [platform, setPlatform] = useState("Instagram");

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="rounded-[2rem] border border-[color:rgba(225,215,251,0.9)] bg-[linear-gradient(135deg,rgba(255,255,255,0.86),rgba(244,237,255,0.72))] p-6 shadow-[0_16px_45px_rgba(125,96,207,0.08)]">
          <Pill tone="peach">AI content tool for creators</Pill>
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.5rem,4.3vw,5.1rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-[color:var(--text-primary)]">
            Generate reel ideas that fit your creator profile.
          </h1>
          <p className="mt-4 max-w-[52rem] text-[1.04rem] leading-[1.72] text-[color:var(--text-secondary)]">
            Add your platform, audience size, niche, and content goal. Buzzroster will generate reel ideas with hooks,
            scripts, captions, and brand-fit angles.
          </p>

          <div className="mt-6 rounded-[1.8rem] border border-[color:rgba(225,215,251,0.88)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(250,247,255,0.84))] p-5">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <label className="grid gap-2">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">
                  Creator / profile name
                </span>
                <input className="rounded-2xl border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-3 text-[1rem] text-[color:var(--text-primary)] outline-none placeholder:text-[#8b88a0]" placeholder="Pratyush" />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">Platform</span>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="rounded-2xl border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-3 text-[1rem] text-[color:var(--text-primary)] outline-none">
                  {["Instagram", "YouTube Shorts", "TikTok", "LinkedIn", "X"].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">Follower count</span>
                <input className="rounded-2xl border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-3 text-[1rem] text-[color:var(--text-primary)] outline-none placeholder:text-[#8b88a0]" placeholder="32,000" />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">Genre / niche</span>
                <input className="rounded-2xl border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-3 text-[1rem] text-[color:var(--text-primary)] outline-none placeholder:text-[#8b88a0]" placeholder="Creator education" />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">Content goal</span>
                <input className="rounded-2xl border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-3 text-[1rem] text-[color:var(--text-primary)] outline-none placeholder:text-[#8b88a0]" placeholder="Grow reach" />
              </label>
              <label className="grid gap-2">
                <span className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--text-secondary)]">Optional profile URL</span>
                <input className="rounded-2xl border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-3 text-[1rem] text-[color:var(--text-primary)] outline-none placeholder:text-[#8b88a0]" placeholder="instagram.com/..." />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Pill>Fun</Pill>
              <Pill tone="green">Premium</Pill>
              <Pill tone="pink">Relatable</Pill>
              <Pill tone="peach">Educational</Pill>
              <Pill>Bold</Pill>
              <Pill tone="green">Soft</Pill>
              <Pill tone="pink">Storytelling</Pill>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button className="rounded-2xl bg-[linear-gradient(135deg,#6D44EC_0%,#5B3DD7_100%)] px-6 py-3 text-[0.98rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.38)]">
                Generate Ideas
              </button>
              <span className="text-[0.94rem] text-[color:var(--text-secondary)]">
                Trend search is not configured yet. Continuing with AI-only ideas.
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-[1.8rem] border border-[color:rgba(225,215,251,0.88)] bg-white/70 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[color:rgba(225,215,251,0.95)] bg-[rgba(250,247,255,0.95)] px-3 py-2 text-[0.9rem] text-[color:var(--text-primary)]">
                <span className="font-semibold text-[color:var(--accent)]">Platform:</span> {platform}
              </span>
              <span className="rounded-full border border-[color:rgba(225,215,251,0.95)] bg-[rgba(250,247,255,0.95)] px-3 py-2 text-[0.9rem] text-[color:var(--text-primary)]">
                <span className="font-semibold text-[color:var(--accent)]">Status:</span> Ready for input
              </span>
              <span className="rounded-full border border-[color:rgba(225,215,251,0.95)] bg-[rgba(250,247,255,0.95)] px-3 py-2 text-[0.9rem] text-[color:var(--text-primary)]">
                <span className="font-semibold text-[color:var(--accent)]">Ideas:</span> Will appear here
              </span>
              <button className="ml-auto rounded-full border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-2 text-[0.9rem] font-medium text-[color:var(--text-primary)]">Generate Again</button>
              <button className="rounded-full border border-[color:rgba(225,215,251,0.95)] bg-white px-4 py-2 text-[0.9rem] font-medium text-[color:var(--text-primary)]">Save Ideas</button>
              <button className="rounded-full bg-[linear-gradient(135deg,#6D44EC_0%,#5B3DD7_100%)] px-4 py-2 text-[0.9rem] font-semibold text-white">Add to Planner</button>
            </div>
          </div>
        </section>

        <aside className="rounded-[2rem] border border-[color:rgba(225,215,251,0.9)] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,250,240,0.86))] p-6 shadow-[0_16px_45px_rgba(125,96,207,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">Idea Engine Preview</p>
              <h2 className="mt-2 text-[1.35rem] font-semibold text-[color:var(--text-primary)]">Empty preview state</h2>
            </div>
            <Pill tone="pink">No fake ideas</Pill>
          </div>

          <div className="mt-5 rounded-[1.8rem] border border-dashed border-[color:rgba(205,188,248,0.9)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(250,247,255,0.96))] p-5">
            <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.9)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
              Enter creator details and click Generate Ideas to build your first reel concepts.
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <SectionCard eyebrow="Idea library" title="Best Reel Ideas" className="lg:col-span-8">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-[rgba(255,255,255,0.82)] p-5 text-[0.96rem] leading-[1.7] text-[color:var(--text-secondary)]">
            Generated ideas will appear here after you submit creator details.
          </div>
        </SectionCard>

        <SectionCard eyebrow="Scoring" title="Creator Content Score" className="lg:col-span-4">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
            Fill in the form to view fit, trend alignment, brand potential, and effort estimates.
          </div>
        </SectionCard>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <SectionCard eyebrow="Buckets" title="Content Buckets" className="lg:col-span-7">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
            Suggested content buckets will populate once a niche and goal are provided.
          </div>
        </SectionCard>

        <SectionCard eyebrow="Strategy" title="Posting Strategy" className="lg:col-span-5">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
            Your posting cadence and content mix will appear here after analysis.
          </div>
          <button className="mt-4 rounded-2xl bg-[linear-gradient(135deg,#6D44EC_0%,#5B3DD7_100%)] px-5 py-3 text-[0.95rem] font-semibold text-white">
            Send to Content Planner
          </button>
        </SectionCard>
      </div>
    </main>
  );
}
