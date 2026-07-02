import Link from "next/link";

import {
  attentionItems,
  calendarItems,
  dashboardDestinations,
  metricCards,
  profileChecklist,
} from "./dashboard-data";
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
} from "./dashboard-ui";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Dashboard overview"
        title="Your creator business, organized."
        description="Start here for the big picture, then jump into dedicated pages for invites, campaigns, submissions, earnings, messages, profile, and settings."
        action={
          <>
            <SecondaryButton href="/dashboard/profile">View profile</SecondaryButton>
            <PrimaryButton href="/dashboard/brand-invites">Review invites</PrimaryButton>
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
            description="The fastest way to clear blockers and keep momentum with brands."
            action={<SecondaryButton href="/dashboard/submissions">Open submissions</SecondaryButton>}
          />

          <div className="mt-5 space-y-4">
            {attentionItems.map((item) => (
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
                  <button
                    type="button"
                    className="rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(91,61,215,0.18)]"
                  >
                    {item.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Profile strength"
            title="Strong and almost complete"
            description="A nearly complete profile means better matching and faster brand confidence."
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
          eyebrow="Workspace pages"
          title="Every workflow now has its own page"
          description="Instead of one long dashboard, each area now opens into a dedicated workspace with more context and room to act."
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
          <PanelTitle
            eyebrow="Week view"
            title="What is coming next"
            description="Important dates to keep you ahead of reviews, deadlines, and payouts."
          />

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
            description="Finish your creator profile and sharpen how brands discover you."
          />

          <div className="mt-5 rounded-[1.6rem] border border-[#efe4fb] bg-[linear-gradient(135deg,rgba(243,237,255,0.94),rgba(255,246,239,0.98))] p-5">
            <div className="text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">
              Add your social links and featured results
            </div>
            <p className="mt-2 text-sm leading-6 text-[#66617c]">
              This improves audience proof, campaign fit, and your overall worth estimate.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <PrimaryButton href="/dashboard/profile">Complete profile</PrimaryButton>
              <SecondaryButton href="/tools/creator-worth-calculator">Open calculator</SecondaryButton>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
