import { inviteCards } from "../creator-data";
import { BrandAvatar, DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../creator-ui";

export default function CreatorInvitesPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Creator invites"
        title="Review every brand opportunity carefully."
        description="Compare briefs, payout, deliverables, and timelines before accepting a collaboration."
        action={
          <>
            <SecondaryButton href="/creator/dashboard">Back to dashboard</SecondaryButton>
            <PrimaryButton href="/creator/profile">Improve match score</PrimaryButton>
          </>
        }
      />

      <div className="flex flex-wrap gap-3">
        {["All", "Pending", "Accepted", "Rejected", "Expired"].map((tab, index) => (
          <div
            key={tab}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${index === 0 ? "bg-[#6d44ec] text-white" : "border border-[#e6ddfb] bg-white text-[#5f5977]"}`}
          >
            {tab}
          </div>
        ))}
      </div>

      <Panel>
        <PanelTitle
          eyebrow="Opportunity board"
          title="Invites received from brands"
          description="Each card gives you the essential details to decide quickly."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {inviteCards.map((invite, index) => (
            <article
              key={invite.brand}
              className="rounded-[1.7rem] border border-[#f0ebfa] bg-[linear-gradient(180deg,#ffffff_0%,#fbf9ff_100%)] p-4 shadow-[0_14px_32px_rgba(114,84,242,0.06)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <BrandAvatar name={invite.brand} accent={invite.accent} />
                  <div>
                    <div className="text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">{invite.brand}</div>
                    <div className="text-sm text-[#6f6985]">{invite.campaign}</div>
                  </div>
                </div>
                <span className="rounded-full bg-[#eef8f3] px-3 py-1 text-xs font-semibold text-[#2ea661]">{invite.fit}</span>
              </div>

              <div className="mt-4 inline-flex rounded-full bg-[#f4efff] px-3 py-1 text-xs font-semibold text-[#7a51f4]">
                {invite.niche}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 rounded-[1.25rem] bg-[#fbfaff] p-3">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#8f88a8]">Budget</div>
                  <div className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#201d34]">{invite.payout}</div>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#8f88a8]">Deliverables</div>
                  <div className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#201d34]">{invite.deliverables}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <SecondaryButton href={`/creator/invites/invite-${index + 1}`}>View details</SecondaryButton>
                <button type="button" className="rounded-[1rem] border border-[#dfd2fb] px-3 py-2.5 text-sm font-semibold text-[#6d44ec]">
                  Decline
                </button>
                <button
                  type="button"
                  className="rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-3 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(91,61,215,0.18)]"
                >
                  Accept
                </button>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
