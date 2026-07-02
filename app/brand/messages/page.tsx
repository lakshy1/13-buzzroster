import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../brand-ui";

export default function BrandMessagesPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Brand messages"
        title="Keep creator communication centralized."
        description="Discuss deliverables, review feedback, and campaign coordination without scattered threads."
        action={
          <>
            <SecondaryButton href="/brand/campaigns">Campaign view</SecondaryButton>
            <PrimaryButton href="/brand/invites/create">New invite</PrimaryButton>
          </>
        }
      />
      <div className="grid gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Panel className="p-0 overflow-hidden">
          <div className="border-b border-[#efe8fb] p-5">
            <PanelTitle eyebrow="Conversations" title="Creator inbox" description="Threads grouped by creator and campaign context." />
          </div>
          <div className="space-y-1 p-3">
            {["Lakshya Sharma", "Sana Qureshi", "Aarav Jain"].map((name, index) => (
              <button key={name} type="button" className={`w-full rounded-[1.35rem] px-4 py-3 text-left ${index === 0 ? "bg-[#f6f0ff]" : "hover:bg-[#fbfaff]"}`}>
                <div className="text-sm font-semibold text-[#26233a]">{name}</div>
                <div className="mt-1 text-sm text-[#6f6985]">Latest campaign feedback and timing updates.</div>
              </button>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelTitle eyebrow="Thread" title="Lakshya Sharma" description="Summer Glow Launch" />
          <div className="mt-6 space-y-4">
            <div className="max-w-[34rem] rounded-[1.35rem] bg-[#fbfaff] px-4 py-3 text-sm leading-6 text-[#4f4a67]">Can you deliver the first draft by Friday evening?</div>
            <div className="ml-auto max-w-[34rem] rounded-[1.35rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-sm leading-6 text-white">Yes, I will upload the first cut by Friday so your team has time for review.</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
