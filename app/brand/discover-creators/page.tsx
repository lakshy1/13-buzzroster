import { discoverCreators } from "../brand-data";
import { BrandAvatar, DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../brand-ui";

export default function DiscoverCreatorsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Discover creators"
        title="Search creators with better filters and proof."
        description="Find creators by niche, location, followers, engagement, platform, budget, language, and availability."
        action={
          <>
            <SecondaryButton href="/brand/dashboard">Back to dashboard</SecondaryButton>
            <PrimaryButton href="/brand/invites/create">Send invite</PrimaryButton>
          </>
        }
      />
      <Panel>
        <PanelTitle eyebrow="Filters" title="Refine your search" description="For MVP this is a static filter surface aligned to future search behavior." />
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {["Niche", "Location", "Followers", "Engagement rate", "Platform", "Budget range", "Language", "Availability"].map((field) => (
            <label key={field} className="space-y-2">
              <span className="text-sm font-medium text-[#4d4963]">{field}</span>
              <input className="h-11 w-full rounded-2xl border border-[#e7e0f8] bg-white/92 px-4 text-sm text-[#1f1d31] outline-none" />
            </label>
          ))}
        </div>
      </Panel>
      <Panel>
        <PanelTitle eyebrow="Results" title="Suggested creators" description="Creator cards with enough decision context to open a full profile or send an invite." />
        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          {discoverCreators.map((creator) => (
            <article key={creator.name} className="rounded-[1.6rem] border border-[#f0ebfa] bg-[#fbfaff] p-4">
              <div className="flex items-center gap-3">
                <BrandAvatar name={creator.name} accent={creator.accent} />
                <div>
                  <div className="text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">{creator.name}</div>
                  <div className="text-sm text-[#6f6985]">{creator.niche}</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[#5f5977]">
                <div>{creator.followers}</div>
                <div>{creator.engagement}</div>
                <div>{creator.location}</div>
                <div>Available</div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <SecondaryButton href="/brand/creators/creator-lakshya">View profile</SecondaryButton>
                <PrimaryButton href="/brand/invites/create">Send invite</PrimaryButton>
              </div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
