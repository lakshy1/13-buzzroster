import Link from "next/link";

import {
  attentionItems,
  calendarItems,
  dashboardDestinations,
  metricCards,
  profileChecklist,
} from "../creator-data";
import {
  BrandAvatar,
  DashboardHeader,
  Panel,
  PanelTitle,
  PrimaryButton,
  ProfileRing,
  SecondaryButton,
  StatusPill,
  SummaryCard,
} from "../creator-ui";

export default function CreatorDashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Dashboard overview"
        title="Your creator business, organized."
        description="See invites, campaigns, profile readiness, and upcoming deadlines in one clear creator home."
        action={
          <>
            <SecondaryButton href="/creator/profile">View profile</SecondaryButton>
            <PrimaryButton href="/creator/invites">Review invites</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-4 xl:grid-cols-4">
        {metricCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.95fr)]">
        <Panel>
          <PanelTitle
            eyebrow="Needs your attention"
            title="Priority actions"
            description="The fastest way to clear blockers and keep collaboration momentum."
            action={<SecondaryButton href="/creator/campaigns">Open campaigns</SecondaryButton>}
          />

          <div className="mt-5 space-y-4">
            {attentionItems.map((item, index) => (
              <div
                key={item.brand}
                className="flex flex-col gap-4 rounded-[1.6rem] border border-[#f1ebfb] bg-[#fcfbff] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <BrandAvatar
                    name={item.brand}
                    accent={item.statusTone === "orange" ? "#f07b3b" : item.statusTone === "blue" ? "#4b7df1" : "#7a51f4"}
                  />
                  <div className="min-w-0">
                    <div className="text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">{item.brand}</div>
                    <div className="truncate text-sm text-[#6f6985]">{item.campaign}</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                  <StatusPill tone={item.statusTone}>{item.status}</StatusPill>
                  <span className="text-sm text-[#6f6985]">{item.deadline}</span>
                  <PrimaryButton href={index === 0 ? "/creator/invites/invite-skinsi" : "/creator/campaigns/campaign-plum"}>
                    {item.action}
                  </PrimaryButton>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Profile strength"
            title="Strong and almost complete"
            description="A polished profile leads to better discovery and higher-fit invites."
          />

          <div className="mt-4 flex flex-col items-center gap-5 xl:flex-row xl:items-center xl:justify-between">
            <ProfileRing />
            <div className="w-full space-y-3">
              {profileChecklist.map((item) => (
                <div key={item.label} className="flex items-center gap-3 rounded-[1rem] bg-[#fbfaff] px-3 py-2.5">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      item.done ? "bg-[#e7f8ec] text-[#28a153]" : "bg-[#f2edf8] text-[#8f88a8]"
                    }`}
                  >
                    {item.done ? "OK" : "--"}
                  </span>
                  <span className="text-sm font-medium text-[#4f4a67]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelTitle
          eyebrow="Creator workspace"
          title="Your main creator pages"
          description="Each core workflow lives in its own focused route so the product feels structured and scalable."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboardDestinations.map((destination) => (
            <Link
              key={destination.title}
              href={destination.href}
              className="rounded-[1.65rem] border border-[#f0ebfa] bg-[linear-gradient(180deg,#ffffff_0%,#fbf9ff_100%)] p-5 shadow-[0_14px_32px_rgba(114,84,242,0.06)] transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7a51f4]">Open page</div>
              <div className="mt-3 text-[1.35rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">{destination.title}</div>
              <p className="mt-3 text-sm leading-6 text-[#6f6985]">{destination.description}</p>
              <div className="mt-5 text-sm font-semibold text-[#6d44ec]">Go to page</div>
            </Link>
          ))}
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
        <Panel>
          <PanelTitle eyebrow="Week view" title="What is coming next" description="Deadlines and payouts that deserve attention this week." />

          <div className="mt-5 space-y-3">
            {calendarItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 rounded-[1.2rem] bg-[#fbfaff] px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.dot }} />
                  <span className="text-sm font-medium text-[#4f4a67]">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-[#221f38]">{item.date}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Quick launch"
            title="Recommended next move"
            description="Improve your creator profile to unlock better discovery and stronger collaboration quality."
          />

          <div className="mt-5 rounded-[1.6rem] border border-[#efe4fb] bg-[linear-gradient(135deg,rgba(243,237,255,0.94),rgba(255,246,239,0.98))] p-5">
            <div className="text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">Add your social links and featured results</div>
            <p className="mt-2 text-sm leading-6 text-[#66617c]">
              This improves audience proof, campaign fit, and your overall worth estimate.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <PrimaryButton href="/creator/profile">Complete profile</PrimaryButton>
              <SecondaryButton href="/creator/portfolio">Upload portfolio</SecondaryButton>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
