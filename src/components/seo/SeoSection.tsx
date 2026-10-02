const foundations = [
  "Títulos e páginas organizados semanticamente",
  "Boa experiência no celular e carregamento otimizado",
  "Metadados, sitemap e URLs claras",
  "Google Search Console quando aplicável",
];

const searchFlow = ["Pesquisa por serviço + cidade", "Google entende o site", "Cliente conhece a empresa", "Conversa pelo WhatsApp"];

export function SeoSection() {
  return (
    <section className="border-b border-white/[0.08] bg-[#111215] px-6 py-24 md:px-10 lg:py-36" aria-labelledby="seo-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-8 text-xs font-mono-tech text-neutral-400">
          <span>VISIBILIDADE ORGÂNICA</span>
          <span>SEO SEM PROMESSAS IMPOSSÍVEIS</span>
        </div>

        <div className="grid gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 id="seo-title" className="font-heading text-3xl font-light leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Seu site precisa ser <span className="italic font-serif">encontrado</span>.
            </h2>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-neutral-300">
              SEO é o conjunto de ajustes que ajuda mecanismos de busca como o Google a entender o que sua empresa faz, onde atua e quais serviços oferece. Isso aumenta as chances de aparecer quando alguém procura pelo que você oferece.
            </p>
          </div>
          <p className="self-end border-l border-white/20 pl-6 font-heading text-xl font-light leading-snug text-white sm:text-2xl lg:col-span-5">
            Um site bonito que ninguém encontra resolve apenas metade do problema.
          </p>
        </div>

        <div className="border-y border-white/[0.08] py-8">
          <p className="mb-6 text-xs font-mono-tech uppercase tracking-wider text-neutral-400">Um caminho possível</p>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {searchFlow.map((step, index) => (
              <li key={step} className="flex items-start gap-4 border-l border-white/20 pl-4 text-sm text-neutral-200">
                <span className="font-mono-tech text-[11px] text-neutral-500">0{index + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-10 pt-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h3 className="font-heading text-2xl font-light text-white sm:text-3xl">A base técnica já faz parte do projeto.</h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              O posicionamento nas buscas também depende de concorrência, conteúdo, autoridade, região e tempo. SEO técnico prepara o site para ser entendido e indexado; não garante uma posição específica.
            </p>
          </div>
          <ul className="space-y-3 lg:col-span-7">
            {foundations.map((item) => (
              <li key={item} className="border-b border-white/[0.08] pb-3 text-sm text-neutral-200">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
