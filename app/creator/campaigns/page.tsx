import { activeCampaigns } from "../creator-data";
import { BrandAvatar, Panel, PanelTitle, ProgressTrack } from "../creator-ui";

export default function CreatorCampaignsPage() {
  return (
    <div className="space-y-6">
      <Panel>
        <PanelTitle eyebrow="Campaign tracker" title="All current creator campaigns" />

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {activeCampaigns.map((campaign) => (
            <article key={campaign.brand} className="rounded-[1.7rem] border border-border bg-surface p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <BrandAvatar name={campaign.brand} accent={campaign.brand === "Mamaearth" ? "var(--success)" : "var(--info)"} />
                  <div>
                    <div className="text-lg font-semibold tracking-[-0.04em] text-foreground">{campaign.brand}</div>
                    <div className="text-sm text-muted-foreground">{campaign.campaign}</div>
                  </div>
                </div>
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
