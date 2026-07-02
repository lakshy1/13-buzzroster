import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../brand-ui";

export default function BrandBillingPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Brand billing"
        title="Manage plans, invoices, and payment history."
        description="A clean subscription and billing area for starter MVP operations."
        action={
          <>
            <SecondaryButton href="/brand/settings">Billing preferences</SecondaryButton>
            <PrimaryButton href="/pricing">Upgrade plan</PrimaryButton>
          </>
        }
      />
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel>
          <PanelTitle eyebrow="Current plan" title="Pro plan" description="Includes creator discovery, team access, and analytics." />
          <div className="mt-5 space-y-3">
            {["Monthly billing", "Next renewal: Aug 2, 2026", "Payment method ending in 4242"].map((item) => (
              <div key={item} className="rounded-[1.2rem] bg-[#fbfaff] px-4 py-3 text-sm text-[#4f4a67]">
                {item}
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <PanelTitle eyebrow="Invoices" title="Billing history" description="Static invoice list for MVP presentation." />
          <div className="mt-5 space-y-3">
            {["June 2026 - Paid", "May 2026 - Paid", "April 2026 - Paid"].map((item) => (
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
