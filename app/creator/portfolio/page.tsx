import { creatorShowcase } from "../creator-data";
import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../creator-ui";

export default function CreatorPortfolioPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Creator portfolio"
        title="Show your best work like a premium media kit."
        description="This page helps creators present content samples, campaign case studies, testimonials, and proof that improves invite conversion."
        action={
          <>
            <SecondaryButton href="/creator/profile">View profile</SecondaryButton>
            <PrimaryButton href="/creator/invites">See opportunities</PrimaryButton>
          </>
        }
      />

      <Panel>
        <PanelTitle
          eyebrow="Featured work"
          title="Content and case studies"
          description="Use this space to surface your strongest work across platforms and collaboration types."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {creatorShowcase.map((item) => (
            <article key={item.title} className="rounded-[1.6rem] border border-[#f0ebfa] bg-[#fbfaff] p-4">
              <div className="rounded-full bg-[#f4efff] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a51f4]">
                {item.type}
              </div>
              <div className="mt-4 text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">{item.title}</div>
              <div className="mt-2 text-sm text-[#6f6985]">{item.value}</div>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
