import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../../creator-ui";

export default async function CreatorInviteDetailsPage({
  params,
}: {
  params: Promise<{ inviteId: string }>;
}) {
  const { inviteId } = await params;

  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Invite details"
        title="Review the full campaign before you commit."
        description={`Invite reference: ${inviteId}. This page gives creators the campaign brief, payout terms, deliverables, and usage expectations in one place.`}
        action={
          <>
            <SecondaryButton href="/creator/invites">Back to invites</SecondaryButton>
            <PrimaryButton href="/creator/messages">Message brand</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.85fr)]">
        <Panel>
          <PanelTitle
            eyebrow="Campaign brief"
            title="Summer Glow Campaign"
            description="A detailed creator-facing breakdown of the collaboration scope."
          />

          <div className="mt-5 space-y-4 text-sm leading-7 text-[#5f5977]">
            <div className="rounded-[1.35rem] bg-[#fbfaff] p-4">
              Create a short-form campaign showcasing a summer skincare routine with a strong product-first hook and a clean, educational tone.
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.35rem] border border-[#f0ebfa] p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#8f88a8]">Deliverables</div>
                <div className="mt-2 font-semibold text-[#1d1b32]">1 Instagram reel, 3 story frames</div>
              </div>
              <div className="rounded-[1.35rem] border border-[#f0ebfa] p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#8f88a8]">Budget</div>
                <div className="mt-2 font-semibold text-[#1d1b32]">INR 35,000 fixed</div>
              </div>
              <div className="rounded-[1.35rem] border border-[#f0ebfa] p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#8f88a8]">Deadline</div>
                <div className="mt-2 font-semibold text-[#1d1b32]">Draft by May 16, publish by May 20</div>
              </div>
              <div className="rounded-[1.35rem] border border-[#f0ebfa] p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#8f88a8]">Usage rights</div>
                <div className="mt-2 font-semibold text-[#1d1b32]">Organic repost for 30 days</div>
              </div>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelTitle eyebrow="Actions" title="Respond to this invite" description="Accept if the scope, rate, and timeline are right for you." />
          <div className="mt-5 space-y-3">
            <button
              type="button"
              className="w-full rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(91,61,215,0.18)]"
            >
              Accept invite
            </button>
            <button type="button" className="w-full rounded-[1rem] border border-[#dfd2fb] px-4 py-3 text-sm font-semibold text-[#6d44ec]">
              Decline invite
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
