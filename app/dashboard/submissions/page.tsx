import { attentionItems } from "../dashboard-data";
import { BrandAvatar, DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton, StatusPill } from "../dashboard-ui";

export default function SubmissionsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Submissions"
        title="Track drafts, revisions, and approvals clearly."
        description="This page focuses on content handoff so you always know what is under review, what needs changes, and what is already approved."
        action={
          <>
            <SecondaryButton href="/dashboard/active-campaigns">Open campaigns</SecondaryButton>
            <PrimaryButton href="/dashboard/messages">Send update</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Under review", value: "4", note: "Waiting for brand sign-off" },
          { label: "Needs revision", value: "2", note: "Feedback received today" },
          { label: "Approved", value: "11", note: "Ready for posting or payout" },
          { label: "Turnaround", value: "1.8 days", note: "Average review cycle" },
        ].map((item) => (
          <Panel key={item.label} className="p-5">
            <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
            <div className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-foreground">{item.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{item.note}</div>
          </Panel>
        ))}
      </div>

      <Panel>
        <PanelTitle
          eyebrow="Submission queue"
          title="Current items needing movement"
          description="A focused review list built around content status and next action."
        />

        <div className="mt-5 space-y-4">
          {attentionItems.map((item) => (
            <div
              key={item.brand}
              className="flex flex-col gap-4 rounded-[1.6rem] border border-border bg-surface p-4 lg:flex-row lg:items-center lg:justify-between"
            >
              <div className="flex min-w-0 items-center gap-4">
                <BrandAvatar
                  name={item.brand}
                  accent={item.statusTone === "orange" ? "var(--warning)" : item.statusTone === "blue" ? "var(--info)" : "var(--accent)"}
                />
                <div className="min-w-0">
                  <div className="text-lg font-semibold tracking-[-0.04em] text-foreground">{item.brand}</div>
                  <div className="truncate text-sm text-muted-foreground">{item.campaign}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <StatusPill tone={item.statusTone}>{item.status}</StatusPill>
                <span className="text-sm text-muted-foreground">{item.deadline}</span>
                <button
                  type="button"
                  className="rounded-[1rem] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-glow"
                >
                  {item.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <PanelTitle
            eyebrow="Revision notes"
            title="Latest feedback coming from brands"
            description="Keep comments centralized so revision work stays fast and consistent."
          />

          <div className="mt-5 space-y-3">
            {[
              { brand: "Mamaearth", note: "Please tighten the opening hook in the first 3 seconds.", tone: "bg-warning/10 text-warning" },
              { brand: "Plum Goodness", note: "Can you add one close-up product shot before the final CTA?", tone: "bg-accent-soft text-accent" },
              { brand: "Dot & Key", note: "Approved overall. Only the caption needs one line updated.", tone: "bg-success/10 text-success" },
            ].map((item) => (
              <div key={item.note} className="rounded-[1.3rem] border border-border p-4">
                <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>{item.brand}</div>
                <div className="mt-3 text-sm leading-6 text-muted-foreground">{item.note}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Approval playbook"
            title="Reduce revision loops"
            description="A few predictable habits make brand approvals noticeably smoother."
          />

          <div className="mt-5 space-y-3">
            {[
              "Send draft context along with the asset, not after.",
              "Call out what changed between revision versions.",
              "Confirm whether the review is for structure, visual edits, or compliance.",
              "Ask for consolidated comments before starting another pass.",
            ].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-surface px-4 py-3 text-sm leading-6 text-foreground">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
