export interface ImageCredit {
  id: string;
  subject: string;
  photographer: string;
  platform: "Wikimedia Commons (Open Source)" | "Public Domain / CC0";
  sourceUrl: string;
  license: string;
}

export interface ProjectItem {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  category: "Residencial" | "Interiores" | "Comercial";
  location: string;
  state: string;
  year: string;
  isConcept: boolean;
  conceptBadge: string;
  coverImage: string;
  gallery: {
    url: string;
    caption: string;
  }[];
  overview: string;
  conceptText: string;
  materials: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export const STUDIO_BRAND = {
  name: "LUMIÈRE",
  subtitle: "ARQUITETURA",
  fullName: "Lumière Arquitetura",
  headline: "Espaços que atravessam o tempo.",
  subheadline:
    "Projetamos espaços contemporâneos que equilibram estética, funcionalidade, contexto e identidade.",
  topTags: ["ARQUITETURA", "INTERIORES", "BRASIL"],
  baseCity: "Salvador, BA",
  reach: "Salvador, BA e todo o Brasil",
  heroImage: "/portfolio/lumiere/images/hero.jpg",
  aboutImage: "/portfolio/lumiere/images/estudio-luz.jpg",
  contactImage: "/portfolio/lumiere/images/contato-patio.jpg",
  contact: {
    whatsapp: "5571999999999",
    whatsappDisplay: "+55 (71) 9 9999-9999 (placeholder)",
    email: "lucas@lumiere.arq.br",
    instagram: "@lumiere.arquitetura",
    pinterest: "lumiere.arquitetura",
  },
  disclaimer:
    "Projeto demonstrativo. As imagens e projetos apresentados nesta página são utilizados exclusivamente para fins de conceito visual e apresentação de layout. Não representam obras executadas pelo profissional fictício apresentado.",
};

export const ARCHITECT_INFO = {
  name: "Lucas Andrade",
  role: "Arquiteto e fundador",
  quote1:
    "Acredito que bons espaços começam pela escuta. Cada projeto nasce do contexto, da rotina de quem vai utilizá-lo e da relação entre luz, material e proporção.",
  quote2:
    "Meu trabalho é criar arquiteturas que fazem sentido para a vida real, com estética, funcionalidade e permanência.",
  photo: "/portfolio/lumiere/images/arquiteto-lucas.jpg",
  formation: "Graduação em Arquitetura e Urbanismo (placeholder)",
  focus: "Arquitetura Residencial e Interiores",
  location: "Salvador, BA (e projetos em todo o Brasil)",
  email: "lucas@lumiere.arq.br",
  phone: "+55 (71) 9 9999-9999 (placeholder)",
  cau: "Em breve (placeholder)",
};

export const PROJECTS: ProjectItem[] = [
  {
    slug: "casa-horizonte",
    number: "01",
    title: "Casa Horizonte",
    tagline: "Diálogo entre planos horizontais de concreto e o horizonte costeiro.",
    category: "Residencial",
    location: "Bahia",
    state: "BA",
    year: "2026",
    isConcept: true,
    conceptBadge: "Projeto conceito",
    coverImage: "/portfolio/lumiere/images/casa-horizonte.jpg",
    gallery: [
      {
        url: "/portfolio/lumiere/images/casa-horizonte.jpg",
        caption: "Balanço estrutural e raia de água voltados para o mar.",
      },
      {
        url: "/portfolio/lumiere/images/hero.jpg",
        caption: "Integração contínua entre varanda sombreada e paisagem costeira.",
      },
      {
        url: "/portfolio/lumiere/images/casa-mare.jpg",
        caption: "Abertura zenital e escada de concreto escultórica.",
      },
    ],
    overview:
      "Estudo de residência unifamiliar costeira explorando balanços em concreto aparente, brises móveis de madeira e integração fluida entre áreas de convivência e a brisa marítima.",
    conceptText:
      "A implantação busca sombreamento profundo e ventilação cruzada constante, minimizando a necessidade de climatização artificial e valorizando a linha contínua do horizonte.",
    materials: [
      "Concreto aparente ripado",
      "Madeira cumaru de manejo sustentável",
      "Pedra natural rústica",
      "Caixilhos em alumínio bronze",
    ],
    specs: [
      { label: "Área Estimada", value: "680 m² (conceito)" },
      { label: "Tipologia", value: "Residencial Unifamiliar" },
      { label: "Localização de Estudo", value: "Litoral Sul, Bahia" },
      { label: "Ano de Concepção", value: "2026" },
      { label: "Status", value: "Estudo Visual / Conceito" },
    ],
  },
  {
    slug: "casa-patio",
    number: "02",
    title: "Casa Pátio",
    tagline: "Serenidade interior em torno de claustros vegetados e luz difusa.",
    category: "Interiores",
    location: "São Paulo",
    state: "SP",
    year: "2026",
    isConcept: true,
    conceptBadge: "Projeto conceito",
    coverImage: "/portfolio/lumiere/images/casa-patio.jpg",
    gallery: [
      {
        url: "/portfolio/lumiere/images/casa-patio.jpg",
        caption: "Living banhado por luz natural, tecidos claros e marcenaria suave.",
      },
      {
        url: "/portfolio/lumiere/images/servicos-dining.jpg",
        caption: "Encontro de texturas de linho lavado, madeira e tons minerais.",
      },
      {
        url: "/portfolio/lumiere/images/estudio-luz.jpg",
        caption: "Visada para o pátio verde integrado.",
      },
    ],
    overview:
      "Conceito de arquitetura de interiores que privilegia a pureza visual, materiais táteis e o contato contínuo com um jardim interno protegido.",
    conceptText:
      "O mobiliário de desenho limpo dialoga com revestimentos de cal natural e madeiras claras, proporcionando um refúgio de silêncio e acolhimento em meio ao ritmo urbano.",
    materials: [
      "Marcenaria em lâmina de freijó claro",
      "Pintura mineral com base de cal",
      "Tecidos em puro linho cru",
      "Mármore travertino levigado",
    ],
    specs: [
      { label: "Área de Intervenção", value: "320 m² (conceito)" },
      { label: "Tipologia", value: "Design de Interiores" },
      { label: "Localização de Estudo", value: "São Paulo, SP" },
      { label: "Ano de Concepção", value: "2026" },
      { label: "Status", value: "Estudo Visual / Conceito" },
    ],
  },
  {
    slug: "casa-mare",
    number: "03",
    title: "Casa Maré",
    tagline: "Volumes minerais integrados à topografia e à vegetação nativa litorânea.",
    category: "Residencial",
    location: "Litoral Norte",
    state: "BA",
    year: "2025",
    isConcept: true,
    conceptBadge: "Projeto conceito",
    coverImage: "/portfolio/lumiere/images/casa-mare.jpg",
    gallery: [
      {
        url: "/portfolio/lumiere/images/casa-mare.jpg",
        caption: "Volumes sobrepostos de concreto e pedra arenito na paisagem.",
      },
      {
        url: "/portfolio/lumiere/images/contato-patio.jpg",
        caption: "Pátio intermediário com vegetação tropical nativa.",
      },
    ],
    overview:
      "Estudo volumétrico em encosta litorânea que investiga o equilíbrio entre a robustez da pedra bruta e a leveza de pérgolas de madeira.",
    conceptText:
      "A residência fragmenta-se em diferentes pavilhões conectados por passarelas ao ar livre, preservando a vegetação existente e acomodando-se aos desníveis naturais do terreno.",
    materials: [
      "Pedra moledo assentada a seco",
      "Concreto pigmentado em tom areia",
      "Pergolados em cumaru",
      "Vidros de alta transparência e controle solar",
    ],
    specs: [
      { label: "Área Estimada", value: "540 m² (conceito)" },
      { label: "Tipologia", value: "Residencial Litorânea" },
      { label: "Localização de Estudo", value: "Litoral Norte, Bahia" },
      { label: "Ano de Concepção", value: "2025" },
      { label: "Status", value: "Estudo Visual / Conceito" },
    ],
  },
];

export const PHILOSOPHY_PRINCIPLES = [
  {
    number: "01",
    title: "Contexto",
    description: "Cada projeto começa pela leitura do lugar.",
  },
  {
    number: "02",
    title: "Matéria",
    description: "Materiais também constroem experiências.",
  },
  {
    number: "03",
    title: "Permanência",
    description: "Buscamos criar espaços que continuem relevantes com o tempo.",
  },
];

export const SERVICES = [
  {
    id: "residencial",
    number: "01",
    title: "Arquitetura residencial",
    image: "/portfolio/lumiere/images/servicos-dining.jpg",
    description:
      "Projetos residenciais unifamiliares contemporâneos, desenhados para a rotina de cada família com foco em ventilação natural, conforto e identidade.",
  },
  {
    id: "comercial",
    number: "02",
    title: "Arquitetura comercial",
    image: "/portfolio/lumiere/images/hero.jpg",
    description:
      "Espaços de trabalho, hotelaria e comércio desenhados para transmitir a identidade da marca e proporcionar experiências espaciais memoráveis.",
  },
  {
    id: "interiores",
    number: "03",
    title: "Interiores",
    image: "/portfolio/lumiere/images/casa-patio.jpg",
    description:
      "Concepção completa de interiores, marcenaria sob medida, iluminação arquitetônica e curadoria de materiais sensoriais.",
  },
  {
    id: "reformas",
    number: "04",
    title: "Reformas",
    image: "/portfolio/lumiere/images/casa-mare.jpg",
    description:
      "Intervenções contemporâneas em imóveis existentes, ressignificando espaços e integrando ambientes à vida moderna.",
  },
  {
    id: "consultoria",
    number: "05",
    title: "Consultoria",
    image: "/portfolio/lumiere/images/casa-horizonte.jpg",
    description:
      "Avaliação técnica de terrenos, viabilidade construtiva, insolação e potencial arquitetônico antes da aquisição.",
  },
  {
    id: "acompanhamento",
    number: "06",
    title: "Acompanhamento de obra",
    image: "/portfolio/lumiere/images/contato-patio.jpg",
    description:
      "Direção estética e suporte técnico durante a execução para assegurar a fidelidade dos detalhes e acabamentos projetados.",
  },
];

export const PROCESS_STAGES = [
  {
    number: "01",
    title: "Descoberta",
    description: "Escuta, entendimento do lugar e das necessidades.",
  },
  {
    number: "02",
    title: "Conceito",
    description: "Estudos iniciais e direção criativa.",
  },
  {
    number: "03",
    title: "Projeto",
    description: "Desenvolvimento técnico e detalhamento.",
  },
  {
    number: "04",
    title: "Execução",
    description: "Acompanhamento e suporte na obra.",
  },
];

export const MATERIALS_LIST = [
  {
    name: "Pedra",
    description: "Texturas brutas, térmicas e atemporais.",
    image: "/portfolio/lumiere/images/mat-pedra.jpg",
  },
  {
    name: "Madeira",
    description: "Calor tátil, veios naturais e acolhimento.",
    image: "/portfolio/lumiere/images/mat-madeira.jpg",
  },
  {
    name: "Tecido",
    description: "Linhos lavados e tramas naturais suaves.",
    image: "/portfolio/lumiere/images/mat-tecido.jpg",
  },
  {
    name: "Vegetação",
    description: "Espécies nativas integradas à arquitetura.",
    image: "/portfolio/lumiere/images/mat-vegetacao.jpg",
  },
];

export const IMAGE_CREDITS: ImageCredit[] = [
  {
    id: "cred-1",
    subject: "Residência contemporânea e piscina (Hero)",
    photographer: "Architectural Visualizer",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:3D_Rendering_of_Modern_Luxury_Villa_Exterior_with_Pool.jpg",
    license: "Creative Commons CC-BY-SA 4.0 / Open Source",
  },
  {
    id: "cred-2",
    subject: "Villa costeira com varanda e piscina (Casa Horizonte)",
    photographer: "Sala Choengmon",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sala_Choengmon_Pool_Villa.jpg",
    license: "Creative Commons Attribution-ShareAlike 3.0",
  },
  {
    id: "cred-3",
    subject: "Living contemporâneo com mobiliário e jardim (Casa Pátio)",
    photographer: "Interior Design Archives",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Modern_living_room_with_stylish_furniture_and_a_view_of_the_outdoors_in_a_cozy_apartment_setting.jpg",
    license: "Creative Commons CC0 1.0 Universal / Domínio Público",
  },
  {
    id: "cred-4",
    subject: "Casa contemporânea em pedra e concreto (Casa Maré)",
    photographer: "Architectural Documentation Project",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:A_Stone_House_With_a_Stone_Wall.jpg",
    license: "Creative Commons Attribution 2.0 Generic",
  },
  {
    id: "cred-5",
    subject: "Luz solar e sombras sobre parede de cal (Estúdio & Filosofia)",
    photographer: "Urban Photography Archive",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Angel_shadow_on_dining_room_wall.jpg",
    license: "Creative Commons CC0 Public Domain",
  },
  {
    id: "cred-6",
    subject: "Retrato editorial do arquiteto (Lucas Andrade - Placeholder)",
    photographer: "Historical Architecture Archive",
    platform: "Public Domain / CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sumner_M._Spaulding_1926_portrait_photo.jpg",
    license: "Public Domain Dedication (CC0)",
  },
  {
    id: "cred-7",
    subject: "Sala de jantar com mesa de madeira e cadeiras (Serviços)",
    photographer: "Amantaka Luxury Resort",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Restaurant_room_of_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg",
    license: "Creative Commons Attribution-ShareAlike 4.0",
  },
  {
    id: "cred-8",
    subject: "Textura de alvenaria em pedra rústica (Materialidade - Pedra)",
    photographer: "Veronese Stonework",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Veronese_masonry.JPG",
    license: "Creative Commons CC-BY-SA 3.0",
  },
  {
    id: "cred-9",
    subject: "Textura de madeira natural (Materialidade - Madeira)",
    photographer: "Poly Haven Textures",
    platform: "Public Domain / CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Weathered_wood_texture.jpg",
    license: "CC0 1.0 Universal Public Domain",
  },
  {
    id: "cred-10",
    subject: "Textura de tecido de linho cru (Materialidade - Tecido)",
    photographer: "Textile Heritage Archives",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Book_cover_fabric_-_Flickr_-_Delany_Dean.jpg",
    license: "Creative Commons Attribution 2.0 Generic",
  },
  {
    id: "cred-11",
    subject: "Folhagem e vegetação em luz natural (Materialidade - Vegetação)",
    photographer: "W.carter Nature Collection",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Sunlight_on_beech_leaves_in_Gullmarsskogen_ravine_2.jpg",
    license: "Creative Commons Attribution-Share Alike 4.0",
  },
  {
    id: "cred-12",
    subject: "Pátio com oliveiras e arquitetura em pedra (Contato)",
    photographer: "Courtyard Garden Heritage",
    platform: "Wikimedia Commons (Open Source)",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Courtyard_Garden_-_Moving_the_olive_tree_(c60bba73-5d6d-443c-9f0f-9a2bd985c8e2).jpg",
    license: "Creative Commons Attribution 2.0 Generic",
  },
];
