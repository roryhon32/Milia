import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MonogramProps {
  className?: string;
  variant?: "dark" | "light";
  size?: number;
  priority?: boolean;
}

export function Monogram({
  className,
  variant = "light",
  size = 48,
  priority = false,
}: MonogramProps) {
  const src = variant === "light" ? "/monogram-light.png" : "/monogram-dark.png";

  return (
    <div
      className={cn("relative inline-block select-none", className)}
      style={{ width: size, height: size * 0.72 }}
    >
      <Image
        src={src}
        alt="Milia Monograma"
        fill
        sizes={`${size}px`}
        priority={priority}
        className="object-contain"
      />
    </div>
  );
}
