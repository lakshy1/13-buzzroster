import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../../brand-ui";

export default async function BrandCreatorProfilePage({
  params,
}: {
  params: Promise<{ creatorId: string }>;
}) {
  const { creatorId } = await params;

  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Creator profile"
        title="Evaluate a creator from the brand perspective."
        description={`Creator reference: ${creatorId}. Review audience fit, content proof, rates, availability, and collaboration history before sending an invite.`}
        action={
          <>
            <SecondaryButton href="/brand/discover-creators">Back to search</SecondaryButton>
            <PrimaryButton href="/brand/invites/create">Send invite</PrimaryButton>
          </>
        }
      />
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)]">
        <Panel>
          <PanelTitle eyebrow="Profile overview" title="Lakshya Sharma" description="Beauty and skincare creator with strong campaign completion and audience engagement." />
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {["Followers 573K", "Engagement 5.4%", "Location Delhi", "Availability Open"].map((item) => (
              <div key={item} className="rounded-[1.25rem] bg-[#fbfaff] px-4 py-4 text-sm font-medium text-[#4f4a67]">
                {item}
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelTitle eyebrow="Brand actions" title="Decision shortcuts" description="Quick next steps if this creator fits your campaign." />
          <div className="mt-5 space-y-3">
            {["Send invite", "Save creator", "Compare rates", "Open message thread"].map((item) => (
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
