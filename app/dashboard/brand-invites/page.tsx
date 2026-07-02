import { inviteCards } from "../dashboard-data";
import { BrandAvatar, DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../dashboard-ui";

export default function BrandInvitesPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Brand invites"
        title="Review every opportunity with more confidence."
        description="Compare payout, campaign scope, fit score, and timing before you commit. This page turns invite review into a calm decision flow."
        action={
          <>
            <SecondaryButton href="/dashboard">Back to overview</SecondaryButton>
            <PrimaryButton href="/dashboard/profile">Improve match score</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Open invites", value: "12", note: "4 need a response this week" },
          { label: "High-fit invites", value: "7", note: "Above 85 percent match" },
          { label: "Potential pipeline", value: "INR 2.4L", note: "Across all current invites" },
        ].map((item) => (
          <Panel key={item.label} className="p-5">
            <div className="text-sm font-medium text-[#66617c]">{item.label}</div>
            <div className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">{item.value}</div>
            <div className="mt-2 text-sm text-[#6f6985]">{item.note}</div>
          </Panel>
        ))}
      </div>

      <Panel>
        <PanelTitle
          eyebrow="Opportunity board"
          title="Top invites waiting for your decision"
          description="The strongest brand opportunities based on payout, timeline, and how well they match your niche."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {inviteCards.map((invite) => (
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
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#8f88a8]">Payout</div>
                  <div className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#201d34]">{invite.payout}</div>
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.16em] text-[#8f88a8]">Deliverables</div>
                  <div className="mt-1 text-lg font-semibold tracking-[-0.04em] text-[#201d34]">{invite.deliverables}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button type="button" className="rounded-[1rem] border border-[#dfd2fb] px-4 py-2.5 text-sm font-semibold text-[#6d44ec]">
                  View brief
                </button>
                <button
                  type="button"
                  className="rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(91,61,215,0.18)]"
                >
                  Accept
                </button>
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <PanelTitle
            eyebrow="Decision support"
            title="How to prioritize invites"
            description="Use a simple review lens before accepting: audience fit, content effort, timeline pressure, and repeat potential."
          />

          <div className="mt-5 space-y-3">
            {[
              "Choose campaigns with a strong audience overlap first.",
              "Protect your calendar by declining tight deadlines early.",
              "Favor brands with clear briefs and fewer approval rounds.",
              "Use your worth score as a pricing guardrail, not just a number.",
            ].map((tip) => (
              <div key={tip} className="rounded-[1.2rem] bg-[#fbfaff] px-4 py-3 text-sm leading-6 text-[#4f4a67]">
                {tip}
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Invite pipeline"
            title="Current response stages"
            description="A quick sense of how many opportunities are active at each step."
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Needs response", value: "5", tone: "bg-[#f4efff] text-[#7a51f4]" },
              { label: "Negotiating scope", value: "3", tone: "bg-[#fff0e4] text-[#f07b3b]" },
              { label: "Approved by you", value: "2", tone: "bg-[#eef8f3] text-[#2ea661]" },
              { label: "Awaiting contract", value: "2", tone: "bg-[#edf4ff] text-[#3b74ef]" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.35rem] border border-[#f0ebfa] p-4">
                <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>{item.label}</div>
                <div className="mt-4 text-[1.9rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">{item.value}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
