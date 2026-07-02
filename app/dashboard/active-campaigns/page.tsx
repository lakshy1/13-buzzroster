import { activeCampaigns } from "../dashboard-data";
import { BrandAvatar, DashboardHeader, Panel, PanelTitle, PrimaryButton, ProgressTrack, SecondaryButton } from "../dashboard-ui";

export default function ActiveCampaignsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Active campaigns"
        title="Stay on top of every live collaboration."
        description="See stage-by-stage progress, upcoming deliverables, and what needs a faster response before it becomes a bottleneck."
        action={
          <>
            <SecondaryButton href="/dashboard/submissions">Review submissions</SecondaryButton>
            <PrimaryButton href="/dashboard/messages">Message brands</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Live campaigns", value: "5", note: "3 in review right now" },
          { label: "Due this week", value: "2", note: "One story set, one reel" },
          { label: "Pending approvals", value: "4", note: "Waiting on brand feedback" },
          { label: "On-time rate", value: "96%", note: "Strong delivery consistency" },
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
          eyebrow="Campaign tracker"
          title="Progress across all live work"
          description="Each collaboration shows exactly where it sits, so nothing gets lost between content, review, approval, and payout."
        />

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          {activeCampaigns.map((campaign) => (
            <article key={campaign.brand} className="rounded-[1.7rem] border border-[#f0ebfa] bg-[#fcfbff] p-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <BrandAvatar name={campaign.brand} accent={campaign.brand === "Mamaearth" ? "#22b38b" : "#2556d9"} />
                  <div>
                    <div className="text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">{campaign.brand}</div>
                    <div className="text-sm text-[#6f6985]">{campaign.campaign}</div>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(91,61,215,0.18)]"
                >
                  View progress
                </button>
              </div>
              <div className="mt-5">
                <ProgressTrack progress={campaign.progress} />
              </div>
            </article>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <Panel>
          <PanelTitle
            eyebrow="Upcoming deliverables"
            title="This week at a glance"
            description="The next tasks most likely to affect your timeline."
          />

          <div className="mt-5 space-y-3">
            {[
              { title: "Plum Goodness - Reel delivery", meta: "Due May 16 at 6:00 PM", status: "Ready for final polish" },
              { title: "Dot & Key - Story sequence", meta: "Draft due May 18", status: "Awaiting product shots" },
              { title: "Mamaearth - Revision upload", meta: "Needed by May 19", status: "Feedback received" },
            ].map((item) => (
              <div key={item.title} className="rounded-[1.3rem] bg-[#fbfaff] p-4">
                <div className="text-base font-semibold tracking-[-0.03em] text-[#1d1b32]">{item.title}</div>
                <div className="mt-1 text-sm text-[#6f6985]">{item.meta}</div>
                <div className="mt-3 inline-flex rounded-full bg-[#f4efff] px-3 py-1 text-xs font-semibold text-[#7a51f4]">{item.status}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Workflow hygiene"
            title="How to keep campaigns smooth"
            description="A compact operational checklist for reducing revision loops."
          />

          <div className="mt-5 space-y-3">
            {[
              "Lock the shot list before filming.",
              "Share thumbnails or references earlier in the process.",
              "Keep one source of truth for brand comments.",
              "Send a short status update before each deadline.",
            ].map((item) => (
              <div key={item} className="rounded-[1.2rem] border border-[#f0ebfa] px-4 py-3 text-sm leading-6 text-[#4f4a67]">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
