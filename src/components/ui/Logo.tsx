import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light"; // "dark" = dark logo for light background; "light" = white logo for dark background
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  className,
  variant = "light",
  showWordmark = true,
  size = "md",
}: LogoProps) {
  const isDarkBg = variant === "light";
  const monogramSrc = isDarkBg ? "/monogram-light.png" : "/monogram-dark.png";
  const wordmarkSrc = isDarkBg ? "/wordmark-light.png" : "/wordmark-dark.png";

  const sizeStyles = {
    sm: { monogram: "w-6 h-5", wordmark: "h-3.5 w-auto" },
    md: { monogram: "w-8 h-6", wordmark: "h-4.5 w-auto" },
    lg: { monogram: "w-11 h-9", wordmark: "h-6 w-auto" },
  };

  return (
    <Link
      href="/"
      aria-label="Milia Co. - Página Inicial"
      className={cn(
        "group inline-flex items-center gap-2.5 transition-opacity duration-300 hover:opacity-85 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40",
        className
      )}
    >
      <div className={cn("relative flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.03]", sizeStyles[size].monogram)}>
        <Image
          src={monogramSrc}
          alt="Monograma Milia Co."
          fill
          sizes="60px"
          priority
          className="object-contain"
        />
      </div>
      {showWordmark && (
        <div className={cn("relative flex-shrink-0", sizeStyles[size].wordmark)}>
          <Image
            src={wordmarkSrc}
            alt="Milia Co."
            width={120}
            height={28}
            priority
            className="h-full w-auto object-contain"
          />
        </div>
      )}
    </Link>
  );
}
