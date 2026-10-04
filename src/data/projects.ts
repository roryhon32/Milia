import { Project } from "@/types";
export const projectsData: Project[] = [
  {
    id: "lumiere", title: "Lumière Arquitetura", subtitle: "Portfólio editorial para um estúdio de arquitetura", segment: "Arquitetura & Interiores", badge: "Estudo de interface", year: "2026",
    objective: "Valorizar os projetos e facilitar o primeiro contato de quem deseja construir ou renovar um espaço.",
    services: ["Site institucional", "Galeria de projetos", "Experiência responsiva"],
    description: "Uma apresentação visual de arquitetura com projetos, materiais, serviços e processo de trabalho.",
    solution: "Fotografias em destaque, páginas individuais de projetos e navegação direta até o contato.",
    deliverables: ["Página inicial", "Galeria e páginas de projetos", "Apresentação do estúdio e serviços"],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"], aspectRatio: "16/10", theme: "light",
    previewUrl: "/portfolio/lumiere/", imageSrc: "/portfolio-covers/lumiere-site.jpg"
  },
  {
    id: "solar-power", title: "Solar Power Energy", subtitle: "Apresentação de soluções e simulação de economia", segment: "Energia Solar", badge: "Estudo de interface", year: "2026",
    objective: "Explicar a oferta de energia solar e conduzir o visitante da simulação a uma solicitação de estudo.",
    services: ["Site comercial", "Simulador interativo", "Fluxo de contato"],
    description: "Site de energia solar com soluções, segmentos atendidos, projetos e uma calculadora de economia.",
    solution: "Uma jornada guiada por simulação, apresentação de serviços e solicitação de contato.",
    deliverables: ["Página comercial responsiva", "Calculadora de economia", "Galeria e formulários"],
    techStack: ["React", "TypeScript", "Vite", "Tailwind CSS"], aspectRatio: "16/10", theme: "light",
    previewUrl: "/portfolio/solar/index.html", imageSrc: "/portfolio-covers/solar.jpg"
  }
];


