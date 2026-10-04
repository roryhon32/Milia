# MiliaCO

O site institucional fica na raiz. Os projetos completos ficam em `portfolio/Arquiteture` (Lumière Arquitetura) e `portfolio/Solar` (Solar Power Energy). A pasta original do site solar foi copiada de `C:\Users\Casa\Documents\milia`; o original foi preservado.

## Executar

Use Node.js 22.13 ou mais recente.

1. Execute `npm ci` na raiz e em cada pasta de projeto.
2. Execute `npm run build:portfolio` na raiz para gerar/copiar as demonstrações.
3. Execute `npm run dev` e abra http://localhost:3000.

Para produção: `npm run build` seguido de `npm start`. O build gera também os dois sites do portfólio. As demonstrações ficam em `/portfolio/lumiere/` e `/portfolio/solar/index.html`.

## Alterações no institucional

- Página reduzida de 14 para 7 blocos, com espaçamentos e títulos menores.
- Oferta inicial com preço de entrada, proposta e WhatsApp.
- Dois projetos reais do acervo em uma grade, com demonstrações completas e detalhes.
- Planos com escopo, contato contextual e formulário que envia a mensagem pelo WhatsApp.
- Projetos apresentados como estudos de portfólio, sem atribuir clientes ou resultados não comprovados.

Os contatos e preços existentes foram mantidos. Configure `NEXT_PUBLIC_WHATSAPP_NUMBER` conforme `.env.example`. O site solar mantém os conteúdos e contatos do projeto original; revise-os antes de publicar.

## Validação

`npm run typecheck`, `npm run lint` e `npm run build` na raiz. Cada demonstração possui seu próprio build.
