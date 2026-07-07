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

          <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
            <div className="rounded-[1.35rem] bg-surface p-4">
              Create a short-form campaign showcasing a summer skincare routine with a strong product-first hook and a clean, educational tone.
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.35rem] border border-border p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Deliverables</div>
                <div className="mt-2 font-semibold text-foreground">1 Instagram reel, 3 story frames</div>
              </div>
              <div className="rounded-[1.35rem] border border-border p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Budget</div>
                <div className="mt-2 font-semibold text-foreground">INR 35,000 fixed</div>
              </div>
              <div className="rounded-[1.35rem] border border-border p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Deadline</div>
                <div className="mt-2 font-semibold text-foreground">Draft by May 16, publish by May 20</div>
              </div>
              <div className="rounded-[1.35rem] border border-border p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Usage rights</div>
                <div className="mt-2 font-semibold text-foreground">Organic repost for 30 days</div>
              </div>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelTitle eyebrow="Actions" title="Respond to this invite" description="Accept if the scope, rate, and timeline are right for you." />
          <div className="mt-5 space-y-3">
            <button
              type="button"
            className="w-full rounded-[1rem] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-4 py-3 text-sm font-semibold text-accent-foreground shadow-glow"
          >
            Accept invite
          </button>
            <button type="button" className="w-full rounded-[1rem] border border-border px-4 py-3 text-sm font-semibold text-accent">
              Decline invite
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
