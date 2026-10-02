const included = [
  "Site responsivo",
  "Contato pelo WhatsApp",
  "SEO técnico",
  "Carregamento otimizado",
  "Google Maps quando aplicável",
  "Analytics quando aplicável",
  "Compra e configuração do domínio",
  "Certificado SSL",
  "Hospedagem",
  "Suporte técnico",
];

const benefits = [
  "Ser encontrada em pesquisas",
  "Explicar seus serviços com clareza",
  "Construir confiança",
  "Centralizar informações importantes",
  "Levar o visitante até uma conversa",
];

export function BusinessValueSection() {
  return (
    <section className="border-b border-white/[0.08] bg-[#0C0D0F] px-6 py-24 md:px-10 lg:py-36" aria-labelledby="business-value-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-8 text-xs font-mono-tech text-neutral-400">
          <span>O QUE VOCÊ RECEBE</span>
          <span>UMA PRESENÇA DIGITAL COMPLETA</span>
        </div>

        <div className="grid gap-12 py-12 sm:py-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 id="business-value-title" className="max-w-xl font-heading text-3xl font-light leading-tight tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
              Um site completo para apresentar seu negócio.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-neutral-400">
              O projeto reúne apresentação, contato e a base técnica necessária para sua empresa ter um endereço próprio na internet. Cada entrega é definida conforme o plano e o escopo contratado.
            </p>
          </div>
          <ul className="grid grid-cols-1 border-t border-white/[0.08] sm:grid-cols-2 lg:col-span-6" aria-label="Entregas possíveis conforme o projeto">
            {included.map((item, index) => (
              <li key={item} className="flex items-baseline gap-4 border-b border-white/[0.08] py-4 pr-4 text-sm text-neutral-200">
                <span className="font-mono-tech text-[10px] text-neutral-500">{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-10 border-t border-white/[0.08] pt-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="mb-4 text-xs font-mono-tech uppercase tracking-wider text-neutral-400">Redes sociais + site próprio</p>
            <h3 className="max-w-xl font-heading text-2xl font-light leading-tight text-white sm:text-4xl">
              Sua empresa também pode ser encontrada fora das redes sociais.
            </h3>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-neutral-400">
              O Instagram ajuda pessoas a descobrirem sua marca e acompanharem seu trabalho. Um site próprio complementa essa presença quando alguém procura por um serviço, precisa entender sua oferta ou quer entrar em contato.
            </p>
          </div>
          <ul className="space-y-3 lg:col-span-6">
            {benefits.map((benefit) => (
              <li key={benefit} className="border-b border-white/[0.08] pb-3 text-sm text-neutral-200">{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
