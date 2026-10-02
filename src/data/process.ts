import type { ProcessStep } from "@/types";

export const processData: ProcessStep[] = [
  {
    number: "01",
    title: "Conversamos",
    subtitle: "Seu negócio, seu público e seu objetivo.",
    description: "Entendemos o que sua empresa faz, quem precisa alcançar e quais informações o site deve apresentar. A partir disso, definimos juntos o escopo e a proposta.",
    deliverables: ["Conversa inicial", "Escopo definido", "Proposta clara"],
    duration: "Etapa 1",
  },
  {
    number: "02",
    title: "Criamos",
    subtitle: "Uma primeira versão para você conhecer.",
    description: "Organizamos o conteúdo, desenhamos a interface e desenvolvemos a primeira versão responsiva do seu site.",
    deliverables: ["Estrutura de conteúdo", "Design", "Primeira versão"],
    duration: "Etapa 2",
  },
  {
    number: "03",
    title: "Você aprova",
    subtitle: "Apresentação, ajustes e refinamento.",
    description: "Apresentamos o projeto, ouvimos seu retorno e fazemos os ajustes combinados antes da publicação.",
    deliverables: ["Apresentação", "Revisão", "Aprovação"],
    duration: "Etapa 3",
  },
  {
    number: "04",
    title: "Publicamos",
    subtitle: "Domínio, hospedagem e site no ar.",
    description: "Cuidamos da compra, do registro e da configuração do domínio, preparamos a hospedagem e o SSL, testamos a experiência e colocamos o site no ar.",
    deliverables: ["Domínio e hospedagem", "Testes finais", "Publicação"],
    duration: "Etapa 4",
  },
];
