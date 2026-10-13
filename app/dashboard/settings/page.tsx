import { ThemeToggle } from "../../components/theme-toggle";
import { Panel, PanelTitle } from "../dashboard-ui";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <PanelTitle eyebrow="Account" title="Core account details" description="The essentials brands and your workspace rely on." />

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { label: "Full name", value: "Lakshya Sharma" },
              { label: "Email", value: "lakshya@buzzroster.app" },
              { label: "Phone", value: "+91 98765 43210" },
              { label: "Location", value: "New Delhi, India" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.3rem] border border-border bg-surface p-4">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{item.label}</div>
                <div className="mt-2 text-sm font-semibold text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle eyebrow="Appearance" title="Theme switcher" description="Choose the look you want across the app." />

          <div className="mt-5 rounded-[1.5rem] border border-border bg-surface p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-foreground">Light and dark mode</div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Toggle the theme to match your preference or the time of day.
                </p>
              </div>
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              "Brand invite alerts",
              "Submission review updates",
              "Payment status changes",
              "New message notifications",
            ].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-[1.25rem] bg-[#fbfaff] px-4 py-3 dark:bg-white/5">
                <span className="text-sm font-medium text-foreground">{item}</span>
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
          <PanelTitle eyebrow="Payout setup" title="Payment and compliance" description="Make sure payouts can move without delays." />

          <div className="mt-5 space-y-3">
            {[
              { label: "Bank account", status: "Verified" },
              { label: "Tax information", status: "Pending update" },
              { label: "Invoice defaults", status: "Configured" },
              { label: "Preferred currency", status: "INR" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-[1.25rem] border border-border px-4 py-3">
                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                <span className="text-sm font-semibold text-foreground">{item.status}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle eyebrow="Security" title="Protect your creator workspace" description="A few small controls make the account much safer for payments and brand data." />

          <div className="mt-5 space-y-3">
            {[
              "Password last updated 28 days ago",
              "Two-factor authentication recommended",
              "Active sessions on 2 devices",
              "Recovery email confirmed",
            ].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-[#fbfaff] px-4 py-3 text-sm leading-6 text-muted-foreground dark:bg-white/5">
                {item}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
