import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../brand-ui";

export default function BrandSettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Brand settings"
        title="Manage your company workspace."
        description="Control profile details, team members, notifications, billing preferences, and account security."
        action={
          <>
            <SecondaryButton href="/brand/billing">Billing</SecondaryButton>
            <PrimaryButton href="/brand/dashboard">Back to dashboard</PrimaryButton>
          </>
        }
      />
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <PanelTitle eyebrow="Company profile" title="Core account details" description="The essentials behind your brand account." />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Brand name", value: "BuzzRoster Growth Team" },
              { label: "Work email", value: "growth@buzzroster.app" },
              { label: "Industry", value: "SaaS / Marketing" },
              { label: "Location", value: "Delhi, India" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.3rem] bg-[#fbfaff] p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#8f88a8]">{item.label}</div>
                <div className="mt-2 text-sm font-semibold text-[#1d1b32]">{item.value}</div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelTitle eyebrow="Team and notifications" title="Operational preferences" description="Keep the workspace aligned across your marketing team." />
          <div className="mt-5 space-y-3">
            {["Team members", "Notification settings", "Password settings", "Delete account"].map((item) => (
              <div key={item} className="rounded-[1.2rem] border border-[#f0ebfa] px-4 py-3 text-sm font-medium text-[#4f4a67]">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
