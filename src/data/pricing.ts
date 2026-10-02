import { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
  {
    id: "essencial",
    name: "Essencial",
    startingPrice: "R$ 689",
    previousStartingPrice: "R$ 890",
    tagline: "Melhor custo-benefício para começar com um site profissional.",
    description:
      "A solução ideal para profissionais liberais, consultórios e empresas que precisam substituir uma página improvisada por uma presença digital elegante, rápida e confiável.",
    scope: [
      "Site profissional para apresentar sua empresa e seus serviços",
      "Design responsivo para celular e desktop",
      "Contato pelo WhatsApp",
      "SEO técnico básico",
      "Google Maps quando aplicável",
      "Compra, registro inicial e configuração do domínio incluídos",
      "Certificado SSL",
    ],
    idealFor: "Profissionais liberais, consultórios e empresas iniciando sua presença digital séria.",
    firstYearHosting: "Hospedagem grátis durante o primeiro ano.",
    renewalTerms: "Após o primeiro ano: R$ 39/mês para hospedagem e manutenção técnica.",
  },
  {
    id: "profissional",
    name: "Profissional",
    startingPrice: "R$ 1.290",
    tagline: "Mais páginas, SEO e estrutura para empresas em crescimento.",
    description:
      "Uma plataforma institucional completa com refinamento editorial, múltiplos pontos de contato, animações sutis em GSAP e estrutura avançada para atração de clientes orgânicos.",
    scope: [
      "Site institucional completo (até 6 páginas ou seções detalhadas de serviços e cases)",
      "Direção de arte personalizada e microinterações elegantes em GSAP",
      "SEO técnico aprofundado com Schema.org estruturado para busca no Google",
      "Integração analítica completa (Google Analytics 4 + Meta Pixel / Google Ads)",
      "Formulários inteligentes com validação e confirmação imediata",
      "Otimização de Core Web Vitals conforme o escopo e a infraestrutura do projeto",
      "Treinamento rápido para atualização de conteúdos",
    ],
    idealFor: "Empresas consolidadas, escritórios de arquitetura, clínicas e serviços especializados.",
  },
  {
    id: "sob-medida",
    name: "Sob Medida",
    startingPrice: "R$ 2.490",
    tagline: "CRM, automações e integrações para operações mais complexas.",
    description:
      "Desenvolvimento de alto nível com arquitetura de software dedicada. Inclui fluxos comerciais automatizados, conexão com CRMs, portais restritos ou ferramentas interativas.",
    scope: [
      "Arquitetura de sistema personalizada desenvolvida em Next.js e TypeScript",
      "Fluxos de automação comercial (captura de lead, qualificação e disparo imediato)",
      "Integração profunda com CRMs externos, webhooks e bancos de dados",
      "Ferramentas interativas (simuladores de custo, calculadoras, portais de clientes)",
      "Ambiente de homologação pré-lançamento e testes de segurança",
      "Suporte prioritário e consultoria técnica direta com o estúdio",
    ],
    idealFor: "Empresas com operação ativa que buscam automatizar processos e escalar atendimento.",
  },
];

export const pricingDisclaimer = "O valor final depende do escopo e das necessidades do projeto.";
