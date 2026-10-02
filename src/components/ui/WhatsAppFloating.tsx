"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";

export function WhatsAppFloating() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay appearance slightly so it glides in smoothly after initial hero animation
    const timer = setTimeout(() => {
      setMounted(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className={`fixed bottom-6 right-6 z-40 transition-all duration-700 ease-out ${
        mounted
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar pelo WhatsApp da Milia Co."
        data-cursor-text="WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#0C0D0F] text-white border border-white/25 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        {/* Official WhatsApp Symbol in strictly Black and White */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 fill-current transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7 8.5 7 9.72C7 10.94 7.89 12.12 8.01 12.28C8.14 12.44 9.75 14.94 12.22 16C12.81 16.25 13.27 16.41 13.63 16.52C14.22 16.71 14.76 16.68 15.19 16.62C15.67 16.55 16.66 16.02 16.87 15.43C17.07 14.84 17.07 14.34 17.01 14.24C16.95 14.13 16.79 14.07 16.54 13.95C16.3 13.82 15.08 13.22 14.85 13.14C14.63 13.06 14.46 13.02 14.3 13.26C14.13 13.51 13.66 14.07 13.51 14.24C13.37 14.4 13.22 14.42 12.98 14.3C12.73 14.17 11.95 13.92 11.02 13.09C10.3 12.45 9.81 11.66 9.67 11.41C9.53 11.17 9.65 11.04 9.78 10.91C9.89 10.8 10.03 10.62 10.16 10.47C10.28 10.32 10.32 10.21 10.4 10.05C10.49 9.88 10.44 9.74 10.38 9.62C10.32 9.5 9.83 8.3 9.62 7.81C9.43 7.33 9.23 7.4 9.07 7.39C8.93 7.38 8.76 7.33 8.53 7.33Z" />
        </svg>

        {/* Minimalist Monochrome Tooltip Label on Desktop Hover */}
        <span className="pointer-events-none absolute right-full mr-3 hidden sm:inline-block px-2.5 py-1 bg-white text-black font-mono-tech uppercase text-[10px] tracking-wider whitespace-nowrap opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
          WhatsApp
        </span>
      </a>
    </aside>
  );
}
