import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 | Buzzroster",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fcf7f0_0%,#faf3eb_28%,#f8f0fa_64%,#f7efe8_100%)] text-[#17162b]">
      <div className="absolute inset-0 opacity-90 [background:radial-gradient(circle_at_12%_18%,rgba(180,154,255,0.36),transparent_18%),radial-gradient(circle_at_82%_16%,rgba(245,219,187,0.72),transparent_20%),radial-gradient(circle_at_50%_58%,rgba(209,191,255,0.34),transparent_28%),radial-gradient(circle_at_16%_84%,rgba(255,220,170,0.42),transparent_22%),radial-gradient(circle_at_84%_82%,rgba(193,171,255,0.28),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(255,255,255,0.24)_100%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1120px] flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2.4rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.84)_0%,rgba(250,244,255,0.88)_100%)] shadow-[0_24px_70px_rgba(125,96,207,0.12)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(109,68,236,0.12),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(240,180,75,0.14),transparent_22%),radial-gradient(circle_at_50%_105%,rgba(111,195,161,0.14),transparent_24%)]" />

          <div className="relative grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-16">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#eadcfb] bg-white/75 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#6d44ec] shadow-[0_10px_22px_rgba(125,96,207,0.08)]">
                Buzzroster 404
              </div>

              <h1 className="mt-6 max-w-[10ch] font-[family-name:var(--font-serif)] text-[clamp(3.2rem,8vw,6.2rem)] font-medium leading-[0.9] tracking-[-0.08em] text-[#17162b]">
                Page not found
              </h1>

              <p className="mt-5 max-w-[34rem] text-[1.02rem] leading-[1.65] text-[#5f5a74] sm:text-[1.08rem]">
                The link you followed does not exist, but the Buzzroster workspace is still
                ready. Use the buttons below to return home or jump back to the tools area
                where all other utilities live in the dropdown.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-6 py-4 text-[1rem] font-semibold text-white shadow-[0_18px_35px_rgba(91,61,215,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Back to home
                </Link>
                <Link
                  href="/#tools"
                  className="inline-flex items-center justify-center rounded-2xl border border-[#cdbcf8] bg-white/72 px-6 py-4 text-[1rem] font-semibold text-[#6d44ec] shadow-[0_10px_26px_rgba(125,96,207,0.08)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white"
                >
                  Browse tools
                </Link>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Home", value: "/" },
                  { label: "Tools", value: "/#tools" },
                  { label: "Calculator", value: "/tools/creator-worth-calculator" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.3rem] border border-[#efe7fb] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(247,242,255,0.92)_100%)] p-4 shadow-[0_10px_24px_rgba(125,96,207,0.06)]"
                  >
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#6d44ec]/70">
                      {item.label}
                    </div>
                    <div className="mt-2 text-[0.98rem] font-medium text-[#1d1b2e]">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-stretch border-t border-white/70 lg:border-l lg:border-t-0">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(109,68,236,0.06)_0%,rgba(255,255,255,0.1)_100%)]" />
              <div className="relative flex min-h-[360px] flex-1 flex-col justify-between p-6 sm:min-h-[420px] sm:p-8 lg:p-10">
                <div className="flex items-center justify-end">
                  <div className="rounded-full border border-[#eadcfb] bg-white/80 px-4 py-2 text-[0.78rem] font-semibold text-[#6d44ec] shadow-[0_10px_22px_rgba(125,96,207,0.08)]">
                    Use the dropdown to navigate
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 -m-6 rounded-full bg-[#8f72f4]/10 blur-3xl" />
                    <div className="relative flex h-[220px] w-[220px] items-center justify-center rounded-full border border-white/75 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.98),rgba(248,240,255,0.9)_55%,rgba(236,228,255,0.8)_100%)] shadow-[0_24px_60px_rgba(125,96,207,0.14)]">
                      <div className="text-center">
                        <div className="font-[family-name:var(--font-serif)] text-[5rem] font-medium leading-none tracking-[-0.08em] text-[#6d44ec]">
                          404
                        </div>
                        <div className="mt-2 text-[0.9rem] font-medium uppercase tracking-[0.24em] text-[#7a7590]">
                          Not found
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.35rem] border border-[#efe7fb] bg-white/82 p-4">
                    <div className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#6d44ec]/70">
                      Suggested path
                    </div>
                    <p className="mt-2 text-[0.95rem] leading-[1.55] text-[#5e5a70]">
                      Start with the homepage, then open Tools to continue.
                    </p>
                  </div>
                  <div className="rounded-[1.35rem] border border-[#efe7fb] bg-white/82 p-4">
                    <div className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#6d44ec]/70">
                      Direct route
                    </div>
                    <p className="mt-2 text-[0.95rem] leading-[1.55] text-[#5e5a70]">
                      Jump straight to the Creator Worth Calculator.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
