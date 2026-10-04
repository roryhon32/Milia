# Milia Co. — operação comercial assistida

## O que existia

O institucional usa Next.js 16.3, React 19, TypeScript, Tailwind e GSAP. Os textos, serviços, planos e FAQ estavam em `src/data`. Não havia banco, autenticação, CRM ou serviço de IA. O projeto Lumière usa Next.js com exportação estática; o Solar usa Vite. Ambos continuam em `portfolio/`, com demos servidas em `public/portfolio`.

O trabalho foi incorporado ao aplicativo existente. A identidade monocromática, os planos Essencial e Profissional, as miniaturas reais do portfólio, o cursor nativo personalizado e o formulário anterior ao WhatsApp foram preservados. O desconto riscado sem histórico verificável foi removido da configuração comercial.

## Acesso e execução

Execute na pasta `MiliaCO`. Use Node.js 22.13 ou superior compatível com as dependências.

```powershell
npm ci
npm run setup:crm
npm run dev
```

Frontend e backend são o mesmo processo Next.js. Não existe um segundo servidor a iniciar. Abra:

- Site: `http://localhost:3001/`
- CRM: `http://localhost:3001/crm`
- Fila: `http://localhost:3001/outreach`

A senha local está em `LOCAL-ACCESS.txt`, gerado pelo setup, e não deve ser publicado. O setup preserva uma configuração existente; não apaga banco ou redefine senha. Uma implantação nova deve usar credenciais próprias, HTTPS e a origem pública correta.

Produção em um único servidor persistente:

```powershell
npm run build
npm start -- --port 3001
```

O build também compila os dois portfólios. Se estiver instalando tudo em outra máquina, execute `npm ci` também em `portfolio/Arquiteture` e `portfolio/Solar` antes do primeiro build. Para compilar somente o institucional após os portfólios já terem sido compilados: `npx next build`.

Validação:

```powershell
npm run lint
npm run typecheck
npm test
```

Os testes usam um banco temporário e não alteram leads reais. O diretório de testes é removido ao final.

## Configuração

| Variável | Uso |
| --- | --- |
| `APP_ORIGIN` | Origem exata autorizada para POST/PATCH, incluindo porta; sem barra final. |
| `DATABASE_URL` | `file:./data/milia.sqlite`, arquivo persistente local. |
| `CRM_ADMIN_PASSWORD` | Senha de operador com pelo menos 12 caracteres. |
| `CRM_SESSION_SECRET` | Segredo aleatório com pelo menos 32 caracteres para assinar sessões. |
| `OUTREACH_INTERVAL_MINUTES` | Intervalo de liberações; valores menores que 30 são elevados para 30. |
| `OPENAI_API_KEY` | Opcional, exclusivamente no servidor. Vazio mantém atendimento por regras. |
| `MODEL_FAST` | Modelo usado para redação estruturada. |
| `MODEL_REASONING` | Reservado para uma evolução; não dispara chamadas adicionais hoje. |
| `MODEL_DISCOVERY` | Modelo da pesquisa com web_search; padrão gpt-4.1-mini. |

Coloque a chave em `OPENAI_API_KEY=` no arquivo `.env` da raiz da MiliaCO e reinicie o servidor. A mesma chave habilita a busca e o chat. O setup preserva sua chave e a configuração de acesso existente. As credenciais do CRM ficam em `.env.local`; uma chave vazia antiga nesse arquivo é removida pelo setup para não esconder o `.env`.

Não use prefixo `NEXT_PUBLIC_` para qualquer segredo. `.env`, `.env.local`, `LOCAL-ACCESS.txt` e `data/` são ignorados pelo Git. As permissões do arquivo no Windows também dependem das ACLs da conta.

`config/business-profile.json` é a oferta oficial compartilhada pelo site e pelo motor comercial. Mantém serviços, público, diferenciais, região, planos, preços, FAQ, identidade e restrições. `config/scoring.json` e `config/sales-rules.json` centralizam pesos, faixas, modelos e regras. Edite a configuração e reinicie em desenvolvimento ou faça um novo build em produção. Mantenha `price` e `startingPrice` consistentes.

## Arquitetura implementada

```text
Site / Chat / CRM
       ↓
API Next.js → origem + sessão + rate limit + schema
       ↓
Regras comerciais / máquina de estados
       ↓
Repository com SQL parametrizado → SQLite local
       ↓
Adapters: HTML público / redação OpenAI opcional / link de contato humano
       ↓
Saída estruturada validada → histórico e auditoria
```

- `src/server/crm/`: schemas, banco, repositório, score, recomendações, memória e conversas.
- `src/server/security/guard.ts`: sessões assinadas, autorização, origem, limites, payload e detecção de instruções suspeitas.
- `src/server/integrations/`: adapters de pesquisa pública, IA e canal de contato humano.
- `src/app/api/crm/[...path]/route.ts`: APIs autenticadas de cadastro, importação, detalhe, fila, métricas e auditoria.
- `src/app/api/chat/route.ts`: conversa e captura vinculadas à sessão do visitante.
- `src/app/api/contact/route.ts`: captura consentida no formulário anterior ao WhatsApp.
- `src/components/crm/`: interface de login, KPIs, pipeline, tabela, importação, detalhe, pesquisa e abordagem.
- `src/components/chat/ChatWidget.tsx`: assistente público, consentimento, captura e encaminhamento humano.
- `src/components/PublicShell.tsx`: composição do institucional e da área comercial.
- `scripts/setup-crm.mjs`, `scripts/test-crm.mjs`: configuração local e testes isolados.
- `tests/crm.test.ts`: testes comerciais, de API e de segurança.

Arquivos existentes modificados: layout do app, formulário ContactBrief, fontes de preços/FAQ/serviços/público, preços exibidos no hero e na seção de planos, next.config.mjs, package.json/package-lock.json e .gitignore. Os componentes existentes de navegação, portfólio e apresentação foram reutilizados.

## Banco e migrations

Manifesto dos novos arquivos funcionais:

```text
config/business-profile.json
config/scoring.json
config/sales-rules.json
migrations/001_crm.sql
src/server/crm/business.ts
src/server/crm/chat.ts
src/server/crm/db.ts
src/server/crm/repository.ts
src/server/crm/sales.ts
src/server/crm/schemas.ts
src/server/security/guard.ts
src/server/integrations/contact.ts
src/server/integrations/llm.ts
src/server/integrations/website.ts
src/app/api/crm/[...path]/route.ts
src/app/api/chat/route.ts
src/app/api/contact/route.ts
src/app/crm/page.tsx
src/app/outreach/page.tsx
src/components/crm/CrmApp.tsx
src/components/crm/crm.css
src/components/chat/ChatWidget.tsx
src/components/PublicShell.tsx
scripts/audit-profile.ts
scripts/setup-crm.mjs
scripts/test-crm.mjs
tests/crm.test.ts
.env.example
docs/ENTREGA-CRM.md
docs/preview-crm.png
```

`migrations/001_crm.sql` cria leads, interações, auditoria, estado da fila, sessões de chat, limites de requisição e versão de schema. Aplicação idempotente na primeira abertura do banco. Triggers rejeitam alteração e exclusão de interações e auditoria; transações agrupam as mudanças. Cada escrita persiste o SQLite por substituição de arquivo temporário. Os campos do lead ficam em JSON validado, com colunas indexáveis para seleção comercial.

O adapter usa sql.js e exige **uma única instância Node** com disco persistente. Não use várias réplicas, vários processos sobre o mesmo arquivo ou hospedagem efêmera/serverless. Para equipe e escala, migre o repository para PostgreSQL com autenticação individual e permissões. Antes de futuras migrations, pare o processo e faça backup do arquivo; não copie somente durante uma escrita. A imutabilidade protege o uso normal da aplicação, não um administrador com acesso ao arquivo do banco.

## Fluxo de uso

1. Cadastre um lead ou importe JSON de até 100 registros por lote. O lote inteiro é validado antes de gravar.
2. Informe o site e clique em **Analisar site informado**. O resultado mostra evidência, fonte, confiança e limitações.
3. Preencha a necessidade. Score e recomendação são calculados pelo servidor.
4. Qualifique e passe para **Pronto para contato**. Abra a fila e libere o próximo elegível.
5. Gere ou escreva uma abordagem, edite e aprove. Alterações invalidam a aprovação.
6. Prepare o canal oficial, abra o link e revise/envie você mesmo.
7. Confirme o envio manual. A aplicação não detecta se o WhatsApp ou e-mail foi realmente enviado.
8. Registre a resposta recebida; o motor mantém memória e prepara um novo rascunho de resposta. Você pode copiar a sugestão para continuar a conversa no canal existente.
9. Passe para negociação; registre o valor real ao marcar ganho. Perdidos e opt-outs são preservados no histórico.
10. Acompanhe métricas, exportação e auditoria.

O chat registra mensagens somente após a autorização exibida ao visitante. Dados de contato exigem uma captura explícita para retorno. O formulário de WhatsApp também oferece autorização opcional para salvar no CRM; sem ela, os dados seguem somente no resumo que o visitante decide enviar.

## Buscar potenciais leads

No CRM, clique em **Buscar potenciais leads**. Informe segmento, cidade/estado e limite de 3, 5 ou 10 empresas. O adapter usa Responses API com `web_search`, exige consulta concluída e retém URLs retornadas pela pesquisa ou citações. Uma segunda chamada sem ferramentas extrai os candidatos em JSON estrito. Fontes aparecem como links. Referência: [Web search da OpenAI](https://developers.openai.com/api/docs/guides/tools-web-search).

Confira as fontes, selecione resultados e clique em **Cadastrar selecionados**. A busca sozinha não cria leads nem envia mensagens. O servidor importa apenas candidatos pertencentes ao resultado salvo, com deduplicação por site ou empresa/cidade. Pesquisas expiram em 24 horas, têm limite de 10 resultados, timeout total de 45 segundos, concorrência de uma pesquisa e limite de 3 buscas a cada 10 minutos. Cada busca usa chamadas cobradas pela API conforme sua conta e modelos.

Empresa encontrada ainda não é uma oportunidade qualificada. Não são preenchidos telefone, e-mail, reputação, intenção de compra ou diagnóstico do site por suposição. Sem site confirmado, esse dado permanece desconhecido e não gera pontos. URLs de diretórios/perfis são fontes; o site só é preenchido quando a URL foi consultada e o domínio corresponde ao nome da empresa, filtro conservador que pode deixar um site legítimo para confirmação manual. A pesquisa não recebe dados do CRM. Somente este adapter tem a ferramenta de busca; o chat permanece sem ferramentas.

## Chat com IA e SPIN Selling

Com a chave habilitada, a IA recebe o contexto do visitante e os últimos oito trechos limitados daquela conversa. Usa situação, problema relatado, impacto e benefício para apresentar o trabalho conforme a resposta. Responde dúvidas e objeções primeiro, pula o que já foi informado e não faz perguntas sobre páginas, layout ou requisitos técnicos.

A prioridade é apresentar o **Essencial, a partir de R$ 689**, quando atender ao objetivo. Se o escopo ainda não estiver validado, apresenta-o como possibilidade sujeita à confirmação da equipe. Não empurra o Profissional sem necessidade concreta; casos complexos vão para avaliação humana. Preços e alegações são validados, e perguntas de quantidade de páginas são rejeitadas. Se a API falhar, o chat informa que está usando atendimento automático de apoio.

## Score e recomendação

### Classificação de leads com IA

Na ficha, **Analisar e classificar com IA** consulta o site público quando confirmado e avalia somente o contexto daquela empresa. Na tabela, **Classificar pendentes com IA** processa até dez leads de busca por vez. Ao cadastrar resultados da busca, a opção **Analisar sites e classificar com IA ao cadastrar** vem marcada.

A classificação separa **encaixe no serviço** de **prioridade de pesquisa digital** (Alta, Média, Baixa ou Revisar), com resumo, ângulo de abordagem a confirmar, fontes e próxima ação. Interesse de compra desconhecido não define a prioridade técnica. Sem site analisado, a necessidade digital fica **Revisar**. Lacunas observadas no HTML devem citar índices de evidências existentes; pontuação técnica continua calculada pelas regras. Os contatos são preenchidos apenas a partir de links públicos de telefone, WhatsApp ou e-mail observados no site, sem substituir dados existentes. Nenhuma mensagem é enviada.

Classificações registram data, fonte IA e limitações; mudanças na identidade/site invalidam a classificação, e mudanças de URL também invalidam a análise anterior. O lead novo vai para **Em pesquisa**, sem virar automaticamente qualificado. Cada classificação limita a saída e tem timeout de IA de 20 segundos, concorrência de duas e limite de 40 consultas a cada dez minutos. As buscas e as classificações usam a chave já configurada no `.env`.

O LLM não decide score, plano ou estágio. O score soma pesos de evidências observadas e fica entre 0 e 100. Sinais desconhecidos valem zero. Ausência de URL não prova ausência de site: os 25 pontos dependem de confirmação. Instagram ativo e reputação dependem de verificação humana com fonte; um link de rede social sozinho não prova atividade. Ausência de viewport é uma observação de HTML, não um teste visual de mobile. O peso negativo de site excelente está reservado; a consulta HTML não o afirma automaticamente.

Faixas atuais: 85+ muito alta, 70+ alta, 55+ média, abaixo disso baixa. Motivos ficam persistidos. A probabilidade de conversão é `null`, pois não há histórico/modelo calibrado que justifique apresentar um percentual.

Na ficha administrativa, a recomendação formal usa objetivo e escopo registrado pelo operador. Uma página institucional com contato leva ao **Essencial, a partir de R$ 689**. Páginas adicionais e funcionalidades confirmadas compatíveis levam ao **Profissional, a partir de R$ 1.920**. E-commerce, área autenticada, integração complexa ou mais de seis páginas exigem avaliação humana. O chat público não exige esses campos nem pergunta quantidade de páginas para conversar ou apresentar o Essencial. Há somente dois planos.

Preço inicial não é proposta final. Domínio, hospedagem inicial e renovação constam na oferta existente. Não há desconto, escassez ou depoimento inventado. A evolução futura é discutida após entender a necessidade original.

## Fila e métricas

O timestamp de liberação fica no banco e sobrevive a reinícios. No máximo um novo lead é liberado a cada intervalo de pelo menos 30 minutos. O mesmo lead em revisão permanece liberado até o operador concluir ou alterar seu estágio. A fila exige estágio pronto, ausência de opt-out, menos de três tentativas e data de contato permitida. O follow-up padrão é três dias, configurável.

KPIs e agrupamentos usam cadastros, estados e eventos registrados: contatos, respostas, negociação, ganhos, receita real e ticket médio. Receita potencial soma preços iniciais recomendados dos leads abertos e não é previsão garantida. Métricas por mensagem associam eventos aos respectivos leads; não estabelecem causalidade. A consulta do painel tem limite de 1.000 leads — para volume maior, adicione paginação e agregações SQL globais antes de usar indicadores como totais da operação.

## Pesquisa e segurança

O provider consulta apenas a URL informada e recursos públicos limitados. Extrai título, descrição, headings, canonical, textos, redes, CTA, formulário, HTTPS, bytes e tempo da resposta. Robots é consultado antes da página, incluindo redirecionamentos. Crawl delay de até cinco segundos é respeitado; intervalos maiores exigem consulta manual. Não contorna login, CAPTCHA ou bloqueios. Não realiza busca massiva, consulta Google Maps autenticada, scraping de redes ou coleta de dados pessoais adicionais.

A análise não executa JavaScript nem mede aparência, responsividade visual, peso individual de imagens, Core Web Vitals, reputação ou vendas. Não transforma ausência de elemento no HTML em certeza sobre o site renderizado. URLs locais, IPs privados/reservados, portas fora de 80/443, credenciais na URL e protocolos alternativos são bloqueados. Cada destino/redirecionamento resolve DNS e fixa o endereço consultado para reduzir SSRF e DNS rebinding. Há limites de redirecionamentos, tamanho de 1 MB, tempo de oito segundos por consulta e concorrência de duas análises.

O LLM recebe somente contexto projetado do lead atual, evidências limitadas e memória resumida, delimitados como conteúdo não confiável. HTML completo, lista de leads, credenciais e histórico inteiro não entram no prompt. A allowlist de ferramentas do modelo comercial é vazia: ele não executa shell, SQL, arquivos ou envio de mensagens. Score/recomendação permanecem determinísticos. Responses API usa JSON schema estrito e `store:false`; a saída também é validada localmente contra schema, preços e alegações proibidas. Referência: [Structured Outputs da OpenAI](https://developers.openai.com/api/docs/guides/structured-outputs).

Heurísticas sinalizam tentativas de instruções sem descartar automaticamente os fatos úteis da página. Tentativas são auditadas e mensagens comerciais seguras continuam. Estes mecanismos reduzem risco; não constituem garantia universal contra toda formulação adversarial. O isolamento real também depende de não fornecer ferramentas perigosas e de restringir os dados disponíveis ao modelo.

APIs administrativas exigem cookie HttpOnly assinado, expiração e SameSite Strict. Escritas validam origem, schema e tamanho. Chat só acessa o lead da sessão assinada, sem aceitar lead_id enviado pelo visitante. Rate limits persistidos incluem limites globais públicos para reduzir bypass por cabeçalhos. Em produção, restrinja forwarded headers ao proxy confiável e acrescente limite de IP na borda.

## Validação e limitações restantes

A suíte final passou nos **27 testes**, cobrindo as 12 categorias solicitadas, além de APIs, consentimento, SSRF, imutabilidade e adapter OpenAI simulado. Lint e TypeScript passaram. O build dos dois portfólios e do institucional foi concluído; após os últimos ajustes, o build do institucional foi refeito com sucesso. Os ataques literais de HTML e mensagem foram exercitados. Teste de provider não equivale a uma chamada real: a qualidade e disponibilidade remotas podem variar; após a chave ser registrada, uma busca real e uma resposta consultiva real foram verificadas.

No navegador, foram verificados login, cadastro, recomendação do Essencial, análise real de example.com, geração de rascunho, qualificação, liberação na fila, aprovação e preparo de link oficial. A validação inicial do chat foi substituída pelo fluxo SPIN sem perguntas de páginas. A busca real encontrou três empresas com fontes e a resposta real da IA apresentou o Essencial a partir de R$ 689. Nenhuma mensagem foi enviada a um cliente. Os testes de importação e conversa usam base temporária ou contexto sem gravação. A pesquisa real ficou salva para revisão, sem cadastrar leads automaticamente. A imagem `preview-crm.png` mostra a base final limpa. A porta 3001 foi reservada para a Milia porque outro projeto está usando a porta 3000.

`npm audit --omit=dev` retornou **zero vulnerabilidades reportadas** nas dependências de produção na verificação desta entrega. Isso é um resultado de dependências, não uma certificação de segurança de todo o aplicativo.

Limites atuais:

- Um operador compartilhado, sem multiusuário, RBAC ou multitenancy.
- Banco local de instância única, sem backup externo automático.
- Sem envio automático; integrações oficiais futuras devem implementar autorização, webhooks e idempotência.
- Busca de empresas com fontes públicas; atividade social/reputação ainda exigem verificação humana.
- Sem auditoria visual de mobile ou performance de navegador.
- Importação em JSON; CSV e deduplicação assistida podem ser adicionados.
- Rate limits e heurísticas são proteção local; produção precisa também de controles de borda e monitoramento.
- O audit de dependências sinalizou cinco vulnerabilidades altas transitivas **de desenvolvimento**, na cadeia ESLint/fast-glob/micromatch/braces. A versão disponível de braces é 3.0.3, incluída no advisory, e a correção automática propõe downgrade incompatível do eslint-config-next. Não foi aplicado `--force`. Consulte [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) e atualize quando uma versão compatível corrigida estiver disponível. O audit de produção deve ser verificado separadamente.

Próximos passos: acompanhar consumo e qualidade do modelo configurado; definir política de retenção e atendimento a solicitações de privacidade; implantar HTTPS em servidor persistente; configurar backup; criar contas individuais; migrar banco para Postgres antes de escalar; conectar fontes e canais oficiais conforme necessidade real.



