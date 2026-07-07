import Link from "next/link";

export default function CreateCampaignPage() {
  return (
    <section className="rounded-[1.8rem] border border-border bg-surface p-5 shadow-[0_16px_36px_rgba(112,84,199,0.06)]">
      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">Create campaign</div>
      <h1 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.05em] text-foreground">Launch a new creator collaboration campaign</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        Define your objective, budget, creator criteria, and campaign assets so you can invite the right creators faster.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          "Campaign title",
          "Objective",
          "Product or service name",
          "Campaign description",
          "Deliverables",
          "Creator category",
          "Budget range",
          "Timeline",
          "Location preference",
          "Content guidelines",
          "Usage rights",
          "Campaign assets",
        ].map((field) => (
          <label key={field} className="space-y-2">
            <span className="text-sm font-medium text-foreground">{field}</span>
            <input className="h-11 w-full rounded-2xl border border-border bg-background px-4 text-sm text-foreground outline-none" />
          </label>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/brand/campaigns" className="rounded-[1rem] border border-border px-4 py-2.5 text-sm font-semibold text-accent">
          Save draft
        </Link>
        <Link
          href="/brand/discover-creators"
          className="rounded-[1rem] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-4 py-2.5 text-sm font-semibold text-accent-foreground"
        >
          Continue to creator discovery
        </Link>
      </div>
    </section>
  );
}
