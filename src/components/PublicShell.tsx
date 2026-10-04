"use client";
import { usePathname } from "next/navigation";
import { Navbar } from "./header/Navbar";
import { Footer } from "./footer/Footer";
import { WhatsAppFloating } from "./ui/WhatsAppFloating";
import { ContactBrief } from "./ui/ContactBrief";
import { ChatWidget } from "./chat/ChatWidget";
export function PublicShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path.startsWith("/crm") || path.startsWith("/outreach"))
    return <main id="main-content">{children}</main>;
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppFloating />
      <ContactBrief />
      <ChatWidget />
    </>
  );
}
