import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../../creator-ui";

export default async function CreatorCampaignWorkspacePage({
  params,
}: {
  params: Promise<{ campaignId: string }>;
}) {
  const { campaignId } = await params;

  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Campaign workspace"
        title="Collaborate, submit, and track feedback."
        description={`Campaign reference: ${campaignId}. This page works as the creator delivery workspace for one live collaboration.`}
        action={
          <>
            <SecondaryButton href="/creator/campaigns">Back to campaigns</SecondaryButton>
            <PrimaryButton href="/creator/messages">Open chat</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.85fr)]">
        <Panel>
          <PanelTitle eyebrow="Brief" title="Monsoon Skincare Picks" description="Everything needed to execute the collaboration cleanly." />
          <div className="mt-5 grid gap-4">
            {[
              "Campaign brief and positioning",
              "Deliverables checklist",
              "Upload content section",
              "Brand feedback area",
              "Timeline milestones",
            ].map((item) => (
              <div key={item} className="rounded-[1.3rem] bg-[#fbfaff] px-4 py-4 text-sm font-medium text-[#4f4a67]">
                {item}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle eyebrow="Actions" title="Progress and payments" description="Quick visibility into the operational state of the campaign." />
          <div className="mt-5 space-y-3">
            {[
              { label: "Stage", value: "Review in progress" },
              { label: "Deadline", value: "May 16" },
              { label: "Payment", value: "INR 28,500 pending" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.25rem] border border-[#f0ebfa] px-4 py-3">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#8f88a8]">{item.label}</div>
                <div className="mt-2 font-semibold text-[#1d1b32]">{item.value}</div>
              </div>
            ))}
            <button
              type="button"
              className="w-full rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(91,61,215,0.18)]"
            >
              Submit content
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
