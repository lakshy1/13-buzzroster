import { audienceBreakdown, collaborationWins, creatorPlatforms, creatorShowcase, profileChecklist } from "../dashboard-data";
import { DashboardHeader, Panel, PanelTitle, PrimaryButton, ProfileRing, SecondaryButton } from "../dashboard-ui";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Creator profile"
        title="A complete social-style profile for brands to trust fast."
        description="This page behaves like your creator identity hub: audience proof, social accounts, showcase content, collaboration results, and the signals brands care about before they invite you."
        action={
          <>
            <SecondaryButton href="/creator/settings">Edit settings</SecondaryButton>
            <PrimaryButton href="/creator/invites">See invites</PrimaryButton>
          </>
        }
      />

      <Panel className="overflow-hidden p-0">
        <div className="h-44 bg-[linear-gradient(135deg,#6d44ec_0%,#8f72f4_38%,#ffd7b8_100%)]" />
        <div className="relative px-5 pb-6 pt-0 sm:px-6">
          <div className="-mt-14 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border-4 border-white bg-[#f4efff] text-[2rem] font-semibold text-[#6d44ec] shadow-[0_18px_40px_rgba(91,61,215,0.18)]">
                LS
              </div>
              <div className="pb-1">
                <div className="text-[2rem] font-semibold tracking-[-0.06em] text-[#1d1b32]">Lakshya Sharma</div>
                <div className="mt-1 text-sm font-medium text-[#6d44ec]">@lakshya.creates</div>
                <div className="mt-3 max-w-2xl text-sm leading-6 text-[#5f5977]">
                  Beauty and skincare creator building thoughtful, high-conversion short-form content for modern consumer brands.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Skincare", "Beauty", "Creator ops", "UGC", "Delhi"].map((tag) => (
                    <span key={tag} className="rounded-full bg-[#f4efff] px-3 py-1 text-xs font-semibold text-[#7a51f4]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-[1rem] border border-[#dfd2fb] px-4 py-2.5 text-sm font-semibold text-[#6d44ec]"
              >
                Share profile
              </button>
              <button
                type="button"
                className="rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(91,61,215,0.18)]"
              >
                Edit media kit
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Followers", value: "573.4K" },
              { label: "Average views", value: "127.1K" },
              { label: "Engagement rate", value: "5.4%" },
              { label: "Campaign completion", value: "96%" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.35rem] bg-[#fbfaff] p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#8f88a8]">{item.label}</div>
                <div className="mt-2 text-[1.9rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.9fr)]">
        <div className="space-y-5">
          <Panel>
            <PanelTitle
              eyebrow="Connected platforms"
              title="Your social footprint"
              description="Brands can quickly understand reach, engagement, and the role each platform plays in your creator mix."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {creatorPlatforms.map((platform) => (
                <article key={platform.name} className="rounded-[1.5rem] border border-[#f0ebfa] bg-[#fbfaff] p-4">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-[1rem] text-sm font-semibold text-white"
                    style={{ background: `linear-gradient(135deg, ${platform.accent} 0%, rgba(255,255,255,0.15) 140%)` }}
                  >
                    {platform.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="mt-4 text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">{platform.name}</div>
                  <div className="mt-1 text-sm text-[#6f6985]">{platform.handle}</div>
                  <div className="mt-4 flex items-center justify-between text-sm text-[#5f5977]">
                    <span>{platform.followers}</span>
                    <span>{platform.engagement} ER</span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelTitle
              eyebrow="Featured content"
              title="Showcase that feels like a creator feed"
              description="A brand-friendly content gallery that still looks like a social profile, not a spreadsheet."
            />

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {creatorShowcase.map((item, index) => (
                <article
                  key={item.title}
                  className={`rounded-[1.7rem] p-5 text-white shadow-[0_14px_32px_rgba(114,84,242,0.12)] ${
                    item.tone === "violet"
                      ? "bg-[linear-gradient(135deg,#6d44ec_0%,#8f72f4_100%)]"
                      : item.tone === "orange"
                        ? "bg-[linear-gradient(135deg,#f08c5a_0%,#f4b181_100%)]"
                        : item.tone === "blue"
                          ? "bg-[linear-gradient(135deg,#4d7cff_0%,#7ea0ff_100%)]"
                          : "bg-[linear-gradient(135deg,#28a153_0%,#68c77d_100%)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">{item.type}</div>
                    <div className="text-sm font-semibold">0{index + 1}</div>
                  </div>
                  <div className="mt-8 text-[1.45rem] font-semibold tracking-[-0.05em]">{item.title}</div>
                  <div className="mt-2 text-sm text-white/80">{item.value}</div>
                </article>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelTitle
              eyebrow="Collaboration proof"
              title="Results that help brands say yes"
              description="A concise proof section for repeat business and stronger conversion in invite review."
            />

            <div className="mt-5 space-y-3">
              {collaborationWins.map((item) => (
                <div key={item.brand} className="rounded-[1.4rem] border border-[#f0ebfa] bg-[#fbfaff] p-4">
                  <div className="text-lg font-semibold tracking-[-0.04em] text-[#1d1b32]">{item.brand}</div>
                  <div className="mt-2 text-sm font-semibold text-[#6d44ec]">{item.result}</div>
                  <div className="mt-2 text-sm leading-6 text-[#5f5977]">{item.note}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel>
            <PanelTitle
              eyebrow="Profile strength"
              title="Public profile quality"
              description="A quick brand-readiness snapshot."
            />

            <div className="mt-4 flex flex-col items-center gap-5">
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

          <Panel>
            <PanelTitle
              eyebrow="Audience"
              title="Who follows you"
              description="A lightweight audience breakdown brands can scan quickly."
            />

            <div className="mt-5 space-y-3">
              {audienceBreakdown.map((group) => (
                <div key={group.label} className="rounded-[1.2rem] bg-[#fbfaff] p-4">
                  <div className="flex items-center justify-between gap-3 text-sm font-medium text-[#4f4a67]">
                    <span>{group.label}</span>
                    <span className="font-semibold text-[#1d1b32]">{group.share}</span>
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-[#ece8f6]">
                    <div
                      className={`h-full rounded-full bg-[linear-gradient(90deg,#6d44ec_0%,#9c7dff_100%)] ${
                        group.share === "34%"
                          ? "w-[34%]"
                          : group.share === "29%"
                            ? "w-[29%]"
                            : group.share === "18%"
                              ? "w-[18%]"
                              : "w-[11%]"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel>
            <PanelTitle
              eyebrow="Contact card"
              title="Brand-facing details"
              description="The basic information a partner team needs before outreach."
            />

            <div className="mt-5 space-y-3 rounded-[1.35rem] bg-[linear-gradient(135deg,rgba(243,237,255,0.94),rgba(255,246,239,0.98))] p-4">
              <div className="rounded-[1rem] bg-white/75 px-4 py-3 text-sm text-[#4f4a67]">Email: lakshya@buzzroster.app</div>
              <div className="rounded-[1rem] bg-white/75 px-4 py-3 text-sm text-[#4f4a67]">Response time: under 12 hours</div>
              <div className="rounded-[1rem] bg-white/75 px-4 py-3 text-sm text-[#4f4a67]">Preferred campaign types: reels, stories, short-form UGC</div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
