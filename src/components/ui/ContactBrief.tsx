"use client";

import { useEffect, useRef, useState } from "react";

import { X, ArrowUpRight } from "lucide-react";
import { contactUrl, defaultContactMessage } from "@/data/siteConfig";

type Brief = { name: string; business: string; projectType: string; objective: string; timing: string; contact: string };
type Request = { context?: string; values?: Partial<Brief> };
const emptyBrief: Brief = { name: "", business: "", projectType: "Ainda preciso de orientação", objective: "", timing: "Quero entender as possibilidades", contact: "" };

export function openContactBrief(request: Request = {}) {
  window.dispatchEvent(new CustomEvent<Request>("milia:contact", { detail: request }));
}

export function ContactBrief() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const [context, setContext] = useState(defaultContactMessage);
  const [brief, setBrief] = useState<Brief>(emptyBrief);
  const [consent,setConsent]=useState(false);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");

  useEffect(() => {

    const open = (request: Request) => {
      triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const message = request.context || defaultContactMessage;
      const plan = ["Essencial", "Profissional"].find(name => message.toLowerCase().includes(`plano ${name.toLowerCase()}`));
      setContext(message);
      setBrief(previous => ({ ...previous, projectType: plan ? `Plano ${plan}` : previous.projectType, ...request.values }));
      dialogRef.current?.showModal();
    };
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.hostname !== "wa.me" && url.hostname !== "api.whatsapp.com") return;
      event.preventDefault();
      event.stopPropagation();
      open({ context: url.searchParams.get("text") || undefined });
    };
    const request = (event: Event) => open((event as CustomEvent<Request>).detail || {});
    document.addEventListener("click", click, true);
    window.addEventListener("milia:contact", request);
    return () => {
      document.removeEventListener("click", click, true);
      window.removeEventListener("milia:contact", request);
    };
  }, []);

  const fieldClass = "mt-2 w-full rounded-lg border border-white/15 bg-[#1B1C21] px-3 py-3 text-base text-white focus:border-white focus:outline-none";
  const close = () => dialogRef.current?.close();
  const update = (key: keyof Brief, value: string) => setBrief(previous => ({ ...previous, [key]: value }));


  return (
    <dialog id="contact-brief" ref={dialogRef} aria-labelledby="brief-title" aria-describedby="brief-description"
      onClose={() => triggerRef.current?.focus()}
      onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}
      className="fixed m-auto w-[calc(100%-2rem)] max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl border border-white/15 bg-[#121316] p-6 text-white shadow-2xl backdrop:bg-black/75 sm:p-8">
      <button type="button" onClick={close} aria-label="Fechar formulário de contato" className="absolute right-4 top-4 rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white"><X size={20} /></button>
      <p className="mb-3 text-xs uppercase tracking-widest text-neutral-400">Vamos entender seu projeto</p>
      <h2 id="brief-title" className="font-heading text-2xl pr-8">Como podemos ajudar?</h2>
      <p id="brief-description" className="mt-3 mb-6 text-sm leading-relaxed text-neutral-400">Responda rapidinho. Seu resumo será aberto no WhatsApp para você revisar e enviar.</p>
      <form className="space-y-4" onSubmit={async event => {
        event.preventDefault();
        const name = brief.name.trim();
        if (!name) { const input = event.currentTarget.elements.namedItem("name") as HTMLInputElement; input.setCustomValidity("Informe seu nome."); input.reportValidity(); return; }
        const message = [context, "", `Nome: ${name}`, brief.business.trim() && `Empresa / segmento: ${brief.business.trim()}`, `Interesse: ${brief.projectType}`, `Objetivo: ${brief.objective.trim() || "Gostaria de orientação para definir o projeto."}`, `Momento: ${brief.timing}`, brief.contact.trim() && `Contato informado: ${brief.contact.trim()}`].filter((line, index) => line.length > 0 || index === 1).join("\n");
        if(consent){setSaving(true);setError("");try{const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...brief,consent:true})});if(!response.ok){const data=await response.json();throw new Error(data.error||"Não foi possível salvar o contato.");}}catch(err){setError(`${err instanceof Error?err.message:"Falha na conexão."} Você pode tentar novamente ou desmarcar a autorização para continuar apenas no WhatsApp.`);setSaving(false);return;}}
        setSaving(false);window.location.assign(contactUrl(message));
      }}>
        <label className="block text-sm">Seu nome <span className="text-neutral-500">*</span><input autoFocus name="name" required maxLength={100} autoComplete="name" value={brief.name} onChange={event => { event.target.setCustomValidity(""); update("name", event.target.value); }} className={fieldClass} placeholder="Como podemos te chamar?" /></label>
        <label className="block text-sm">Empresa ou segmento <span className="text-neutral-500">(opcional)</span><input name="business" maxLength={150} autoComplete="organization" value={brief.business} onChange={event => update("business", event.target.value)} className={fieldClass} placeholder="Ex.: escritório de arquitetura" /></label>
        <label className="block text-sm">O que você procura?<select name="projectType" value={brief.projectType} onChange={event => update("projectType", event.target.value)} className={fieldClass}>
          {["Ainda preciso de orientação", "Site institucional", "Landing page para vendas", "Melhorar meu site atual", "Automação ou Sistema", "Plano Essencial", "Plano Profissional"].map(value => <option key={value}>{value}</option>)}
        </select></label>
        <label className="block text-sm">Qual é seu principal objetivo? <span className="text-neutral-500">(opcional)</span><textarea name="objective" rows={2} maxLength={1000} value={brief.objective} onChange={event => update("objective", event.target.value)} className={`${fieldClass} resize-y`} placeholder="Ex.: receber mais orçamentos ou apresentar meus projetos" /></label>
        <label className="block text-sm">Quando pretende começar?<select name="timing" value={brief.timing} onChange={event => update("timing", event.target.value)} className={fieldClass}>
          {["Quero entender as possibilidades", "O quanto antes", "Nos próximos 30 dias", "Estou planejando para mais adiante"].map(value => <option key={value}>{value}</option>)}
        </select></label>
        <label className="block text-sm">WhatsApp ou e-mail <span className="text-neutral-500">(opcional)</span><input name="contact" maxLength={254} value={brief.contact} onChange={event=>update("contact",event.target.value)} className={fieldClass} placeholder="Contato para retornar sobre seu projeto"/></label>
        <label className="flex gap-2 text-xs leading-relaxed text-neutral-400"><input type="checkbox" checked={consent} onChange={event=>setConsent(event.target.checked)}/>Autorizo a Milia a registrar estes dados no CRM e retornar sobre este projeto.</label>
        {error&&<p role="alert" className="text-xs text-red-300">{error}</p>}
        <button type="submit" disabled={saving} className="flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-black hover:bg-neutral-200 disabled:opacity-50">{saving?"Salvando resumo…":"Continuar no WhatsApp"} <ArrowUpRight size={18} /></button>
        <p className="text-xs leading-relaxed text-neutral-500">Você revisa e envia a mensagem no WhatsApp. O registro no CRM depende da autorização acima.</p>
      </form>
    </dialog>
  );
}



