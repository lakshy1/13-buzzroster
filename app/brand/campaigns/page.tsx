import { brandCampaigns } from "../brand-data";
import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../brand-ui";

export default function BrandCampaignsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Brand campaigns"
        title="Plan and manage every campaign lifecycle."
        description="Draft, launch, pause, and review campaigns with creator participation and timeline visibility in one place."
        action={
          <>
            <SecondaryButton href="/brand/dashboard">Back to dashboard</SecondaryButton>
            <PrimaryButton href="/brand/campaigns/create">Create new campaign</PrimaryButton>
          </>
        }
      />

      <div className="flex flex-wrap gap-3">
        {["Drafts", "Active", "Paused", "Completed", "Archived"].map((tab, index) => (
          <div
            key={tab}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${index === 1 ? "bg-[#6d44ec] text-white" : "border border-[#e6ddfb] bg-white text-[#5f5977]"}`}
          >
            {tab}
          </div>
        ))}
      </div>

      <Panel>
        <PanelTitle eyebrow="Campaign library" title="All campaigns" description="Track invited creators, accepted creators, budget, and status per campaign." />
        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {brandCampaigns.map((campaign, index) => (
            <article key={campaign.title} className="rounded-[1.6rem] border border-[#f0ebfa] bg-[#fbfaff] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">{campaign.title}</div>
                  <div className="mt-1 text-sm text-[#6f6985]">{campaign.objective}</div>
                </div>
                <PrimaryButton href={`/brand/campaigns/campaign-${index + 1}`}>View</PrimaryButton>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-4 text-sm text-[#5f5977]">
                <div>{campaign.budget}</div>
                <div>{campaign.invited}</div>
                <div>{campaign.accepted}</div>
                <div>{campaign.status}</div>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
