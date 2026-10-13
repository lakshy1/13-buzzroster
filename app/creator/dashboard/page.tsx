import {
  attentionItems,
  calendarItems,
  metricCards,
  profileChecklist,
} from "../creator-data";
import {
  BrandAvatar,
  ContributionHeatmap,
  Panel,
  PanelTitle,
  ProfileRing,
  StatusPill,
  SummaryCard,
} from "../creator-ui";

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 4.75a4.25 4.25 0 0 0-4.25 4.25v2.1c0 .6-.18 1.18-.52 1.68l-1.4 2.05c-.4.58.02 1.37.73 1.37h11.88c.71 0 1.13-.79.73-1.37l-1.4-2.05a2.95 2.95 0 0 1-.52-1.68V9A4.25 4.25 0 0 0 12 4.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9.75 18.25a2.25 2.25 0 0 0 4.5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function CreatorDashboardPage() {
  return (
    <div className="flex min-h-full flex-col gap-4 p-1 sm:p-2 lg:p-3">
      <div className="flex items-start justify-between gap-4 rounded-[1.75rem] px-1 py-1 sm:px-2">
        <div className="min-w-0">
          <h1 className="text-[clamp(1.9rem,3.4vw,3rem)] font-semibold tracking-[-0.06em] text-foreground">Good morning, Lakshya</h1>
          <p className="mt-2 text-base font-medium text-muted-foreground">Let&apos;s make today count.</p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground transition-colors hover:border-accent/30 hover:text-foreground"
            aria-label="Notifications"
          >
            <BellIcon />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-accent" />
          </button>
          <BrandAvatar name="Lakshya Sharma" accent="#6d44ec" />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <span className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-foreground shadow-[0_10px_24px_rgba(20,20,35,0.05)]">
          This Week
        </span>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {metricCards.map((card) => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.92fr)]">
        <div className="space-y-5">
          <ContributionHeatmap title="Creator momentum" description="Keep a steady cadence of posts, replies, and submissions." />

          <Panel>
            <PanelTitle eyebrow="Priority actions" title="Needs your attention" />

            <div className="mt-5 space-y-4">
              {attentionItems.map((item) => (
                <div
                  key={item.brand}
                  className="flex flex-col gap-4 rounded-[1.55rem] border border-border/80 bg-[rgba(255,255,255,0.38)] p-4 shadow-[0_12px_28px_rgba(20,20,35,0.04)] dark:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <BrandAvatar name={item.brand} accent={item.statusTone === "orange" ? "#f07b3b" : item.statusTone === "blue" ? "#4b7df1" : "#7a51f4"} />
                    <div className="min-w-0">
                      <div className="text-base font-semibold tracking-[-0.04em] text-foreground">{item.brand}</div>
                      <div className="truncate text-sm text-muted-foreground">{item.campaign}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                    <StatusPill tone={item.statusTone}>{item.status}</StatusPill>
                    <span className="text-sm text-muted-foreground">{item.deadline}</span>
                    <span className="text-sm font-medium text-muted-foreground">{item.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel>
            <PanelTitle eyebrow="Profile strength" title="Strong and almost complete" />

            <div className="mt-5 flex flex-col items-center gap-5">
              <ProfileRing />
              <div className="w-full space-y-3">
                {profileChecklist.map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-[1rem] border border-border/70 bg-[rgba(255,255,255,0.34)] px-3 py-2.5 dark:bg-white/5">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[0.72rem] font-bold ${
                        item.done ? "bg-[rgba(34,197,94,0.12)] text-success" : "bg-[rgba(245,158,11,0.12)] text-warning"
                      }`}
                    >
                      {item.done ? "OK" : "!"}
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel>
            <PanelTitle eyebrow="Week view" title="Upcoming deadlines" />

            <div className="mt-5 space-y-3">
              {calendarItems.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 rounded-[1.2rem] bg-surface px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.dot }} />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.date}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelTitle eyebrow="Quick launch" title="Recommended next move" />

            <div className="mt-5 rounded-[1.6rem] border border-border bg-surface p-5">
              <div className="text-lg font-semibold tracking-[-0.04em] text-foreground">Add your social links and featured results</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This improves audience proof, campaign fit, and your overall worth estimate.
              </p>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
