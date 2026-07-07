"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandLogo } from "../components/BrandLogo";
import { ThemeToggle } from "../components/theme-toggle";

type Role = "creator" | "brand";
type Mode = "login" | "register";
type Provider = "google" | "apple" | "linkedin";

type FieldConfig = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
};

const roleCopy = {
  creator: {
    title: {
      login: "Welcome back 👋🏻",
      register: "Create your creator account",
    },
    description: {
      login: "Buzz louder. Get hired.",
      register: "Set up your profile, showcase your niche, and start receiving brand opportunities.",
    },
    submit: {
      login: "Log in as Creator",
      register: "Create Creator Account",
    },
    switchPrompt: {
      login: "New to Buzzroster?",
      register: "Already have an account?",
    },
    switchAction: {
      login: "Create account",
      register: "Log in",
    },
    fields: {
      login: [
        { name: "email", label: "Email", type: "email", autoComplete: "email" },
        { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
      ] satisfies FieldConfig[],
      register: [
        { name: "fullName", label: "Full name", autoComplete: "name" },
        { name: "email", label: "Email", type: "email", autoComplete: "email" },
        { name: "instagram", label: "Instagram handle", autoComplete: "username" },
        { name: "password", label: "Password", type: "password", autoComplete: "new-password" },
      ] satisfies FieldConfig[],
    },
  },
  brand: {
    title: {
      login: "Welcome back 👋🏻",
      register: "Build your brand workspace",
    },
    description: {
      login: "Find creators from a roster.",
      register: "Launch a clean outreach and review flow for your next creator campaign.",
    },
    submit: {
      login: "Log in as Brand",
      register: "Create Brand Account",
    },
    switchPrompt: {
      login: "First time here?",
      register: "Already have a brand account?",
    },
    switchAction: {
      login: "Create account",
      register: "Log in",
    },
    fields: {
      login: [
        { name: "workEmail", label: "Work email", type: "email", autoComplete: "email" },
        { name: "password", label: "Password", type: "password", autoComplete: "current-password" },
      ] satisfies FieldConfig[],
      register: [
        { name: "companyName", label: "Company name", autoComplete: "organization" },
        { name: "workEmail", label: "Work email", type: "email", autoComplete: "email" },
        { name: "website", label: "Website", type: "url", autoComplete: "url" },
        { name: "password", label: "Password", type: "password", autoComplete: "new-password" },
      ] satisfies FieldConfig[],
    },
  },
} as const;

const providerLabels: Record<Provider, string> = {
  google: "Google",
  apple: "Apple",
  linkedin: "LinkedIn",
};

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.7-.06-1.37-.18-2.01H12v3.81h5.39a4.62 4.62 0 0 1-2 3.03v2.52h3.24c1.9-1.75 2.97-4.33 2.97-7.35Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.52c-.9.61-2.04.97-3.38.97-2.6 0-4.8-1.76-5.59-4.12H3.06v2.6A9.99 9.99 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.41 13.91A5.97 5.97 0 0 1 6.1 12c0-.66.11-1.3.31-1.91V7.49H3.06A9.99 9.99 0 0 0 2 12c0 1.61.39 3.13 1.06 4.51l3.35-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.96c1.47 0 2.79.5 3.83 1.48l2.87-2.87C16.95 2.94 14.7 2 12 2A9.99 9.99 0 0 0 3.06 7.49l3.35 2.6c.79-2.36 2.99-4.13 5.59-4.13Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M15.54 12.28c.03 2.77 2.43 3.69 2.45 3.71-.03.06-.38 1.32-1.26 2.62-.76 1.12-1.54 2.24-2.76 2.26-1.2.02-1.59-.72-2.98-.72-1.39 0-1.82.7-2.96.74-1.19.05-2.09-1.18-2.86-2.3-1.56-2.26-2.74-6.37-1.14-9.15.79-1.38 2.22-2.26 3.76-2.29 1.18-.02 2.28.79 2.98.79.7 0 2-.97 3.38-.83.57.02 2.19.24 3.24 1.76-.08.05-1.92 1.11-1.89 3.41Zm-2.1-7.93c.64-.77 1.05-1.82.93-2.88-.92.04-2.02.61-2.68 1.37-.59.68-1.1 1.74-.96 2.76 1.02.08 2.06-.52 2.71-1.25Z"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.94 8.5a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM5.43 18.9h3.03V9.75H5.43V18.9Zm4.93 0h3.03v-4.67c0-1.23.23-2.42 1.76-2.42 1.5 0 1.52 1.4 1.52 2.5v4.59h3.03v-5.2c0-2.56-.55-4.53-3.55-4.53-1.44 0-2.4.79-2.79 1.54h-.04v-1.31h-2.9c.04.85.04 9.5.04 9.5Z"
      />
    </svg>
  );
}

function ProviderIcon({ provider }: { provider: Provider }) {
  if (provider === "google") {
    return <GoogleIcon />;
  }

  if (provider === "apple") {
    return <AppleIcon />;
  }

  return <LinkedInIcon />;
}

function RoleToggle({
  role,
  onChange,
}: {
  role: Role;
  onChange: (role: Role) => void;
}) {
  return (
    <div className="grid grid-cols-2 rounded-[1.2rem] border border-border bg-surface p-1 shadow-[0_10px_24px_rgba(125,96,207,0.06)]">
      {(["creator", "brand"] as Role[]).map((item) => {
        const active = item === role;

        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-[1rem] px-4 py-3 text-sm font-semibold capitalize transition-all duration-200 ${
              active
                ? "bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_100%)] text-accent-foreground shadow-[0_14px_30px_rgba(91,61,215,0.24)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

function SocialButton({ provider }: { provider: Provider }) {
  const isLinkedIn = provider === "linkedin";
  const isApple = provider === "apple";

  return (
    <button
      type="button"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-[0_10px_24px_rgba(125,96,207,0.05)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-accent/30"
      aria-label={`Continue with ${providerLabels[provider]}`}
    >
      <span
        className={
          isLinkedIn
            ? "flex items-center justify-center text-[#0A66C2]"
            : isApple
              ? "flex translate-x-[0.5px] translate-y-[-0.5px] items-center justify-center text-[#111111]"
              : "flex items-center justify-center"
        }
      >
        <ProviderIcon provider={provider} />
      </span>
    </button>
  );
}

function AuthInput({ field }: { field: FieldConfig }) {
  return (
    <label className="block space-y-2">
      <span className="text-[0.92rem] font-medium text-muted-foreground">{field.label}</span>
      <input
        name={field.name}
        type={field.type ?? "text"}
        autoComplete={field.autoComplete}
        className="h-11 w-full rounded-2xl border border-border bg-surface px-4 text-sm text-foreground shadow-[0_8px_24px_rgba(125,96,207,0.04)] outline-none transition-[border-color,box-shadow,transform] duration-200 placeholder:text-muted-foreground focus:border-accent/40 focus:ring-4 focus:ring-[rgba(139,92,246,0.12)]"
      />
    </label>
  );
}

function AuthPanel({
  role,
  mode,
  onModeChange,
  onSubmit,
}: {
  role: Role;
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onSubmit: () => void;
}) {
  const copy = roleCopy[role];
  const fields = copy.fields[mode];

  return (
    <div className="flex flex-col">
      <div className="space-y-5">
      <div className="space-y-4 text-center">
          <div className="flex items-center justify-between gap-4">
            <BrandLogo />
            <ThemeToggle compact />
          </div>
          <div className="mx-auto h-px w-full max-w-[34rem] bg-border" />
          <div>
            <h1 className="font-[family-name:var(--font-serif)] text-[clamp(2rem,3vw,3.1rem)] font-medium leading-[0.95] tracking-[-0.05em] text-foreground">
              <span>{copy.title[mode].replace(" 👋🏻", "")}</span>
              <span className="wave-hand ml-3 inline-block align-[0.08em] text-[0.86em]">👋</span>
            </h1>
            {mode !== "login" ? (
              <p className="mx-auto mt-4 max-w-xl text-[0.98rem] leading-[1.6] text-muted-foreground">
                {copy.description[mode]}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <div className="text-center text-[0.96rem] font-semibold text-foreground">Continue with</div>
          <div className="mt-3 flex items-center justify-center gap-3.5">
            {(["google", "apple", "linkedin"] as Provider[]).map((provider) => (
              <SocialButton key={provider} provider={provider} />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Continue with email
            </span>
          </div>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className="space-y-3"
        >
          {fields.map((field) => (
            <AuthInput key={field.name} field={field} />
          ))}

          {mode === "login" ? (
            <div className="flex justify-end">
              <button type="button" className="text-[0.92rem] font-medium text-accent transition-colors hover:text-accent-strong">
                Forgot password?
              </button>
            </div>
          ) : null}

          <button
            type="submit"
            className="flex min-h-11 w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--accent)_0%,var(--accent-strong)_58%,#f0b44b_140%)] px-4 text-sm font-semibold text-accent-foreground shadow-glow transition duration-200 hover:-translate-y-0.5 hover:brightness-105"
          >
            {copy.submit[mode]}
          </button>
        </form>
      </div>

      <div className="mt-4 border-t border-border pt-4 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-2">
          <span>{copy.switchPrompt[mode]}</span>
          <button
            type="button"
            onClick={() => onModeChange(mode === "login" ? "register" : "login")}
            className="font-semibold text-foreground transition-colors hover:text-accent"
          >
            {copy.switchAction[mode]}
          </button>
        </div>
      </div>
    </div>
  );
}

function SlidingOverlay({
  role,
  onRoleChange,
}: {
  role: Role;
  onRoleChange: (role: Role) => void;
}) {
  const brandActive = role === "brand";
  const heading = brandActive ? "Welcome back 👋🏻" : "Welcome back 👋🏻";
  const body = brandActive
    ? "Find creators from a roster."
    : "Buzz louder. Get hired.";
  const actionLabel = brandActive ? "Continue as Creator" : "Continue as Brand";
  const nextRole: Role = brandActive ? "creator" : "brand";

  return (
    <div
      className={`absolute inset-y-0 hidden w-1/2 overflow-hidden rounded-[2rem] bg-[linear-gradient(155deg,var(--accent)_0%,var(--accent-strong)_42%,#2a2456_100%)] text-accent-foreground shadow-[0_30px_80px_rgba(91,61,215,0.26)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block ${
        brandActive ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.22),transparent_26%),radial-gradient(circle_at_76%_28%,rgba(240,180,75,0.2),transparent_22%),radial-gradient(circle_at_50%_85%,rgba(255,255,255,0.12),transparent_28%)]" />
      <div className="relative flex h-full flex-col justify-between p-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="max-w-[10ch] font-[family-name:var(--font-serif)] text-[clamp(2.4rem,4vw,4rem)] font-medium leading-[0.92] tracking-[-0.05em] text-white">
              {heading}
            </h2>
            <p className="max-w-sm text-[1rem] leading-7 text-white/78">{body}</p>
          </div>

          <button
            type="button"
            onClick={() => onRoleChange(nextRole)}
            className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/22 bg-white/10 px-6 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/16"
          >
            {actionLabel}
          </button>
        </div>

        <Link
          href="/"
          className="inline-flex min-h-11 w-fit items-center justify-center rounded-2xl border border-border bg-surface px-4 text-sm font-medium text-foreground shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition duration-200 hover:-translate-y-0.5 hover:bg-surface-muted"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const [role, setRole] = useState<Role>("creator");
  const [creatorMode, setCreatorMode] = useState<Mode>("login");
  const [brandMode, setBrandMode] = useState<Mode>("login");

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background px-4 py-6 text-foreground sm:px-6 xl:px-8 xl:py-5">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.16),transparent_68%)] blur-3xl" />
        <div className="absolute right-[-10rem] top-[16%] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(240,180,75,0.10),transparent_68%)] blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.14),transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-7xl items-center justify-center xl:max-w-[min(1180px,calc(100vw-4rem))]">
        <section className="glass-panel relative w-full overflow-hidden rounded-[2rem]">
          <div className="grid grid-cols-1 xl:min-h-[640px] xl:grid-cols-2">
            <div className="px-5 pt-6 sm:px-8 xl:hidden">
              <RoleToggle role={role} onChange={setRole} />
            </div>

            <div className="grid grid-cols-1 xl:col-span-2 xl:grid-cols-2">
              <div className="relative overflow-hidden px-5 pb-6 pt-6 sm:px-8 sm:pb-8 xl:px-9 xl:py-8">
                <div
                  className={`transition-all duration-500 ${
                    role === "creator"
                      ? "block translate-x-0 opacity-100"
                      : "hidden -translate-x-3 opacity-0 xl:pointer-events-none xl:block"
                  }`}
                >
                  <AuthPanel
                    role="creator"
                    mode={creatorMode}
                    onModeChange={setCreatorMode}
                    onSubmit={() => undefined}
                  />
                </div>
              </div>

              <div className="relative overflow-hidden px-5 pb-6 pt-6 sm:px-8 sm:pb-8 xl:px-9 xl:py-8">
                <div
                  className={`transition-all duration-500 ${
                    role === "brand"
                      ? "block translate-x-0 opacity-100"
                      : "hidden translate-x-3 opacity-0 xl:pointer-events-none xl:block"
                  }`}
                >
                  <AuthPanel
                    role="brand"
                    mode={brandMode}
                    onModeChange={setBrandMode}
                    onSubmit={() => undefined}
                  />
                </div>
              </div>
            </div>

            <SlidingOverlay role={role} onRoleChange={setRole} />
          </div>
        </section>
      </div>
    </main>
  );
}
