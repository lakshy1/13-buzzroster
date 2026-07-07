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
        <Panel className="overflow-hidden p-0">
          <div className="border-b border-border p-5">
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
                  index === 0 ? "bg-accent-soft" : "hover:bg-surface-muted"
                }`}
              >
                <BrandAvatar name={message.brand} accent="var(--accent)" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-foreground">{message.brand}</span>
                    <span className="text-xs text-muted-foreground">{message.time}</span>
                  </div>
                  <div className="mt-1 truncate text-sm text-muted-foreground">{message.text}</div>
                </div>
                {message.unread ? (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-accent px-2 text-xs font-semibold text-accent-foreground">
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
            action={<span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Online</span>}
          />

          <div className="mt-6 space-y-4">
            <div className="max-w-[34rem] rounded-[1.35rem] bg-surface px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Plum Goodness</div>
              <div className="mt-2 text-sm leading-6 text-foreground">
                Just checking in on the content delivery timeline. Are we still on track for the May 16 submission?
              </div>
            </div>

            <div className="ml-auto max-w-[34rem] rounded-[1.35rem] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-4 py-3 text-accent-foreground">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground/70">You</div>
              <div className="mt-2 text-sm leading-6">
                Yes, the reel cut is ready. I am polishing captions and will upload the draft by tonight so your team has buffer before review.
              </div>
            </div>

            <div className="max-w-[34rem] rounded-[1.35rem] bg-surface px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Plum Goodness</div>
              <div className="mt-2 text-sm leading-6 text-foreground">
                Perfect. Once it is uploaded, please also share the alternate thumbnail option we discussed for stories.
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[1.4rem] border border-border bg-surface p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Draft reply</div>
            <div className="mt-3 min-h-28 rounded-[1.2rem] bg-background p-4 text-sm leading-6 text-muted-foreground">
              The updated draft and thumbnail options are ready to review. I will upload both versions in the next few hours.
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-[1rem] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-glow"
              >
                Send message
              </button>
              <button type="button" className="rounded-[1rem] border border-border px-4 py-2.5 text-sm font-semibold text-accent">
                Save draft
              </button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
