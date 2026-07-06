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
      className={`inline-flex items-center gap-3 text-[#241b45] ${className}`}
    >
      <span
        className={`relative overflow-hidden rounded-[1.1rem] border border-white/70 bg-white/80 shadow-[0_14px_30px_rgba(126,79,214,0.14)] ${
          compact ? "h-11 w-11" : "h-12 w-12"
        }`}
      >
        <Image src={logoImage} alt="" fill sizes="48px" className="object-cover" priority />
      </span>
      {!compact ? (
        <span className="font-[family-name:var(--font-pacifico)] text-[2rem] leading-none tracking-tight text-[#241b45]">
          Buzzroster
        </span>
      ) : null}
    </Link>
  );
}
