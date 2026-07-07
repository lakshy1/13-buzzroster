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

export default function TaxCalculatorPage() {
  const [mode, setMode] = useState<"gst" | "income">("gst");

  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <section className="rounded-[2rem] border border-[color:rgba(225,215,251,0.9)] bg-[linear-gradient(135deg,rgba(255,255,255,0.88),rgba(244,237,255,0.76))] p-6 shadow-[0_16px_45px_rgba(125,96,207,0.08)]">
          <Pill tone="peach">Tax Calculator · GST included</Pill>
          <h1 className="mt-5 max-w-[18ch] text-[clamp(2.5rem,4.3vw,5.1rem)] font-semibold leading-[0.94] tracking-[-0.04em] text-[color:var(--text-primary)]">
            Estimate tax cleanly, with GST built in.
          </h1>
          <p className="mt-4 max-w-[52rem] text-[1.04rem] leading-[1.72] text-[color:var(--text-secondary)]">
            Use GST mode for invoice math and income mode for lightweight planning. The page stays minimal until you add values.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode("gst")}
              className={`rounded-full border px-4 py-2 text-[0.94rem] font-medium ${
                mode === "gst"
                  ? "border-[color:var(--accent-soft)] bg-[linear-gradient(135deg,rgba(141,121,246,0.16),rgba(255,255,255,0.94))] text-[color:var(--accent)]"
                  : "border-[color:rgba(225,215,251,0.95)] bg-white text-[color:var(--text-primary)]"
              }`}
            >
              GST calculator
            </button>
            <button
              type="button"
              onClick={() => setMode("income")}
              className={`rounded-full border px-4 py-2 text-[0.94rem] font-medium ${
                mode === "income"
                  ? "border-[color:var(--accent-soft)] bg-[linear-gradient(135deg,rgba(141,121,246,0.16),rgba(255,255,255,0.94))] text-[color:var(--accent)]"
                  : "border-[color:rgba(225,215,251,0.95)] bg-white text-[color:var(--text-primary)]"
              }`}
            >
              Income tax estimate
            </button>
          </div>

          <div className="mt-6 rounded-[1.8rem] border border-[color:rgba(225,215,251,0.88)] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(250,247,255,0.84))] p-5">
            <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.9)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
              Add an amount to calculate GST or income tax. No placeholder numbers are shown until you type values.
            </div>
          </div>
        </section>

        <aside className="rounded-[2rem] border border-[color:rgba(225,215,251,0.9)] bg-[linear-gradient(135deg,rgba(255,255,255,0.94),rgba(255,250,240,0.86))] p-6 shadow-[0_16px_45px_rgba(125,96,207,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[color:var(--accent)]">Buzzroster tax lens</p>
              <h2 className="mt-2 text-[1.35rem] font-semibold text-[color:var(--text-primary)]">Empty summary panel</h2>
            </div>
            <Pill tone="green">No demo data</Pill>
          </div>

          <div className="mt-5 rounded-[1.8rem] border border-dashed border-[color:rgba(205,188,248,0.9)] bg-[linear-gradient(180deg,rgba(255,255,255,0.82),rgba(250,247,255,0.96))] p-5">
            <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.9)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
              Enter a value to see the calculation summary.
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <SectionCard eyebrow="GST view" title="GST breakdown" className="lg:col-span-7">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-[rgba(255,255,255,0.82)] p-5 text-[0.96rem] leading-[1.7] text-[color:var(--text-secondary)]">
            GST totals will appear here after you input a taxable amount and rate.
          </div>
        </SectionCard>

        <SectionCard eyebrow="Note" title="Usage guidance" className="lg:col-span-5">
          <div className="rounded-[1.5rem] border border-[color:rgba(225,215,251,0.88)] bg-white px-4 py-5 text-[0.96rem] leading-[1.68] text-[color:var(--text-secondary)]">
            GST output is for estimates only. It does not replace professional advice.
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
