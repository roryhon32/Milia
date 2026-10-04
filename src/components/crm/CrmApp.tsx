"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Lead, Interaction } from "@/server/crm/schemas";
import "./crm.css";
import Link from "next/link";
import { LeadDiscovery } from "./LeadDiscovery";
import { qualificationLabels } from "@/server/crm/qualification-schema";

const labels: Record<string, string> = {
  NEW: "Novo",
  RESEARCHING: "Em pesquisa",
  QUALIFIED: "Qualificado",
  CONTACT_READY: "Pronto para contato",
  CONTACTED: "Contatado",
  REPLIED: "Respondeu",
  NEGOTIATING: "Negociando",
  WON: "Ganho",
  LOST: "Perdido",
  FOLLOW_UP: "Acompanhamento",
};
const planLabel: Record<string, string> = {
  essencial: "Essencial",
  profissional: "Profissional",
  HUMAN_HANDOFF: "Avaliação humana",
  UNKNOWN: "Em descoberta",
};
const money = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
type Queue = {
  current: Lead | null;
  next: Lead | null;
  nextAt: string | null;
  waitMs: number;
  candidates: Lead[];
};
type Metrics = {
  total: number;
  qualified: number;
  ready: number;
  negotiating: number;
  won: number;
  conversion: number;
  revenue: number;
  potentialRevenue: number;
  contacts: number;
  responses: number;
  responseRate: number;
  proposals: number;
  averageTicket: number;
  bySegment: { name: string; total: number; won: number }[];
  byScore: { name: string; total: number; won: number }[];
  byPlan: { name: string; total: number; won: number }[];
  byDay: { day: string; total: number }[];
  byMessage: {
    message: string;
    company: string;
    replied: boolean;
    won: boolean;
  }[];
};
async function api<T>(
  path: string,
  body?: unknown,
  method = "POST",
): Promise<T> {
  const res = await fetch(
    `/api/crm/${path}`,
    body === undefined
      ? { cache: "no-store" }
      : {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Não foi possível concluir.");
  return data;
}
function download(name: string, value: unknown) {
  const url = URL.createObjectURL(
    new Blob([JSON.stringify(value, null, 2)], { type: "application/json" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
export function CrmApp({ outreach = false }: { outreach?: boolean }) {
  const detailDialog = useRef<HTMLDialogElement>(null);
  const running = useRef(false);
  const [session, setSession] = useState<{
      authenticated: boolean;
      aiConfigured: boolean;
    } | null>(null),
    [checking, setChecking] = useState(true),
    [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]),
    [stats, setStats] = useState<Metrics | null>(null),
    [queue, setQueue] = useState<Queue | null>(null);
  const [view, setView] = useState(outreach ? "fila" : "painel"),
    [selected, setSelected] = useState<Lead | null>(null),
    [events, setEvents] = useState<Interaction[]>([]),
    [audit, setAudit] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState(""),
    [notice, setNotice] = useState(""),
    [busy, setBusy] = useState(false),
    [filter, setFilter] = useState(""),
    [stageFilter, setStageFilter] = useState("");
  const [draft, setDraft] = useState(""),
    [reply, setReply] = useState(""),
    [importText, setImportText] = useState(""),
    [channel, setChannel] = useState<{ url: string; channel: string } | null>(
      null,
    );
  const refresh = useCallback(async () => {
    const [ls, ms, q] = await Promise.all([
      api<Lead[]>("leads"),
      api<Metrics>("metrics"),
      api<Queue>("queue"),
    ]);
    setLeads(ls);
    setStats(ms);
    setQueue(q);
  }, []);
  const select = async (id: string) => {
    const result = await api<{ lead: Lead; history: Interaction[] }>(
      `leads/${id}`,
    );
    setSelected(result.lead);
    setEvents(result.history);
    setDraft(result.lead.draft);
    setChannel(null);
  };
  useEffect(() => {
    api<{ authenticated: boolean; aiConfigured: boolean }>("session")
      .then((s) => {
        setSession(s);
        return refresh();
      })
      .catch(() => setSession(null))
      .finally(() => setChecking(false));
  }, [refresh]);
  useEffect(() => {
    if (selected && !detailDialog.current?.open)
      detailDialog.current?.showModal();
  }, [selected]);
  const run = async (fn: () => Promise<void>) => {
    if (running.current) return;
    running.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro na operação.");
    } finally {
      running.current = false;
      setBusy(false);
    }
  };
  const action = async (input: unknown) => {
    if (!selected) return;
    await api(`leads/${selected.id}`, input);
    await select(selected.id);
    await refresh();
  };
  if (checking)
    return (
      <div className="crm">
        <p>Carregando área comercial…</p>
      </div>
    );
  if (!session)
    return (
      <div className="crm login">
        <Link href="/">MILIA CO.</Link>
        <h1>Área comercial</h1>
        <p>CRM, pesquisa e atendimento assistido.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void run(async () => {
              await api("login", { password });
              setPassword("");
              setSession(await api("session"));
              await refresh();
            });
          }}
        >
          <label>
            Senha de acesso
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button disabled={busy}>Entrar</button>
        </form>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <small>
          O acesso local está no arquivo LOCAL-ACCESS.txt do projeto.
        </small>
      </div>
    );
  const filtered = leads.filter(
    (l) =>
      (!stageFilter || l.stage === stageFilter) &&
      `${l.company} ${l.segment} ${l.contactName} ${l.city}`
        .toLowerCase()
        .includes(filter.toLowerCase()),
  );
  return (
    <div className="crm">
      <header>
        <div>
          <Link href="/">MILIA CO.</Link>
          <span> / COMERCIAL</span>
        </div>
        <button
          onClick={() =>
            void run(async () => {
              await api("logout", {});
              setSession(null);
              setSelected(null);
            })
          }
        >
          Sair
        </button>
      </header>
      <div className="crm-heading">
        <div>
          <p className="eyebrow">RELAÇÕES QUE VIRAM PROJETOS</p>
          <h1>Sua operação comercial.</h1>
          <p>
            {session.aiConfigured
              ? "Redação assistida por IA, com regras comerciais verificadas."
              : "Modo sem chave de IA: respostas e recomendações por regras comerciais."}
          </p>
        </div>
        <div className="crm-heading-actions"><button onClick={() => setView("busca")}>Buscar potenciais leads</button>
        <button onClick={() => void run(refresh)} disabled={busy}>
          Atualizar
        </button></div>
      </div>
      <nav aria-label="CRM">
        {[
          ["painel", "Visão geral"],
          ["pipeline", "Pipeline"],
          ["leads", "Leads"],
          ["busca", "Buscar empresas"],
          ["novo", "Cadastrar / importar"],
          ["fila", "Fila de abordagem"],
          ["metricas", "Métricas"],
          ["auditoria", "Auditoria"],
        ].map(([id, label]) => (
          <button
            key={id}
            aria-current={view === id ? "page" : undefined}
            onClick={() => {
              setView(id);
              if (id === "auditoria")
                void run(async () => setAudit(await api("events")));
            }}
          >
            {label}
          </button>
        ))}
      </nav>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="notice">
          {notice}
        </p>
      )}
      {busy && <p role="status">Processando…</p>}
      <div hidden={view !== "busca"}><LeadDiscovery configured={session.aiConfigured} onImport={refresh} /></div>
      {(view === "painel" || view === "metricas") && stats && (
        <>
          <div className="crm-kpis">
            {[
              ["Leads", stats.total],
              ["Qualificados", stats.qualified],
              ["Prontos", stats.ready],
              ["Negociando", stats.negotiating],
              ["Ganhos", stats.won],
              ["Conversão", `${(stats.conversion * 100).toFixed(1)}%`],
              ["Receita registrada", money(stats.revenue)],
              ["Potencial estimado", money(stats.potentialRevenue)],
            ].map(([label, value]) => (
              <article key={label}>
                <small>{label}</small>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
          <p className="muted">
            Potencial soma os preços iniciais recomendados dos leads abertos.
            Não representa receita garantida. Dados do painel limitados aos
            1.000 leads mais recentes na consulta.
          </p>
        </>
      )}
      {view === "painel" && (
        <section className="crm-panel">
          <h2>Próximas ações</h2>
          {leads
            .filter((l) => !["WON", "LOST"].includes(l.stage))
            .slice(0, 8)
            .map((l) => (
              <button
                className="crm-row"
                key={l.id}
                onClick={() => void run(() => select(l.id))}
              >
                <b>{l.company}</b>
                <span>{l.nextAction}</span>
                <small>
                  {l.nextActionAt
                    ? new Date(l.nextActionAt).toLocaleString("pt-BR")
                    : "Sem data definida"}
                </small>
              </button>
            ))}
          {!leads.length && (
            <p>
              Cadastre seu primeiro lead ou receba uma conversa pelo assistente
              do site.
            </p>
          )}
        </section>
      )}
      {view === "pipeline" && (
        <div className="crm-pipeline">
          {Object.entries(labels).map(([stage, label]) => (
            <section key={stage}>
              <h2>
                {label}{" "}
                <small>{leads.filter((l) => l.stage === stage).length}</small>
              </h2>
              {leads
                .filter((l) => l.stage === stage)
                .map((l) => (
                  <button
                    className="crm-card"
                    key={l.id}
                    onClick={() => void run(() => select(l.id))}
                  >
                    <b>{l.company}</b>
                    <span>{l.segment || "Segmento não informado"}</span>
                    <small>
                      Score {l.score} · {planLabel[l.recommendation.plan]}
                    </small>
                  </button>
                ))}
            </section>
          ))}
        </div>
      )}
      {view === "leads" && (
        <section className="crm-panel">
          <div className="crm-filters">
            <label>
              Buscar
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Empresa, segmento ou cidade"
              />
            </label>
            <label>
              Estágio
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
              >
                <option value="">Todos</option>
                {Object.entries(labels).map(([id, label]) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => download("milia-leads.json", filtered)}>
              Exportar JSON
            </button>
            <button disabled={busy || !session.aiConfigured} onClick={() => void run(async () => {
              const pending = filtered.filter(l => l.source === "WEB_SEARCH" && !l.qualification).slice(0, 10);
              let completed = 0, failed = 0;
              for (const [index, lead] of pending.entries()) {
                setNotice(`Classificando ${index + 1} de ${pending.length}: ${lead.company}`);
                try { await api(`leads/${lead.id}`, { action: "classify" }); completed++; } catch { failed++; }
              }
              await refresh();
              setNotice(`${completed} classificado(s) por IA.${failed ? ` ${failed} pendente(s); tente na ficha individual.` : ""}${!pending.length ? " Nenhum lead de busca pendente neste filtro." : ""}`);
            })}>Classificar pendentes com IA (até 10)</button>
          </div>
          <p className="muted">A classificação IA orienta a pesquisa comercial. O score soma evidências técnicas; nenhum dos dois confirma intenção de compra.</p>
          <div className="crm-scroll">
            <table>
              <thead>
                <tr>
                  {[
                    "Empresa",
                    "Segmento",
                    "Contato",
                    "Score",
                    "Classificação IA",
                    "Plano",
                    "Estágio",
                    "Responsável",
                    "Próxima ação",
                  ].map((t) => (
                    <th key={t}>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <button onClick={() => void run(() => select(l.id))}>
                        {l.company}
                      </button>
                    </td>
                    <td>{l.segment || "—"}</td>
                    <td>{l.phone || l.email || "—"}</td>
                    <td>{l.score}</td>
                    <td title={l.qualification?.summary}>{l.qualification ? <><b>{qualificationLabels[l.qualification.opportunity]}</b><small className="qualification-fit">{qualificationLabels[l.qualification.fit]}</small></> : "Ainda não analisado"}</td>
                    <td>{planLabel[l.recommendation.plan]}</td>
                    <td>{labels[l.stage]}</td>
                    <td>{l.owner}</td>
                    <td>{l.nextAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {view === "novo" && (
        <div className="crm-two">
          <section className="crm-panel">
            <h2>Novo lead</h2>
            <LeadForm
              onSave={async (data) => {
                await api("leads", data);
                await refresh();
                setNotice("Lead cadastrado.");
              }}
              run={run}
            />
          </section>
          <section className="crm-panel">
            <h2>Importar leads</h2>
            <p>
              JSON: lista de até 100 empresas por lote. O lote inteiro é
              validado antes de salvar.
            </p>
            <label>
              Dados JSON
              <textarea
                rows={12}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder={
                  '[{"company":"Empresa","segment":"Arquitetura","website":"https://exemplo.com"}]'
                }
              />
            </label>
            <button
              disabled={busy}
              onClick={() =>
                void run(async () => {
                  const data = JSON.parse(importText);
                  await api("import", data);
                  setImportText("");
                  await refresh();
                  setNotice("Importação concluída.");
                })
              }
            >
              Validar e importar
            </button>
            <button
              onClick={() =>
                download("modelo-leads.json", [
                  {
                    company: "Empresa",
                    segment: "Arquitetura",
                    phone: "",
                    email: "",
                    website: "",
                    city: "",
                    source: "IMPORT",
                  },
                ])
              }
            >
              Baixar modelo
            </button>
          </section>
        </div>
      )}
      {view === "fila" && queue && (
        <section className="crm-panel">
          <p className="eyebrow">REVISÃO HUMANA</p>
          <h2>Uma conversa por vez.</h2>
          <p>
            Intervalo mínimo de 30 minutos entre liberações. O sistema prepara o
            texto; você abre o canal oficial, revisa e envia.
          </p>
          <p>
            Prontos e elegíveis: <b>{queue.candidates.length}</b> · Próxima
            liberação:{" "}
            {queue.nextAt
              ? new Date(queue.nextAt).toLocaleString("pt-BR")
              : "Disponível"}
          </p>
          <button
            disabled={busy}
            onClick={() =>
              void run(async () => {
                const lead = await api<Lead>("queue", { action: "release" });
                await refresh();
                await select(lead.id);
              })
            }
          >
            {queue.current ? "Revisar lead liberado" : "Liberar próximo lead"}
          </button>
          {queue.current && (
            <p>
              Em revisão: <b>{queue.current.company}</b>
            </p>
          )}
          {!queue.current && queue.next && (
            <p>
              Próximo candidato: {queue.next.company} · score {queue.next.score}
            </p>
          )}
          <ol>
            <li>
              Qualifique o lead e altere o estágio para “Pronto para contato”.
            </li>
            <li>Libere pela fila, gere ou escreva a abordagem e aprove.</li>
            <li>Abra o WhatsApp ou e-mail e envie você mesmo.</li>
            <li>Registre o envio e acompanhe a resposta no detalhe do lead.</li>
          </ol>
        </section>
      )}
      {view === "metricas" && stats && (
        <>
          <div className="crm-kpis">
            {[
              ["Contatos registrados", stats.contacts],
              ["Leads que responderam", stats.responses],
              ["Taxa de resposta", `${(stats.responseRate * 100).toFixed(1)}%`],
              ["Propostas em negociação / ganho", stats.proposals],
              ["Ticket médio registrado", money(stats.averageTicket)],
            ].map(([label, value]) => (
              <article key={label}>
                <small>{label}</small>
                <strong>{value}</strong>
              </article>
            ))}
          </div>
          <div className="crm-two">
            {[
              ["Por segmento", stats.bySegment],
              ["Por prioridade", stats.byScore],
              ["Por plano", stats.byPlan],
            ].map(([title, rows]) => (
              <section key={title as string} className="crm-panel">
                <h2>{title as string}</h2>
                {(rows as Metrics["byPlan"]).map((row) => (
                  <p className="crm-row" key={row.name}>
                    <span>{planLabel[row.name] || row.name}</span>
                    <b>
                      {row.total} leads · {row.won} ganhos
                    </b>
                  </p>
                ))}
              </section>
            ))}
            <section className="crm-panel">
              <h2>Cadastros por dia</h2>
              {stats.byDay.map((d) => (
                <p key={d.day}>
                  {d.day}: {d.total}
                </p>
              ))}
            </section>
          </div>
          <section className="crm-panel">
            <h2>Resultados por mensagem registrada</h2>
            <p>
              Associação com respostas e ganhos do lead; não indica que a
              mensagem causou o resultado.
            </p>
            {stats.byMessage.map((m, i) => (
              <article className="crm-history" key={i}>
                <b>{m.company}</b>
                <p>{m.message}</p>
                <small>
                  {m.replied
                    ? "Resposta registrada"
                    : "Sem resposta registrada"}{" "}
                  · {m.won ? "Lead ganho" : "Sem ganho registrado"}
                </small>
              </article>
            ))}
          </section>
          <button onClick={() => download("milia-metricas.json", stats)}>
            Exportar métricas
          </button>
        </>
      )}
      {view === "auditoria" && (
        <section className="crm-panel">
          <h2>Eventos de auditoria</h2>
          <p>Últimos 100 eventos; registros imutáveis na base local.</p>
          {audit.map((a, i) => (
            <div className="crm-row" key={i}>
              <b>{String(a.event)}</b>
              <small>{String(a.created_at)}</small>
              <code>{String(a.lead_id || "Sistema")}</code>
            </div>
          ))}
        </section>
      )}
      {selected && (
        <dialog
          ref={detailDialog}
          aria-labelledby="lead-title"
          onCancel={() => setSelected(null)}
          className="crm-overlay"
        >
          <section className="crm-detail">
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            {notice && (
              <p role="status" className="notice">
                {notice}
              </p>
            )}
            <div className="crm-row">
              <h2 id="lead-title">{selected.company}</h2>
              <button onClick={() => setSelected(null)}>Fechar detalhe</button>
            </div>
            <p>
              {labels[selected.stage]} · {selected.priority} · score{" "}
              {selected.score} · {planLabel[selected.recommendation.plan]}
            </p>
            <div className="crm-detail-grid">
              <section>
                <h3>Cadastro e necessidade</h3>
                <LeadForm
                  lead={selected}
                  run={run}
                  onSave={async (data) => {
                    await api(`leads/${selected.id}`, data, "PATCH");
                    await select(selected.id);
                    await refresh();
                    setNotice("Cadastro atualizado.");
                  }}
                />
                <label>
                  Alterar estágio
                  <select
                    value={selected.stage}
                    onChange={(e) => {
                      const stage = e.target.value;
                      void run(async () => {
                        let revenue: number | undefined;
                        if (stage === "WON") {
                          const amount = window.prompt(
                            "Valor real fechado em reais (opcional)",
                          );
                          if (amount !== null && amount.trim()) {
                            revenue = Number(amount.replace(",", "."));
                            if (!Number.isFinite(revenue))
                              throw new Error("Valor inválido.");
                          }
                        }
                        await action({ action: "stage", stage, revenue });
                      });
                    }}
                  >
                    {Object.entries(labels).map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
                <p>
                  Transições comerciais são validadas pelo servidor. Contatado
                  exige registro pela fila.
                </p>
                <h3>Recomendação e pontuação</h3>
                <p>{selected.recommendation.reason}</p>
                <p>
                  {selected.recommendation.price
                    ? `A partir de ${money(selected.recommendation.price)}`
                    : "Escopo ainda sem preço recomendado"}
                </p>
                <ul>
                  {selected.scoreReasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>
                <p>Probabilidade de conversão: sem modelo calibrado.</p>
              </section>
              <section>
                <h3>Pesquisa pública</h3>
                <button disabled={busy || !session.aiConfigured} onClick={() => void run(() => action({ action: "classify" }))}>Analisar e classificar com IA</button>
                {selected.qualification && <div className="crm-panel">
                  <h3>{qualificationLabels[selected.qualification.opportunity]} · {qualificationLabels[selected.qualification.fit]}</h3>
                  <p>{selected.qualification.summary}</p>
                  <p><b>Possível abordagem:</b> {selected.qualification.angle}</p>
                  <p><b>Próxima ação:</b> {selected.qualification.nextAction}</p>
                  {selected.qualification.evidence.map((e, i) => <p key={i}>{e.finding} · <a href={e.source} target="_blank" rel="noreferrer">Fonte</a></p>)}
                  <ul>{selected.qualification.limitations.map((l, i) => <li key={i}>{l}</li>)}</ul>
                  <small>Classificado por IA em {new Date(selected.qualification.classifiedAt).toLocaleString("pt-BR")}</small>
                </div>}
                <button
                  disabled={busy || !selected.website}
                  onClick={() => void run(() => action({ action: "analyze" }))}
                >
                  Analisar site informado
                </button>
                <p>
                  Consulta HTML público com fonte, evidência e limites. Não mede
                  aparência, velocidade ou reputação.
                </p>
                {selected.analysis && (
                  <>
                    <p>{selected.analysis.title}</p>
                    {selected.analysis.findings.map((f, i) => (
                      <article className="crm-finding" key={i}>
                        <b>{f.finding}</b>
                        <p>{f.evidence}</p>
                        <small>
                          Confiança {(f.confidence * 100).toFixed(0)}% ·{" "}
                          <a href={f.source} target="_blank" rel="noreferrer">
                            Fonte
                          </a>
                        </small>
                      </article>
                    ))}
                    <ul>
                      {selected.analysis.limitations.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </>
                )}
                <h3>Abordagem</h3>
                <button
                  disabled={busy}
                  onClick={() => void run(() => action({ action: "generate" }))}
                >
                  Gerar rascunho contextual
                </button>
                <label>
                  Mensagem editável
                  <textarea
                    rows={7}
                    maxLength={2000}
                    value={draft}
                    onChange={(e) => {
                      setDraft(e.target.value);
                      setChannel(null);
                    }}
                  />
                </label>
                <div className="crm-actions">
                  <button
                    disabled={busy}
                    onClick={() =>
                      void run(() =>
                        action({
                          action: "draft",
                          text: draft,
                          approve: false,
                        }),
                      )
                    }
                  >
                    Salvar rascunho
                  </button>
                  <button
                    disabled={busy}
                    onClick={() =>
                      void run(() =>
                        action({ action: "draft", text: draft, approve: true }),
                      )
                    }
                  >
                    Aprovar mensagem
                  </button>
                  <button
                    disabled={
                      busy ||
                      draft !== selected.draft ||
                      !selected.draftApproved
                    }
                    onClick={() =>
                      void run(async () =>
                        setChannel(
                          await api(`leads/${selected.id}`, {
                            action: "channel",
                          }),
                        ),
                      )
                    }
                  >
                    Preparar canal oficial
                  </button>
                </div>
                <p>
                  {selected.draftApproved && draft === selected.draft
                    ? "Mensagem aprovada."
                    : "Mensagem precisa de aprovação."}
                </p>
                {channel && (
                  <a
                    className="crm-button"
                    href={channel.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir {channel.channel} para revisar e enviar
                  </a>
                )}
                <button
                  disabled={
                    busy || !selected.draftApproved || draft !== selected.draft
                  }
                  onClick={() => void run(() => action({ action: "sent" }))}
                >
                  Confirmar que enviei manualmente
                </button>
                <h3>Resposta recebida</h3>
                <label>
                  Texto do cliente
                  <textarea
                    rows={3}
                    maxLength={2000}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                </label>
                <button
                  disabled={busy || !reply.trim()}
                  onClick={() =>
                    void run(async () => {
                      await action({ action: "reply", text: reply });
                      setReply("");
                    })
                  }
                >
                  Registrar e preparar resposta
                </button>
                <h3>Memória comercial</h3>
                <p>{selected.memory.lastSummary}</p>
                <p>Próxima ação: {selected.memory.nextBestAction}</p>
                <p>Estado: {selected.salesState}</p>
                <pre>{JSON.stringify(selected.memory, null, 2)}</pre>
              </section>
            </div>
            <h3>Histórico da conversa</h3>
            {events.map((item) => (
              <article className="crm-history" key={item.id}>
                <small>
                  {new Date(item.createdAt).toLocaleString("pt-BR")} ·{" "}
                  {item.kind}
                </small>
                <p>
                  {String(
                    item.data.text ||
                      item.data.message ||
                      JSON.stringify(item.data),
                  )}
                </p>
              </article>
            ))}
          </section>
        </dialog>
      )}
    </div>
  );
}
function LeadForm({
  lead,
  onSave,
  run,
}: {
  lead?: Lead;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  run: (fn: () => Promise<void>) => Promise<void>;
}) {
  return (
    <form
      key={lead?.updatedAt || "new"}
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const fd = new FormData(form);
        const val = (key: string) => String(fd.get(key) || "");
        const req = {
          ...lead?.requirements,
          objective: val("objective"),
          pages: val("pages") ? Number(val("pages")) : null,
          hasWebsite:
            val("hasWebsite") === "" ? null : val("hasWebsite") === "yes",
          ecommerce: fd.has("ecommerce"),
          scheduling: fd.has("scheduling"),
          analytics: fd.has("analytics"),
          complexIntegration: fd.has("complexIntegration"),
          authentication: fd.has("authentication"),
          urgency: val("urgency"),
        };
        const data: Record<string, unknown> = {
          requirements: req,
          optOut: fd.has("optOut"),
          estimatedBudget: val("estimatedBudget")
            ? Number(val("estimatedBudget"))
            : null,
          nextActionAt: val("nextActionAt")
            ? new Date(val("nextActionAt")).toISOString()
            : null,
          verifiedSignals: {
            activeInstagram: fd.has("activeInstagram"),
            goodReputation: fd.has("goodReputation"),
            visualBusiness: fd.has("visualBusiness"),
            source: val("verificationSource"),
          },
        };
        for (const field of [
          "company",
          "segment",
          "contactName",
          "phone",
          "email",
          "website",
          "instagram",
          "city",
          "source",
          "owner",
          "nextAction",
          "interest",
          "observations",
        ])
          data[field] = val(field);
        void run(async () => {
          await onSave(data);
          if (!lead) form.reset();
        });
      }}
    >
      <div className="crm-fields">
        {[
          ["company", "Empresa"],
          ["segment", "Segmento"],
          ["contactName", "Nome do contato"],
          ["phone", "Telefone"],
          ["email", "E-mail"],
          ["website", "Site público"],
          ["instagram", "Instagram"],
          ["city", "Cidade"],
          ["source", "Origem"],
          ["owner", "Responsável"],
          ["nextAction", "Próxima ação"],
          ["interest", "Interesse"],
          ["estimatedBudget", "Orçamento estimado"],
        ].map(([key, label]) => (
          <label key={key}>
            {label}
            <input
              name={key}
              required={key === "company"}
              type={
                key === "email"
                  ? "email"
                  : key === "website"
                    ? "url"
                    : key === "estimatedBudget"
                      ? "number"
                      : "text"
              }
              min={key === "estimatedBudget" ? 0 : undefined}
              maxLength={key === "website" ? 2048 : 200}
              defaultValue={String(
                lead?.[key as keyof Lead] ??
                  (key === "source"
                    ? "MANUAL"
                    : key === "owner"
                      ? "Milia"
                      : ""),
              )}
            />
          </label>
        ))}
      </div>
      <label>
        Objetivo
        <textarea
          name="objective"
          rows={2}
          maxLength={3000}
          defaultValue={lead?.requirements.objective}
        />
      </label>
      <div className="crm-fields">
        <label>
          Possui site?
          <select
            name="hasWebsite"
            defaultValue={
              lead?.requirements.hasWebsite === null
                ? ""
                : lead?.requirements.hasWebsite === false
                  ? "no"
                  : lead?.requirements.hasWebsite === true
                    ? "yes"
                    : ""
            }
          >
            <option value="">Não confirmado</option>
            <option value="no">Não</option>
            <option value="yes">Sim</option>
          </select>
        </label>
        <label>
          Páginas necessárias
          <input
            name="pages"
            type="number"
            min={1}
            max={100}
            defaultValue={lead?.requirements.pages ?? ""}
          />
        </label>
        <label>
          Momento / urgência
          <input
            name="urgency"
            maxLength={200}
            defaultValue={lead?.requirements.urgency}
          />
        </label>
        <label>
          Data da próxima ação
          <input
            name="nextActionAt"
            type="datetime-local"
            defaultValue={
              lead?.nextActionAt
                ? new Date(
                    Date.parse(lead.nextActionAt) -
                      new Date().getTimezoneOffset() * 60000,
                  )
                    .toISOString()
                    .slice(0, 16)
                : ""
            }
          />
        </label>
      </div>
      <div className="crm-checks">
        {[
          ["scheduling", "Agendamento"],
          ["analytics", "Analytics avançado"],
          ["ecommerce", "Vendas online"],
          ["complexIntegration", "Integração complexa"],
          ["authentication", "Login / área restrita"],
        ].map(([key, label]) => (
          <label key={key}>
            <input
              type="checkbox"
              name={key}
              defaultChecked={Boolean(
                lead?.requirements[key as keyof Lead["requirements"]],
              )}
            />
            {label}
          </label>
        ))}
      </div>
      <label>
        Observações
        <textarea
          name="observations"
          rows={2}
          maxLength={3000}
          defaultValue={lead?.observations}
        />
      </label>
      <details>
        <summary>Sinais verificados de oportunidade</summary>
        <p>
          Marque apenas evidências verificadas. Instagram e reputação exigem
          fonte.
        </p>
        {[
          ["activeInstagram", "Instagram ativo"],
          ["goodReputation", "Boa reputação"],
          ["visualBusiness", "Negócio visual"],
        ].map(([key, label]) => (
          <label className="crm-check" key={key}>
            <input
              type="checkbox"
              name={key}
              defaultChecked={Boolean(
                lead?.verifiedSignals[key as keyof Lead["verifiedSignals"]],
              )}
            />
            {label}
          </label>
        ))}
        <label>
          Fonte da verificação
          <input
            name="verificationSource"
            maxLength={200}
            defaultValue={lead?.verifiedSignals.source}
          />
        </label>
      </details>
      <label className="crm-check">
        <input type="checkbox" name="optOut" defaultChecked={lead?.optOut} />
        Não abordar este contato (opt-out)
      </label>
      <button>Salvar {lead ? "alterações" : "lead"}</button>
    </form>
  );
}
