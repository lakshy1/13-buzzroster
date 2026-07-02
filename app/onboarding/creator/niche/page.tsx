import Link from "next/link";

const niches = ["Fashion", "Beauty", "Fitness", "Food", "Tech", "Travel", "Gaming", "Finance", "Education", "Lifestyle", "Entertainment", "Business"];

export default function CreatorOnboardingNichePage() {
  return (
    <section className="rounded-[1.8rem] border border-[#efe8fb] bg-white p-5 shadow-[0_16px_36px_rgba(112,84,199,0.06)]">
      <div className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#7a51f4]">Step 3</div>
      <h1 className="mt-3 text-[1.8rem] font-semibold tracking-[-0.05em] text-[#1d1b32]">Select your niches</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6f6985]">
        Choose multiple categories so brands can find you more accurately for the collaborations that really fit your content style.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {niches.map((niche, index) => (
          <div
            key={niche}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${index < 4 ? "bg-[#6d44ec] text-white" : "border border-[#e6ddfb] bg-white text-[#5f5977]"}`}
          >
            {niche}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link href="/onboarding/creator/socials" className="rounded-[1rem] border border-[#dfd2fb] px-4 py-2.5 text-sm font-semibold text-[#6d44ec]">
          Back
        </Link>
        <Link
          href="/onboarding/creator/rates"
          className="rounded-[1rem] bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Continue to rates
        </Link>
      </div>
    </section>
  );
}
