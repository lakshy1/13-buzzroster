import Link from "next/link";

export default function CreatorOnboardingRatesPage() {
  return (
    <section className="rounded-[1.8rem] border border-[#efe8fb] bg-white p-5 shadow-[0_16px_36px_rgba(112,84,199,0.06)]">
      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7a51f4]">Step 4</div>
      <h1 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">Add your collaboration rates</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6f6985]">
        Rate guidance helps brands send better invites and makes scope conversations much faster.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          "Instagram reel rate",
          "Story rate",
          "Static post rate",
          "YouTube integration rate",
          "Short video rate",
          "Custom package details",
        ].map((field) => (
          <label key={field} className="space-y-2">
            <span className="text-sm font-medium text-[#4d4963]">{field}</span>
            <input className="h-11 w-full rounded-2xl border border-[#e7e0f8] bg-white/92 px-4 text-sm text-[#1f1d31] outline-none" />
          </label>
        ))}
      </div>

      <div className="mt-4 rounded-[1.2rem] bg-[#fbfaff] p-4 text-sm leading-6 text-[#5f5977]">
        Barter collaboration preference: enable if you are open to non-cash partnerships for selected campaigns.
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/onboarding/creator/niche" className="rounded-[1rem] border border-[#dfd2fb] px-4 py-2.5 text-sm font-semibold text-[#6d44ec]">
          Back
        </Link>
        <Link
          href="/creator/dashboard"
          className="rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Finish onboarding
        </Link>
      </div>
    </section>
  );
}
