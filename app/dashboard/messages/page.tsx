import { messages } from "../dashboard-data";
import { BrandAvatar, DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../dashboard-ui";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Messages"
        title="Keep brand conversations in one organized inbox."
        description="Follow timelines, approvals, and quick asks without context switching across email, chat apps, and scattered threads."
        action={
          <>
            <SecondaryButton href="/creator/campaigns">Campaign view</SecondaryButton>
            <PrimaryButton href="/creator/campaigns/campaign-1">Share status update</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Panel className="p-0 overflow-hidden">
          <div className="border-b border-[#efe8fb] p-5">
            <PanelTitle
              eyebrow="Inbox"
              title="Recent conversations"
              description="Prioritize unread threads and time-sensitive campaign communication."
            />
          </div>

          <div className="space-y-1 p-3">
            {messages.map((message, index) => (
              <button
                key={message.brand}
                type="button"
                className={`flex w-full items-start gap-3 rounded-[1.35rem] px-3 py-3 text-left transition-colors ${
                  index === 0 ? "bg-[#f6f0ff]" : "hover:bg-[#fbfaff]"
                }`}
              >
                <BrandAvatar name={message.brand} accent="#7a51f4" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[#26233a]">{message.brand}</span>
                    <span className="text-xs text-[#7a7590]">{message.time}</span>
                  </div>
                  <div className="mt-1 truncate text-sm text-[#6f6985]">{message.text}</div>
                </div>
                {message.unread ? (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#6d44ec] px-2 text-xs font-semibold text-white">
                    {message.unread}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Conversation"
            title="Plum Goodness"
            description="Monsoon Skincare Picks campaign"
            action={<span className="rounded-full bg-[#eef8f3] px-3 py-1 text-xs font-semibold text-[#2ea661]">Online</span>}
          />

          <div className="mt-6 space-y-4">
            <div className="max-w-[34rem] rounded-[1.35rem] bg-[#fbfaff] px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f88a8]">Plum Goodness</div>
              <div className="mt-2 text-sm leading-6 text-[#4f4a67]">
                Just checking in on the content delivery timeline. Are we still on track for the May 16 submission?
              </div>
            </div>

            <div className="ml-auto max-w-[34rem] rounded-[1.35rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-white">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">You</div>
              <div className="mt-2 text-sm leading-6">
                Yes, the reel cut is ready. I am polishing captions and will upload the draft by tonight so your team has buffer before review.
              </div>
            </div>

            <div className="max-w-[34rem] rounded-[1.35rem] bg-[#fbfaff] px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f88a8]">Plum Goodness</div>
              <div className="mt-2 text-sm leading-6 text-[#4f4a67]">
                Perfect. Once it is uploaded, please also share the alternate thumbnail option we discussed for stories.
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[1.4rem] border border-[#efe8fb] bg-[#fbfaff] p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8f88a8]">Draft reply</div>
            <div className="mt-3 min-h-28 rounded-[1.2rem] bg-white p-4 text-sm leading-6 text-[#6f6985]">
              The updated draft and thumbnail options are ready to review. I will upload both versions in the next few hours.
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(91,61,215,0.18)]"
              >
                Send message
              </button>
              <button type="button" className="rounded-[1rem] border border-[#dfd2fb] px-4 py-2.5 text-sm font-semibold text-[#6d44ec]">
                Save draft
              </button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
