import Link from "next/link";

export default function CreatorOnboardingProfilePage() {
  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
      <section className="rounded-[1.8rem] border border-[#efe8fb] bg-white p-5 shadow-[0_16px_36px_rgba(112,84,199,0.06)]">
        <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7a51f4]">Step 1</div>
        <h1 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">Profile basics</h1>
        <p className="mt-2 text-sm leading-6 text-[#6f6985]">
          Add the core details that make your creator profile look polished before a brand ever sends an invite.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {["Display name", "Short bio", "Location", "Languages", "Gender (optional)", "Creator category"].map((field) => (
            <label key={field} className="space-y-2">
              <span className="text-sm font-medium text-[#4d4963]">{field}</span>
              <input className="h-11 w-full rounded-2xl border border-[#e7e0f8] bg-white/92 px-4 text-sm text-[#1f1d31] outline-none" />
            </label>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/creator/dashboard" className="rounded-[1rem] border border-[#dfd2fb] px-4 py-2.5 text-sm font-semibold text-[#6d44ec]">
            Save draft
          </Link>
          <Link
            href="/onboarding/creator/socials"
            className="rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Continue to socials
          </Link>
        </div>
      </section>

      <aside className="rounded-[1.8rem] border border-[#efe8fb] bg-[linear-gradient(135deg,rgba(243,237,255,0.94),rgba(255,246,239,0.98))] p-5">
        <div className="text-sm font-semibold text-[#1d1b32]">Why this matters</div>
        <div className="mt-3 space-y-3 text-sm leading-6 text-[#5f5977]">
          <div className="rounded-[1rem] bg-white/70 px-4 py-3">A strong bio makes your niche and value clear.</div>
          <div className="rounded-[1rem] bg-white/70 px-4 py-3">Location and language improve brand filtering accuracy.</div>
          <div className="rounded-[1rem] bg-white/70 px-4 py-3">A complete profile gets better trust during invite review.</div>
        </div>
      </aside>
    </div>
  );
}
