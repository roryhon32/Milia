import type { Lead } from "../crm/schemas";
import { HttpError } from "../security/guard";
export type ContactChannel = { url: string; channel: string };
// Future official integrations implement preparation and authorized delivery separately.
// This provider only creates a link. It cannot send a message.
export interface ContactProvider {
  prepare(lead: Lead): ContactChannel;
}
export class HumanContactProvider implements ContactProvider {
  prepare(lead: Lead): ContactChannel {
    const phone = lead.phone.replace(/\D/g, "");
    if (phone)
      return {
        url: `https://wa.me/${phone.length === 10 || phone.length === 11 ? `55${phone}` : phone}?text=${encodeURIComponent(lead.draft)}`,
        channel: "WhatsApp",
      };
    if (lead.email)
      return {
        url: `mailto:${lead.email}?subject=${encodeURIComponent("Uma ideia para " + lead.company)}&body=${encodeURIComponent(lead.draft)}`,
        channel: "E-mail",
      };
    throw new HttpError(
      400,
      "Cadastre telefone ou e-mail para abrir o contato.",
    );
  }
}
