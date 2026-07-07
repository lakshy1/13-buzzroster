import { activeCampaigns } from "../creator-data";
import { BrandAvatar, DashboardHeader, Panel, PanelTitle, PrimaryButton, ProgressTrack, SecondaryButton } from "../creator-ui";

export default function CreatorCampaignsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Creator campaigns"
        title="Manage accepted collaborations from one place."
        description="Track campaign stage, deliverables, deadlines, and the status of every active collaboration."
        action={
          <>
            <SecondaryButton href="/creator/invites">Open invites</SecondaryButton>
            <PrimaryButton href="/creator/messages">Talk to brands</PrimaryButton>
          </>
        }
      />

      <div className="flex flex-wrap gap-3">
        {["Active", "Submitted", "Under review", "Completed", "Paid"].map((tab, index) => (
          <div
            key={tab}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${index === 0 ? "bg-accent text-accent-foreground" : "border border-border bg-surface text-muted-foreground"}`}
          >
            {tab}
          </div>
        ))}
      </div>

      <Panel>
        <PanelTitle
          eyebrow="Campaign tracker"
          title="All current creator campaigns"
          description="Each campaign shows its current workflow stage so nothing slips between approvals and delivery."
        />

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {activeCampaigns.map((campaign, index) => (
            <article key={campaign.brand} className="rounded-[1.7rem] border border-border bg-surface p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <BrandAvatar name={campaign.brand} accent={campaign.brand === "Mamaearth" ? "var(--success)" : "var(--info)"} />
                  <div>
                    <div className="text-lg font-semibold tracking-[-0.04em] text-foreground">{campaign.brand}</div>
                    <div className="text-sm text-muted-foreground">{campaign.campaign}</div>
                  </div>
                </div>
                <PrimaryButton href={`/creator/campaigns/campaign-${index + 1}`}>View workspace</PrimaryButton>
              </div>
              <div className="mt-5">
                <ProgressTrack progress={campaign.progress} />
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
