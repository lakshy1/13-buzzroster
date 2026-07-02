import { brandCampaigns, brandMetrics, discoverCreators } from "../brand-data";
import { BrandAvatar, DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton, SummaryCard } from "../brand-ui";

export default function BrandDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Brand dashboard"
        title="Manage creator campaigns with clarity."
        description="Track campaigns, creator discovery, invite responses, and spend from one modern brand workspace."
        action={
          <>
            <SecondaryButton href="/brand/discover-creators">Discover creators</SecondaryButton>
            <PrimaryButton href="/brand/campaigns/create">Create campaign</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-4">
        {brandMetrics.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.9fr)]">
        <Panel>
          <PanelTitle eyebrow="Recent campaigns" title="Current campaign pipeline" description="A fast snapshot of live and draft campaigns." />
          <div className="mt-5 space-y-3">
            {brandCampaigns.map((campaign, index) => (
              <div key={campaign.title} className="rounded-[1.35rem] border border-[#f0ebfa] bg-[#fbfaff] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">{campaign.title}</div>
                    <div className="mt-1 text-sm text-[#6f6985]">{campaign.objective}</div>
                  </div>
                  <PrimaryButton href={`/brand/campaigns/campaign-${index + 1}`}>Open campaign</PrimaryButton>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-4 text-sm text-[#5f5977]">
                  <div>{campaign.budget}</div>
                  <div>{campaign.invited}</div>
                  <div>{campaign.accepted}</div>
                  <div>{campaign.status}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle eyebrow="Creator recommendations" title="Suggested creators" description="Profiles that match your recent campaign goals." />
          <div className="mt-5 space-y-3">
            {discoverCreators.map((creator) => (
              <div key={creator.name} className="flex items-center justify-between gap-3 rounded-[1.3rem] bg-[#fbfaff] p-4">
                <div className="flex items-center gap-3">
                  <BrandAvatar name={creator.name} accent={creator.accent} />
                  <div>
                    <div className="text-sm font-semibold text-[#1d1b32]">{creator.name}</div>
                    <div className="text-sm text-[#6f6985]">{creator.niche}</div>
                  </div>
                </div>
                <SecondaryButton href="/brand/creators/creator-lakshya">View</SecondaryButton>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
