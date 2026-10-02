const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "";
const contactEmail = "contato@miliaco.com";

export const defaultContactMessage = "Olá! Vim pelo site da Milia Co. e gostaria de conversar sobre um projeto.";

export function contactUrl(message = defaultContactMessage) {
  if (whatsappNumber) return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent("Projeto para Milia Co.")}&body=${encodeURIComponent(message)}`;
}

export const hasWhatsApp = Boolean(whatsappNumber);

export const siteConfig = {
  name: "Milia Co.",
  legalName: "Milia Co. Digital Studio",
  tagline: "Sites que transformam presença digital em oportunidades.",
  subtext: "Criamos sites rápidos e profissionais para empresas que querem transformar pesquisas, visitas e cliques em contatos e oportunidades.",
  description: "Criação e desenvolvimento de sites para empresas, landing pages e negócios locais. Sites profissionais, responsivos e preparados para transformar visitas em contatos.",
  url: "https://miliaco.com",
  location: "Brasil • Projetos Nacionais e Internacionais",
  whatsappUrl: contactUrl(),
  email: contactEmail,
  socials: {
    instagram: "https://instagram.com/miliaco.studio",
    linkedin: "https://linkedin.com/company/miliaco",
  },
  navLinks: [
    { label: "Projetos", href: "#projetos" },
    { label: "Serviços", href: "#servicos" },
    { label: "Processo", href: "#processo" },
    { label: "Sobre", href: "#sobre" },
    { label: "Planos", href: "#planos" },
    { label: "Contato", href: "#contato" },
  ],
};
