import { Panel, PanelTitle } from "../../creator-ui";

export default async function CreatorCampaignWorkspacePage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.85fr)]">
        <Panel>
          <PanelTitle eyebrow="Brief" title={`Campaign ${campaignId}`} />
          <div className="mt-5 grid gap-4">
            {[
              "Campaign brief and positioning",
              "Deliverables checklist",
              "Upload content section",
              "Brand feedback area",
              "Timeline milestones",
            ].map((item) => (
              <div key={item} className="rounded-[1.3rem] bg-surface px-4 py-4 text-sm font-medium text-foreground">
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle eyebrow="Actions" title="Progress and payments" />
          <div className="mt-5 space-y-3">
            {[
              { label: "Stage", value: "Review in progress" },
              { label: "Deadline", value: "May 16" },
              { label: "Payment", value: "INR 28,500 pending" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.25rem] border border-border px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{item.label}</div>
                <div className="mt-2 font-semibold text-foreground">{item.value}</div>
              </div>
            ))}
            <button
              type="button"
              className="w-full rounded-[1rem] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-4 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
            >
              Submit content
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
