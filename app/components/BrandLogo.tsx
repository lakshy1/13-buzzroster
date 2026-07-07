import Image from "next/image";
import Link from "next/link";

import logoImage from "../../assets/Images/logo.jpeg";

type BrandLogoProps = {
  compact?: boolean;
  className?: string;
};

export function BrandLogo({ compact = false, className = "" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Buzzroster home"
      className={`inline-flex items-center gap-3 text-foreground transition-colors duration-300 ${className}`}
    >
      <span
        className={`relative overflow-hidden rounded-[1.1rem] border border-border bg-surface shadow-[0_14px_30px_rgba(126,79,214,0.14)] transition-all duration-300 ${
          compact ? "h-11 w-11" : "h-12 w-12"
        }`}
      >
        <Image src={logoImage} alt="" fill sizes="48px" className="object-cover" priority />
      </span>
      {!compact ? (
        <span className="font-[family-name:var(--font-pacifico)] text-[1.95rem] leading-none tracking-tight text-foreground drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)] transition-all duration-300 dark:drop-shadow-[0_0_14px_rgba(139,92,246,0.16)]">
          Buzzroster
        </span>
      ) : null}
    </Link>
  );
}
