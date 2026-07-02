import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../../brand-ui";

export default async function BrandCampaignDetailsPage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Campaign details"
        title="View creator participation and campaign performance."
        description={`Campaign reference: ${campaignId}. Manage invited creators, submissions, review status, and outcome metrics from one campaign view.`}
        action={
          <>
            <SecondaryButton href="/brand/campaigns">Back to campaigns</SecondaryButton>
            <PrimaryButton href="/brand/invites/create">Send invite</PrimaryButton>
          </>
        }
      />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.85fr)]">
        <Panel>
          <PanelTitle eyebrow="Overview" title="Summer Glow Launch" description="Campaign details, deliverables, and creator participation." />
          <div className="mt-5 space-y-3">
            {["Invited creators", "Accepted creators", "Submitted content", "Review queue", "Performance preview"].map((item) => (
              <div key={item} className="rounded-[1.25rem] bg-[#fbfaff] px-4 py-4 text-sm font-medium text-[#4f4a67]">
                {item}
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelTitle eyebrow="Quick actions" title="Manage this campaign" description="Fast controls for the most common brand actions." />
          <div className="mt-5 space-y-3">
            {["Edit campaign", "Pause campaign", "Review submissions", "Export report"].map((item) => (
              <button key={item} type="button" className="w-full rounded-[1rem] border border-[#dfd2fb] px-4 py-3 text-left text-sm font-semibold text-[#6d44ec]">
                {item}
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
