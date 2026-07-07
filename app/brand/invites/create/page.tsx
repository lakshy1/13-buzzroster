import Link from "next/link";

export default function SendInvitePage() {
  return (
    <section className="rounded-[1.8rem] border border-[#efe8fb] bg-white p-5 shadow-[0_16px_36px_rgba(112,84,199,0.06)]">
      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7a51f4]">Send invite</div>
      <h1 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">Invite a creator to your campaign</h1>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-[#6f6985]">
        Select a campaign, define the scope, set the budget, and send a clean professional invitation.
      </p>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {["Selected campaign", "Selected creator", "Custom invite message", "Budget offer", "Deliverables", "Deadline"].map((field) => (
          <label key={field} className="space-y-2">
            <span className="text-sm font-medium text-[#4d4963]">{field}</span>
            <input className="h-11 w-full rounded-2xl border border-[#e7e0f8] bg-white/92 px-4 text-sm text-[#1f1d31] outline-none" />
          </label>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/brand/invites" className="rounded-[1rem] border border-border px-4 py-2.5 text-sm font-semibold text-accent">
          Cancel
        </Link>
        <button type="button" className="rounded-[1rem] bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] px-4 py-2.5 text-sm font-semibold text-accent-foreground">
          Send invite
        </button>
      </div>
    </section>
  );
}
