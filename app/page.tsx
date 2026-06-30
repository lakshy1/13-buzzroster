import Image, { type StaticImageData } from "next/image";
import heroSection from "../assets/Images/Hero-Section-1.png";

const navItems = [
  { label: "About us", href: "#" },
  { label: "Features", href: "#" , chevron: true },
  { label: "Resources", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "FAQ", href: "#" },
];

const trustedBrands = [
  { name: "Kanthast", icon: "kanthast" },
  { name: "Soul Pharma", icon: "soulpharma" },
  { name: "Aconic Technologies", icon: "aconic" },
  { name: "Cloud Duty", icon: "cloudduty" },
  { name: "Learning Tree", icon: "learningtree" },
];

const repeatedTrustedBrands = [...trustedBrands, ...trustedBrands];

const howItWorksSteps = [
  {
    number: "1",
    title: "Create your profile",
    description: "Add your socials, niche, portfolio and rates.",
    color: "#7360ff",
    icon: "profile",
  },
  {
    number: "2",
    title: "Receive brand invites",
    description: "Get invited to campaigns that match your style.",
    color: "#ea6c98",
    icon: "bell",
  },
  {
    number: "3",
    title: "Accept what fits you",
    description: "Review briefs and accept the best opportunities.",
    color: "#f08c5a",
    icon: "check",
  },
  {
    number: "4",
    title: "Create & submit",
    description: "Submit your content and keep brands in the loop.",
    color: "#f2b13d",
    icon: "document",
  },
  {
    number: "5",
    title: "Get reviewed",
    description: "Receive feedback and submit revisions if needed.",
    color: "#58c26b",
    icon: "message",
  },
  {
    number: "6",
    title: "Get approved",
    description: "Content approved? You’re good to go!",
    color: "#5d7cf2",
    icon: "gear",
  },
  {
    number: "7",
    title: "Pay paid & grow",
    description: "Track earnings and build long-term collabs.",
    color: "#7358f5",
    icon: "dollar",
  },
];

const testimonials = [
  {
    name: "Ananya S.",
    handle: "@ananyacreates",
    role: "Creator",
    accent: "#6957f2",
    background: "rgba(239, 232, 255, 0.88)",
    text: "BuzzRoster changed the way I manage brand deals. Everything is organized, professional and easy to track.",
  },
  {
    name: "Rohit Mehta",
    handle: "Marketing Manager",
    role: "Brand",
    accent: "#ef7f58",
    background: "rgba(252, 244, 233, 0.9)",
    text: "Finding the right creators used to take hours. Now we discover, invite and track everything in one place.",
  },
  {
    name: "Priya Kapoor",
    handle: "Campaign Lead",
    role: "Agency",
    accent: "#68bf71",
    background: "rgba(242, 251, 243, 0.9)",
    text: "Our campaigns run smoother than ever. BuzzRoster helps us manage creators, deadlines and deliverables effortlessly.",
  },
];

function BrandIcon({ kind }: { kind: string }) {
  switch (kind) {
    case "kanthast":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-[#6d44ec]"
        >
          <path
            d="M5 19V5M5 12L15 5M5 12L16 19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "soulpharma":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-[#f26d8a]"
        >
          <path
            d="M12 20.2c-4.7-2.8-7.5-6-7.5-9.3A4.2 4.2 0 0 1 12 7.9a4.2 4.2 0 0 1 7.5 3c0 3.3-2.8 6.5-7.5 9.3Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 7v10M7 12h10"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );
    case "aconic":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-[#25a6a1]"
        >
          <path
            d="M12 4 20 12l-8 8-8-8 8-8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 8.2 15.8 12 12 15.8 8.2 12 12 8.2Z"
            fill="currentColor"
            opacity="0.18"
          />
        </svg>
      );
    case "cloudduty":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-[#6c8cff]"
        >
          <path
            d="M7.5 17.5h8.2a3.3 3.3 0 0 0 .3-6.58 4.6 4.6 0 0 0-8.9 1.23A2.9 2.9 0 0 0 7.5 17.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M9.2 17.5v-2.2m2.8 2.2v-3.6m2.8 3.6v-1.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "learningtree":
      return (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5 shrink-0 text-[#d59a3d]"
        >
          <path
            d="M12 4v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 7c-2.2 0-3.8-1.2-5-3 2.7.2 4.4 1.1 5 3Zm0 0c2.2 0 3.8-1.2 5-3-2.7.2-4.4 1.1-5 3Zm0 4c-2.6 0-4.4-1.3-5.8-3.3C9.4 8 11.2 9 12 11Zm0 0c2.6 0 4.4-1.3 5.8-3.3C14.6 8 12.8 9 12 11Zm0 0v9"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
}

function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2.5L13.76 8.24L19.5 10L13.76 11.76L12 17.5L10.24 11.76L4.5 10L10.24 8.24L12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepIcon({ kind, color }: { kind: string; color: string }) {
  const common = "h-12 w-12";

  switch (kind) {
    case "profile":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M24 24.5a6.2 6.2 0 1 0 0-12.4 6.2 6.2 0 0 0 0 12.4Zm-9 12.5c.8-4.9 4.9-8.5 9-8.5s8.2 3.6 9 8.5"
            stroke={color}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bell":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M20 31h8c-.7-1.2-1-2.5-1-4v-4.4a5 5 0 1 0-10 0V27c0 1.5-.3 2.8-1 4h4Z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M28.5 17.5 30 16m-12 1.5L16.5 16"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "check":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <rect x="14" y="13" width="20" height="22" rx="2.8" stroke={color} strokeWidth="2.2" />
          <path d="M18 24.5 22 28l8-8" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "document":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M18 13.5h9.5L30 16v18.5a1.5 1.5 0 0 1-1.5 1.5H18a1.5 1.5 0 0 1-1.5-1.5v-20a1.5 1.5 0 0 1 1.5-1.5Z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M27.5 13.5V16H30" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
          <path d="M20 23h8M20 28h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "message":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M16 17.5h16a2.5 2.5 0 0 1 2.5 2.5v10a2.5 2.5 0 0 1-2.5 2.5H23l-5 4v-4h-2a2.5 2.5 0 0 1-2.5-2.5V20a2.5 2.5 0 0 1 2.5-2.5Z"
            stroke={color}
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M19 24h10" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "gear":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <path
            d="M24 16.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Zm0-4.5 2.2 2.7a10.7 10.7 0 0 1 2.1.9l3.5-.7 2 3.5-2.3 2.6c.1.7.1 1.4 0 2.1l2.3 2.6-2 3.5-3.5-.7a10.7 10.7 0 0 1-2.1.9L24 36.5l-2.2-2.7a10.7 10.7 0 0 1-2.1-.9l-3.5.7-2-3.5 2.3-2.6c-.1-.7-.1-1.4 0-2.1L14.2 23l2-3.5 3.5.7a10.7 10.7 0 0 1 2.1-.9L24 12Z"
            stroke={color}
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "dollar":
      return (
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className={common}>
          <circle cx="24" cy="24" r="24" fill={color} fillOpacity="0.12" />
          <circle cx="24" cy="24" r="9" stroke={color} strokeWidth="2.2" />
          <path d="M24 18v12m3-9.2c0-1.4-1.4-2.3-3-2.3s-3 .9-3 2.3c0 1.5 1.7 2 3 2.3 1.3.3 3 .8 3 2.3 0 1.4-1.4 2.3-3 2.3s-3-.9-3-2.3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
}

function Avatar({ initials, tint }: { initials: string; tint: string }) {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/80 text-[0.95rem] font-semibold text-white shadow-sm"
      style={{ background: tint }}
    >
      {initials}
    </div>
  );
}

function StarRow({ color }: { color: string }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-5 w-5"
          style={{ color }}
        >
          <path d="M10 2.5 12.4 7l5 .8-3.6 3.5.8 5L10 14l-4.6 2.3.8-5L2.6 7.8l5-.8L10 2.5Z" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fcf7f0_0%,#faf3eb_24%,#f8f0fa_58%,#f7efe8_100%)] text-[#17162b]">
      <div className="absolute inset-0 opacity-90 [background:radial-gradient(circle_at_14%_18%,rgba(180,154,255,0.42),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(245,219,187,0.75),transparent_20%),radial-gradient(circle_at_52%_56%,rgba(209,191,255,0.38),transparent_26%),radial-gradient(circle_at_18%_82%,rgba(255,220,170,0.45),transparent_22%),radial-gradient(circle_at_84%_82%,rgba(193,171,255,0.3),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(255,255,255,0.22)_100%)]" />
      <div className="absolute left-[2.5%] top-[43%] hidden h-10 w-10 text-white/80 lg:block">
        <SparkIcon className="h-full w-full drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
      </div>
      <div className="absolute right-[7%] top-[46%] hidden h-10 w-10 text-[#8f6ef2]/70 lg:block">
        <SparkIcon className="h-full w-full drop-shadow-[0_0_12px_rgba(143,110,242,0.35)]" />
      </div>
      <div className="absolute right-[4%] top-[68%] hidden h-7 w-7 text-[#8d71e9]/70 lg:block">
        <SparkIcon className="h-full w-full" />
      </div>
      <div className="absolute left-[7%] top-[72%] hidden h-6 w-6 text-[#9c80f5]/60 lg:block">
        <SparkIcon className="h-full w-full" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-[1700px] flex-col px-4 pb-4 pt-5 sm:px-6 md:px-8">
        <header className="flex items-center justify-between gap-6">
          <a
            href="#"
            className="group flex items-start gap-1 text-[2.6rem] leading-none text-[#5c36d6] transition-transform duration-200 hover:scale-[1.01] md:text-[3.1rem]"
            aria-label="Buzzroster home"
          >
            <span className="font-[family-name:var(--font-pacifico)] tracking-tight">
              Buzzroster
            </span>
            <SparkIcon className="mt-1 h-4 w-4 text-[#5c36d6] transition-transform duration-200 group-hover:rotate-12 md:h-5 md:w-5" />
          </a>

          <nav className="hidden items-center gap-6 text-[0.98rem] font-medium text-[#1a1731] lg:flex xl:gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 transition-colors hover:text-[#5c36d6]"
              >
                <span>{item.label}</span>
                {item.chevron ? (
                  <ChevronIcon className="h-4 w-4" />
                ) : null}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#"
              className="rounded-2xl border border-[#cdbcf8] bg-white/55 px-5 py-3 text-[1rem] font-medium text-[#1a1731] shadow-[0_10px_30px_rgba(111,76,203,0.08)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/75"
            >
              Log in
            </a>
            <a
              href="#"
              className="rounded-2xl bg-[linear-gradient(135deg,#6d44ec_0%,#5b3dd7_100%)] px-4 py-3 text-[1rem] font-semibold text-white shadow-[0_16px_35px_rgba(91,61,215,0.38)] transition-transform duration-200 hover:-translate-y-0.5 sm:px-6"
            >
              Join Buzzroster free
            </a>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col items-center text-center">
          <h1 className="mt-8 max-w-[1240px] font-[family-name:var(--font-serif)] text-[clamp(2.85rem,5.9vw,6rem)] font-medium leading-[0.92] tracking-[-0.05em] text-[#17162b] md:mt-10">
            <span className="block">A visual collaboration workspace</span>
            <span className="block">built for modern creators.</span>
          </h1>

          <p className="mt-4 max-w-[930px] text-[clamp(1.05rem,1.8vw,1.45rem)] leading-[1.32] text-[#5d5a6f] md:mt-5">
            <span className="block">
              Organize invites, campaigns, reviews, payments, and deliverables
            </span>
            <span className="block">
              across mobile - without the chaos of DMs and spreadsheets.
            </span>
          </p>

          <div className="relative mt-5 w-full flex-1 pb-2 md:mt-7">
            <div className="absolute left-1/2 top-0 h-28 w-[76%] -translate-x-1/2 rounded-full bg-white/35 blur-3xl" />
            <div className="relative mx-auto flex w-full items-end justify-center">
              <Image
                src={heroSection as StaticImageData}
                alt="Buzzroster product hero showing the mobile app interface"
                priority
                className="h-auto w-[min(100%,1710px)] select-none object-contain drop-shadow-[0_35px_70px_rgba(93,61,179,0.1)]"
                sizes="(max-width: 768px) 100vw, 1710px"
              />
            </div>
          </div>
        </section>

        <section className="relative left-1/2 w-screen -translate-x-1/2 pb-6 pt-2 sm:pb-8">
          <div className="border-y border-white/70 bg-[rgba(255,255,255,0.72)] shadow-[0_16px_45px_rgba(125,96,207,0.08)] backdrop-blur-md">
            <p className="px-5 pt-5 text-center text-[0.98rem] font-semibold tracking-[-0.01em] text-[#2a2940] sm:text-[1.05rem]">
              Trusted by creators, brands & agencies worldwide
            </p>
            <div className="overflow-hidden px-5 py-5 sm:px-8">
              <div className="brand-marquee flex w-max items-center gap-14 text-[#6e6c7f]">
                {repeatedTrustedBrands.map((brand, index) => (
                  <div
                    key={`${brand}-${index}`}
                    className="flex shrink-0 items-center gap-2 rounded-full border border-white/60 bg-white/58 px-4 py-2 shadow-[0_8px_20px_rgba(125,96,207,0.06)]"
                  >
                    <BrandIcon kind={brand.icon} />
                    <span className="font-[family-name:var(--font-serif)] text-[1.02rem] italic text-[#5f5d6f] opacity-90 sm:text-[1.1rem]">
                      {brand.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1600px] pb-14 pt-12 sm:pb-20 sm:pt-16">
          <div className="mx-auto max-w-[780px] text-center">
            <h2 className="text-[clamp(2rem,2.4vw,3rem)] font-semibold tracking-[-0.04em] text-[#17162b]">
              How <span className="text-[#6d44ec]">BuzzRoster</span> works
              <span className="ml-1 text-[#f0b44b]">✦</span>
            </h2>
            <div className="mx-auto mt-5 flex w-full max-w-[360px] items-center justify-between border-b border-[#e9e4f3] text-[1rem] font-semibold text-[#4f4d66]">
              <button className="relative flex-1 pb-4 text-[#403c68]">
                For Creators
                <span className="absolute inset-x-0 bottom-0 h-1 rounded-full bg-[#6d44ec]" />
              </button>
              <button className="flex-1 pb-4 text-[#66637d]">For Brands</button>
            </div>
          </div>

          <div className="relative mt-12">
            <div className="absolute left-[5%] right-[5%] top-[58px] hidden h-px bg-[#eef0f5] lg:block" />
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-7 lg:gap-6">
              {howItWorksSteps.map((step) => (
                <div key={step.number} className="relative flex flex-col items-center text-center">
                  <div className="flex h-[112px] w-[112px] items-center justify-center rounded-full" style={{ background: `${step.color}1f` }}>
                    <StepIcon kind={step.icon} color={step.color} />
                  </div>
                  <div className="mt-7 flex h-7 w-7 items-center justify-center rounded-full bg-[#6d44ec] text-[0.82rem] font-semibold text-white shadow-[0_8px_18px_rgba(109,68,236,0.25)]">
                    {step.number}
                  </div>
                  <h3 className="mt-5 max-w-[160px] text-[1.08rem] font-semibold leading-[1.28] tracking-[-0.02em] text-[#19182e]">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-[170px] text-[0.98rem] leading-[1.55] text-[#656278]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex items-center gap-5">
            <div className="h-px flex-1 bg-[#eceaf3]" />
            <h3 className="whitespace-nowrap text-center text-[clamp(1.8rem,2.2vw,2.7rem)] font-semibold tracking-[-0.04em] text-[#17162b]">
              Loved by creators & brands
            </h3>
            <div className="h-px flex-1 bg-[#eceaf3]" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[32px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_32px] lg:items-center">
            <button className="hidden justify-self-center text-[2.8rem] leading-none text-[#19182e] lg:block" aria-label="Previous testimonials">
              ‹
            </button>

            {testimonials.map((testimonial) => (
              <article
                key={testimonial.name}
                className="rounded-[1.5rem] border border-white/80 p-6 shadow-[0_16px_45px_rgba(125,96,207,0.08)]"
                style={{ background: testimonial.background }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={testimonial.name.split(" ").map((part) => part[0]).join("").slice(0, 2)} tint={testimonial.accent} />
                    <div>
                      <div className="text-[1rem] font-semibold text-[#1c1b30]">{testimonial.name}</div>
                      <div className="text-[0.95rem] text-[#6c6780]">{testimonial.handle}</div>
                    </div>
                  </div>
                  <span
                    className="rounded-md px-3 py-1 text-[0.92rem] font-semibold text-white"
                    style={{ background: testimonial.accent }}
                  >
                    {testimonial.role}
                  </span>
                </div>

                <p className="mt-6 max-w-[520px] text-[1.25rem] leading-[1.55] tracking-[-0.02em] text-[#2b283b]">
                  {testimonial.text}
                </p>

                <div className="mt-7">
                  <StarRow color={testimonial.accent} />
                </div>
              </article>
            ))}

            <button className="hidden justify-self-center text-[2.8rem] leading-none text-[#19182e] lg:block" aria-label="Next testimonials">
              ›
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#6d44ec]" />
            <span className="h-3 w-3 rounded-full bg-[#ded8ea]" />
            <span className="h-3 w-3 rounded-full bg-[#ded8ea]" />
          </div>
        </section>
      </div>
    </main>
  );
}
