import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../dashboard-ui";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Settings"
        title="Control the workspace behind your creator business."
        description="Manage account details, notification preferences, payout setup, and security from one tidy settings page."
        action={
          <>
            <SecondaryButton href="/creator/profile">Profile page</SecondaryButton>
            <PrimaryButton href="/creator/earnings">Review payouts</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <PanelTitle
            eyebrow="Account"
            title="Core account details"
            description="The essentials brands and your workspace rely on."
          />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Full name", value: "Lakshya Sharma" },
              { label: "Email", value: "lakshya@buzzroster.app" },
              { label: "Phone", value: "+91 98765 43210" },
              { label: "Location", value: "New Delhi, India" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.3rem] bg-[#fbfaff] p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#8f88a8]">{item.label}</div>
                <div className="mt-2 text-sm font-semibold text-[#1d1b32]">{item.value}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Notifications"
            title="What should reach you first"
            description="Stay responsive without letting the workspace become noisy."
          />

          <div className="mt-5 space-y-3">
            {[
              "Brand invite alerts",
              "Submission review updates",
              "Payment status changes",
              "New message notifications",
            ].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-[1.25rem] bg-[#fbfaff] px-4 py-3">
                <span className="text-sm font-medium text-[#4f4a67]">{item}</span>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${index === 3 ? "bg-[#f2edf8] text-[#8f88a8]" : "bg-[#eef8f3] text-[#2ea661]"}`}>
                  {index === 3 ? "Off" : "On"}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <PanelTitle
            eyebrow="Payout setup"
            title="Payment and compliance"
            description="Make sure payouts can move without delays."
          />

          <div className="mt-5 space-y-3">
            {[
              { label: "Bank account", status: "Verified" },
              { label: "Tax information", status: "Pending update" },
              { label: "Invoice defaults", status: "Configured" },
              { label: "Preferred currency", status: "INR" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-[1.25rem] border border-[#f0ebfa] px-4 py-3">
                <span className="text-sm font-medium text-[#4f4a67]">{item.label}</span>
                <span className="text-sm font-semibold text-[#1d1b32]">{item.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Security"
            title="Protect your creator workspace"
            description="A few small controls make the account much safer for payments and brand data."
          />

          <div className="mt-5 space-y-3">
            {[
              "Password last updated 28 days ago",
              "Two-factor authentication recommended",
              "Active sessions on 2 devices",
              "Recovery email confirmed",
            ].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-[#fbfaff] px-4 py-3 text-sm leading-6 text-[#4f4a67]">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
