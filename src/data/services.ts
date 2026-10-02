import { Service } from "@/types";

export const servicesData: Service[] = [
  {
    id: "sites",
    number: "01",
    title: "Sites & Experiências Digitais",
    tagline: "Landing pages, sites institucionais e presença digital com acabamento cirúrgico.",
    description:
      "Construímos sites que traduzem a credibilidade da sua empresa em uma presença profissional. Layouts com tipografia precisa, carregamento otimizado e arquitetura pensada para facilitar o contato comercial.",
    items: [
      "Landing pages focadas em alta taxa de conversão",
      "Sites institucionais com direção de arte editorial",
      "Experiências interativas com motion design GSAP",
      "Design responsivo absoluto para mobile e desktop",
    ],
    deliverable: "Interface proprietária, código limpo em Next.js e design responsivo.",
    impact: "Primeira impressão memorável e autoridade imediata no primeiro contato.",
  },
  {
    id: "seo-performance",
    number: "02",
    title: "SEO Técnico & Performance",
    tagline: "Arquitetura técnica otimizada para motores de busca, velocidade extrema e retenção.",
    description:
      "A estética só atinge seu potencial se o cliente conseguir encontrar sua empresa. Organizamos conteúdo, estrutura semântica, metadados e desempenho para facilitar a indexação e oferecer uma boa experiência de navegação.",
    items: [
      "Otimização de Core Web Vitals (LCP, INP, CLS)",
      "Estruturação de dados rica com Schema.org (JSON-LD)",
      "Carregamento progressivo de recursos e compressão avançada",
      "Auditoria contínua de rastreabilidade e sitemap dinâmico",
    ],
    deliverable: "Base técnica de SEO e desempenho preparada para cada projeto.",
    impact: "Visitas qualificadas sem depender exclusivamente de anúncios pagos.",
  },
  {
    id: "integracoes",
    number: "03",
    title: "Integrações Estratégicas",
    tagline: "WhatsApp, formulários inteligentes, Analytics, mapas e ecossistema de dados.",
    description:
      "Conectamos o seu site diretamente às ferramentas que sustentam sua operação diária. Cada clique no WhatsApp, preenchimento de formulário ou agendamento é rastreado com precisão milimétrica para nutrição de campanhas e CRM.",
    items: [
      "Gatilhos direcionados para atendimento via WhatsApp Business",
      "Formulários inteligentes com validação instantânea e webhook",
      "Google Analytics 4, Tag Manager e Meta Pixel configurados",
      "Integração com CRMs (RD Station, HubSpot, Pipefy, Active)",
    ],
    deliverable: "Fluxo unificado entre o site e a sua equipe comercial.",
    impact: "Eliminação de atrito: seu cliente clica e inicia uma conversa qualificada.",
  },
  {
    id: "automacao",
    number: "04",
    title: "Automação Comercial",
    tagline: "Fluxos de captura, qualificação e encaminhamento automático de oportunidades.",
    description:
      "Menos trabalho manual repetitivo, mais velocidade de resposta. Desenhamos fluxos automatizados que recebem o lead, organizam os dados no seu painel e notificam sua equipe em segundos, garantindo contato no momento mais quente.",
    items: [
      "Roteamento de leads por região, especialidade ou valor",
      "Disparo automático de confirmações e mensagens no WhatsApp",
      "Sincronização em tempo real com planilhas e bancos de dados",
      "Alertas imediatos para equipe de vendas via Telegram/Slack/Email",
    ],
    deliverable: "Automações rodando 24/7 sem necessidade de intervenção humana.",
    impact: "Tempo de resposta reduzido de horas para minutos no atendimento.",
  },
  {
    id: "sistemas",
    number: "05",
    title: "Sistemas & Soluções Sob Medida",
    tagline: "CRMs leves, portais de clientes, painéis internos e ferramentas proprietárias.",
    description:
      "Quando planilhas ficam limitadas e plataformas prontas são engessadas demais, criamos sistemas sob medida. Interfaces rápidas, intuitivas e desenhadas estritamente em torno da realidade da sua empresa.",
    items: [
      "Painéis administrativos e dashboards objetivos",
      "Áreas restritas para clientes, membros ou parceiros",
      "Controle de status de pedidos, projetos e atendimentos",
      "Arquitetura escalável com banco de dados em nuvem e segurança",
    ],
    deliverable: "Aplicação web sob medida com controle total dos seus dados.",
    impact: "Eficiência operacional e ferramenta que cresce junto com sua empresa.",
  },
];
