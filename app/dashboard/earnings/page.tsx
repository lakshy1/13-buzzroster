import { payments } from "../dashboard-data";
import { DashboardHeader, Panel, PanelTitle, PrimaryButton, SecondaryButton } from "../dashboard-ui";

export default function EarningsPage() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        eyebrow="Earnings"
        title="Understand payouts, pending cash flow, and revenue rhythm."
        description="Your earnings page keeps money visibility simple so you can see what is paid, what is queued, and what is still outstanding."
        action={
          <>
            <SecondaryButton href="/creator/messages">Follow up with brands</SecondaryButton>
            <PrimaryButton href="/creator/settings">Manage payout settings</PrimaryButton>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total earned", value: "INR 1,42,500", note: "Across current cycle" },
          { label: "Pending", value: "INR 48,750", note: "3 payments in motion" },
          { label: "Paid", value: "INR 93,750", note: "Already settled" },
          { label: "This month", value: "INR 32,000", note: "From 2 completed campaigns" },
        ].map((item) => (
          <Panel key={item.label} className="p-5">
            <div className="text-sm font-medium text-muted-foreground">{item.label}</div>
            <div className="mt-2 text-[2rem] font-semibold tracking-[-0.05em] text-foreground">{item.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{item.note}</div>
          </Panel>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.85fr)]">
        <Panel>
          <PanelTitle
            eyebrow="Payout ledger"
            title="Recent payment activity"
            description="Track every campaign payment with enough detail to know whether action is needed."
          />

          <div className="mt-5 overflow-hidden rounded-[1.45rem] border border-border">
            <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-3 bg-surface px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span>Campaign</span>
              <span>Amount</span>
              <span>Status</span>
              <span>Date</span>
            </div>
            {payments.map((row) => (
              <div
                key={row.campaign}
                className="grid grid-cols-[1.8fr_1fr_1fr_1fr] gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground"
              >
                <span className="font-medium text-foreground">{row.campaign}</span>
                <span>{row.amount}</span>
                <span>
                  <span className="rounded-full bg-info/10 px-3 py-1 text-xs font-semibold text-info">{row.status}</span>
                </span>
                <span>{row.date}</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelTitle
            eyebrow="Cash flow"
            title="Expected payout timeline"
            description="Use this to understand how soon current work converts into cash."
          />

          <div className="mt-5 space-y-4">
            {[
              { label: "This week", value: "INR 18,000", width: "w-[44%]" },
              { label: "Next 2 weeks", value: "INR 30,750", width: "w-[72%]" },
              { label: "This month total", value: "INR 48,750", width: "w-full" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.25rem] bg-surface p-4">
                <div className="flex items-center justify-between gap-3 text-sm font-medium text-foreground">
                  <span>{item.label}</span>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-muted/30">
                  <div className={`h-full rounded-full bg-[linear-gradient(90deg,var(--accent)_0%,var(--accent-strong)_100%)] ${item.width}`} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <PanelTitle
          eyebrow="Pricing discipline"
          title="Protect your revenue quality"
          description="These reminders help you keep profitable, repeatable campaign economics as your volume grows."
        />

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            "Use your worth score as the minimum benchmark for new briefs.",
            "Watch revision-heavy campaigns because they quietly reduce your hourly return.",
            "Log repeat partners separately so you can spot your best long-term clients.",
          ].map((item) => (
            <div key={item} className="rounded-[1.3rem] border border-[#f0ebfa] bg-[#fbfaff] p-4 text-sm leading-6 text-[#4f4a67]">
              {item}
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
