import type { Analysis } from "./schemas";
export function publicContacts(analysis: Analysis | null) {
  let phone = "", email = "";
  for (const finding of analysis?.findings || []) {
    if (finding.category !== "CONVERSION" || finding.confidence < .8) continue;
    try {
      const tel = finding.evidence.match(/tel:([^\s]+)/i)?.[1];
      if (tel && !phone) {
        const value = decodeURIComponent(tel).replace(/[^+\d]/g, "");
        if (/^\+?\d{8,20}$/.test(value)) phone = value;
      }
      const mail = finding.evidence.match(/mailto:([^\s?]+)/i)?.[1];
      if (mail && !email) { const value = decodeURIComponent(mail); if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254) email = value; }
      const link = finding.evidence.match(/https?:\/\/[^\s]+/i)?.[0];
      if (link && !phone) {
        const url = new URL(link);
        const value = url.hostname === "wa.me" ? url.pathname.slice(1) : url.hostname === "api.whatsapp.com" ? url.searchParams.get("phone") || "" : "";
        if (/^\+?\d{8,20}$/.test(value)) phone = value;
      }
    } catch { /* Malformed contacts remain unknown. */ }
  }
  return { phone, email };
}
