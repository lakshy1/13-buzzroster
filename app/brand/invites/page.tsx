import { discoverCreators } from "../brand-data";
import { BrandAvatar, DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../brand-ui";

export default function BrandInvitesPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Brand invites"
        title="Track every invite sent to creators."
        description="Monitor which creators have accepted, rejected, or not yet responded to campaign invites."
        action={
          <>
            <SecondaryButton href="/brand/discover-creators">Back to discovery</SecondaryButton>
            <PrimaryButton href="/brand/invites/create">Create invite</PrimaryButton>
          </>
        }
      />

      <div className="flex flex-wrap gap-3">
        {["All", "Pending", "Accepted", "Rejected", "Expired"].map((tab, index) => (
          <div
            key={tab}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${index === 0 ? "bg-accent text-accent-foreground" : "border border-border bg-surface text-muted-foreground"}`}
          >
            {tab}
          </div>
        ))}
      </div>

      <Panel>
        <PanelTitle eyebrow="Invite tracker" title="Invites sent" description="Status visibility across creators, campaigns, and response deadlines." />
        <div className="mt-5 space-y-3">
          {discoverCreators.map((creator) => (
            <div key={creator.name} className="flex flex-col gap-4 rounded-[1.35rem] border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <BrandAvatar name={creator.name} accent={creator.accent} />
                <div>
                  <div className="text-sm font-semibold text-foreground">{creator.name}</div>
                  <div className="text-sm text-muted-foreground">Summer Glow Launch</div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span>INR 28,000 offer</span>
                <span>Deadline May 18</span>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">Pending</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
