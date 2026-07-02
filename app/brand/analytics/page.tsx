import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../brand-ui";

export default function BrandAnalyticsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Brand analytics"
        title="Measure invite performance and campaign efficiency."
        description="Track acceptance rate, spend, response quality, and campaign category performance from a brand operations lens."
        action={
          <>
            <SecondaryButton href="/brand/dashboard">Back to dashboard</SecondaryButton>
            <PrimaryButton href="/brand/billing">Review spend</PrimaryButton>
          </>
        }
      />
      <div className="grid gap-4 md:grid-cols-4">
        {["Total campaigns", "Invites sent", "Acceptance rate", "Estimated reach"].map((item, index) => (
          <Panel key={item} className="p-5">
            <div className="text-sm font-medium text-[#66617c]">{item}</div>
            <div className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">{["12", "84", "33%", "4.1M"][index]}</div>
          </Panel>
        ))}
      </div>
      <Panel>
        <PanelTitle eyebrow="Chart area" title="Performance views" description="Static placeholders for invites sent vs accepted, spend by campaign, and creator category performance." />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {["Invites vs accepted", "Spend by campaign", "Category performance"].map((item) => (
            <div key={item} className="h-52 rounded-[1.4rem] bg-[#fbfaff] p-4 text-sm font-medium text-[#4f4a67]">
              {item}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
