"use client";
import { useEffect, useRef, useState } from "react";
import type { DiscoveryRun } from "@/server/crm/discovery-schema";

export function LeadDiscovery({ configured, onImport }: { configured: boolean; onImport: () => Promise<void> }) {
  const running = useRef(false);
  const [segment, setSegment] = useState(""), [city, setCity] = useState(""), [limit, setLimit] = useState(5);
  const [run, setRun] = useState<DiscoveryRun | null>(null), [selected, setSelected] = useState<string[]>([]);
  const [busy, setBusy] = useState(false), [error, setError] = useState(""), [notice, setNotice] = useState("");
  const [classify, setClassify] = useState(true);
  useEffect(() => {
    let mounted = true;
    fetch("/api/crm/discovery", { cache: "no-store" }).then(async res => {
      if (!res.ok) return;
      const saved: DiscoveryRun | null = await res.json();
      if (mounted && saved && !running.current) { setRun(saved); setSegment(saved.input.segment); setCity(saved.input.city); setLimit(saved.input.limit); }
    }).catch(() => { /* New searches remain available when history cannot load. */ });
    return () => { mounted = false; };
  }, []);
  async function action(body: unknown, importing = false) {
    if (running.current) return;
    running.current = true; setBusy(true); setError(""); setNotice("");
    try {
      const res = await fetch("/api/crm/discovery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Não foi possível pesquisar agora.");
      if (importing) {
        setRun(data.run); setSelected([]);
        let classified = 0, failed = 0;
        if (classify) {
          const ids: string[] = [...new Set<string>((data.run as DiscoveryRun).candidates.filter(c => selected.includes(c.id) && c.importedLeadId).map(c => c.importedLeadId!))];
          for (const [index, id] of ids.entries()) {
            setNotice(`Cadastrados. Analisando e classificando ${index + 1} de ${ids.length}…`);
            const classification = await fetch(`/api/crm/leads/${id}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "classify" }) });
            if (classification.ok) classified++; else failed++;
          }
        }
        setNotice(`${data.added} lead(s) cadastrado(s). ${data.skipped} já estavam no CRM. ${classified} classificado(s) por IA.${failed ? ` ${failed} classificação(ões) pendente(s); tente na ficha do lead.` : ""}`);
        await onImport();
      } else { setRun(data); setSelected([]); }
    } catch (e) { setError(e instanceof Error ? e.message : "Erro de conexão."); }
    finally { running.current = false; setBusy(false); }
  }
  return <section className="crm-panel">
    <p className="eyebrow">PROSPECÇÃO / FONTES PÚBLICAS</p>
    <h2>Encontre seu próximo projeto.</h2>
    <p>Busque empresas por segmento e localização. Confira as fontes e cadastre apenas os contatos que fizerem sentido para a Milia.</p>
    {!configured && <p className="notice">Para ativar: coloque sua chave em OPENAI_API_KEY no arquivo .env e reinicie o servidor.</p>}
    <form onSubmit={e => { e.preventDefault(); void action({ action: "search", segment, city, limit }); }}>
      <div className="crm-fields">
        <label>Segmento<input required minLength={2} maxLength={100} value={segment} onChange={e => setSegment(e.target.value)} placeholder="Ex.: escritórios de arquitetura" /></label>
        <label>Cidade e estado<input required minLength={2} maxLength={100} value={city} onChange={e => setCity(e.target.value)} placeholder="Ex.: Campinas, SP" /></label>
      </div>
      <label className="discovery-limit">Máximo de resultados<select value={limit} onChange={e => setLimit(Number(e.target.value))}>{[3, 5, 10].map(n => <option key={n} value={n}>{n} empresas</option>)}</select></label>
      <button disabled={busy || !configured}>{busy ? "Processando…" : "Buscar potenciais leads"}</button>
      <p className="muted">Cada busca usa a API OpenAI e pesquisa na web. Limite de 3 buscas a cada 10 minutos. Os resultados aguardam sua revisão antes de entrar no CRM.</p>
    </form>
    {error && <p className="error" role="alert">{error}</p>}
    {notice && <p className="notice" role="status">{notice}</p>}
    {busy && <p role="status">Consultando fontes ou cadastrando os selecionados. Aguarde…</p>}
    {run && <div aria-live="polite">
      <label className="crm-check"><input type="checkbox" checked={classify} disabled={busy || !configured} onChange={e => setClassify(e.target.checked)} />Analisar sites e classificar com IA ao cadastrar</label>
      <div className="crm-filters"><h3>{run.candidates.length} empresa(s) encontrada(s)</h3><button disabled={busy || !selected.length} onClick={() => void action({ action: "import", runId: run.id, candidateIds: selected }, true)}>Cadastrar selecionados ({selected.length})</button></div>
      <p className="muted">Uma empresa encontrada é uma candidata. A necessidade de um site e o interesse em contratar ainda precisam ser confirmados.</p>
      {!run.candidates.length && <p>Não encontramos empresas com fontes suficientes. Tente uma região mais ampla ou outro segmento.</p>}
      <div className="discovery-results">{run.candidates.map(c => <article key={c.id} className="discovery-card">
        <label className="crm-check"><input type="checkbox" disabled={busy || !!c.importedLeadId} checked={selected.includes(c.id)} onChange={e => setSelected(prev => e.target.checked ? [...prev, c.id] : prev.filter(id => id !== c.id))} /><strong>{c.company}</strong></label>
        <p className="muted">{c.segment} · {c.city}</p><p>{c.description}</p>
        {c.website ? <a href={c.website} target="_blank" rel="noopener noreferrer">Visitar site ↗</a> : <p className="muted">Site oficial não confirmado nesta pesquisa.</p>}
        <p className="discovery-sources">Fontes: {c.sources.map((url, i) => <a key={url} href={url} target="_blank" rel="noopener noreferrer">{i + 1}. {new URL(url).hostname} ↗</a>)}</p>
        {c.importedLeadId && <p className="notice">Já cadastrado no CRM</p>}
      </article>)}</div>
    </div>}
  </section>;
}
