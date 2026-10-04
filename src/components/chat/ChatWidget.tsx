"use client";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, ArrowUpRight, Send } from "lucide-react";
import { openContactBrief } from "@/components/ui/ContactBrief";
type Message = { role: string; text: string };
export function ChatWidget() {
  const dialog = useRef<HTMLDialogElement>(null),
    bottom = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]),
    [text, setText] = useState(""),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [consent, setConsent] = useState(false),
    [summary, setSummary] = useState(""),
    [captured, setCaptured] = useState(false);
  const [mode, setMode] = useState("");
  useEffect(() => {
    bottom.current?.scrollIntoView({ block: "nearest" });
  }, [messages, busy]);
  async function send(body: unknown) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || "Não foi possível responder agora.");
    return data;
  }
  const open = async () => {
    dialog.current?.showModal();
    try {
      const response = await fetch("/api/chat");
      if (response.ok) {
        const data = await response.json();
        setMessages(data.messages || []);
        setSummary(data.memory || "");
        setMode(data.aiConfigured ? "openai" : "deterministic");
      }
    } catch {
      setError("Verifique sua conexão e tente novamente.");
    }
  };
  return (
    <>
      <button
        aria-label="Conversar com o assistente Milia"
        onClick={() => void open()}
        className="fixed bottom-5 left-5 z-40 flex items-center gap-2 rounded-full border border-white/20 bg-[#17191D] px-4 py-3 text-sm text-white shadow-lg hover:bg-[#24272C]"
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline">Vamos pensar no seu site?</span>
        <span className="sm:hidden">Assistente Milia</span>
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="chat-title"
        className="fixed m-auto w-[calc(100%-2rem)] max-w-md max-h-[88dvh] overflow-y-auto rounded-2xl border border-white/20 bg-[#121316] p-5 text-white shadow-2xl backdrop:bg-black/70"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] tracking-widest text-neutral-500">
              MILIA CO. / ASSISTENTE
            </p>
            <h2 id="chat-title" className="mt-2 text-xl">
              Vamos entender seu projeto.
            </h2>
          </div>
          <button
            onClick={() => dialog.current?.close()}
            aria-label="Fechar assistente"
            className="p-2"
          >
            <X size={20} />
          </button>
        </div>
        <p className="my-4 text-xs leading-relaxed text-neutral-400">
          Atendimento automatizado para orientar sobre os serviços. As mensagens
          ficam no CRM para acompanhar seu projeto. Com IA habilitada, os dados
          necessários da conversa são enviados à OpenAI para redigir a resposta.
          Evite informações sensíveis.
        </p>
        <label className="mb-4 flex gap-2 text-xs text-neutral-300">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          Autorizo registrar esta conversa para atendimento do meu projeto.
        </label>
        <div
          aria-live="polite"
          aria-relevant="additions"
          className="max-h-[35dvh] overflow-y-auto space-y-3 py-2"
        >
          {!messages.length && (
            <p className="rounded-xl bg-white/5 p-3 text-sm">
              Olá! A Milia cria sites para apresentar seu trabalho e facilitar
              novos contatos. Como seus clientes encontram sua empresa hoje?
            </p>
          )}
          {messages.map((m, i) => (
            <p
              key={i}
              className={`rounded-xl p-3 text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user" ? "ml-7 bg-white text-black" : "mr-4 bg-white/5 text-neutral-200"}`}
            >
              <span className="mb-1 block text-[10px] opacity-60">
                {m.role === "user" ? "VOCÊ" : "MILIA"}
              </span>
              {m.text}
            </p>
          ))}
          {busy && (
            <p className="text-xs text-neutral-500">Preparando resposta…</p>
          )}
          <div ref={bottom} />
        </div>
        {error && (
          <p role="alert" className="my-3 text-xs text-red-300">
            {error}
          </p>
        )}
        <form
          className="mt-3 flex gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!text.trim() || busy || !consent) return;
            setBusy(true);
            setError("");
            const value = text;
            try {
              const data = await send({
                action: "message",
                text: value,
                consent: true,
              });
              setMessages((prev) => [
                ...prev,
                { role: "user", text: value },
                { role: "assistant", text: data.reply },
              ]);
              setSummary(data.summary);
              setMode(data.mode);
              setText("");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Erro de conexão.");
            } finally {
              setBusy(false);
            }
          }}
        >
          <label className="sr-only" htmlFor="chat-message">
            Sua mensagem
          </label>
          <input
            id="chat-message"
            value={text}
            maxLength={2000}
            onChange={(e) => setText(e.target.value)}
            placeholder="Conte seu objetivo…"
            className="min-w-0 flex-1 rounded-lg border border-white/15 bg-[#1B1C21] px-3 py-3 text-sm outline-none focus:border-white"
          />
          <button
            disabled={busy || !consent || !text.trim()}
            aria-label="Enviar mensagem ao assistente"
            className="rounded-lg bg-white px-3 text-black disabled:opacity-30"
          >
            <Send size={18} />
          </button>
        </form>
        {mode && <p className="mt-2 text-[10px] text-neutral-500" role="status">{mode === "openai" ? "Conversa assistida por IA." : mode === "deterministic_fallback" ? "A IA está indisponível no momento. Atendimento automático de apoio." : "Atendimento automático. IA ainda não habilitada."}</p>}
        {!!messages.length && !captured && (
          <details className="mt-4 text-sm">
            <summary className="text-neutral-400">
              Quero receber uma proposta
            </summary>
            <form
              className="space-y-2 mt-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                setBusy(true);
                setError("");
                try {
                  await send({
                    action: "capture",
                    name: fd.get("name"),
                    company: fd.get("company"),
                    contact: fd.get("contact"),
                    consent: true,
                  });
                  setCaptured(true);
                } catch (err) {
                  setError(
                    err instanceof Error ? err.message : "Erro ao salvar.",
                  );
                } finally {
                  setBusy(false);
                }
              }}
            >
              {[
                ["name", "Seu nome"],
                ["company", "Empresa"],
                ["contact", "WhatsApp ou e-mail"],
              ].map(([name, label]) => (
                <label key={name} className="block text-xs text-neutral-400">
                  {label}
                  <input
                    name={name}
                    required={name !== "company"}
                    maxLength={name === "contact" ? 254 : 100}
                    className="mt-1 w-full rounded-lg border border-white/15 bg-[#1B1C21] p-2 text-sm text-white"
                  />
                </label>
              ))}
              <p className="text-xs text-neutral-500">
                Ao salvar, você autoriza a equipe Milia a retornar sobre este
                projeto usando o contato informado.
              </p>
              <button
                disabled={busy || !consent}
                className="rounded-lg bg-white px-3 py-2 text-xs text-black"
              >
                Salvar contato para retorno
              </button>
            </form>
          </details>
        )}
        {captured && (
          <p role="status" className="mt-3 text-xs text-green-200">
            Contato registrado para a equipe acompanhar seu projeto.
          </p>
        )}
        <button
          className="mt-4 flex items-center gap-2 text-xs text-neutral-300 hover:text-white"
          onClick={() => {
            dialog.current?.close();
            openContactBrief({
              context:
                "Gostaria de conversar com a equipe após usar o assistente Milia.",
              values: { objective: summary },
            });
          }}
        >
          Levar resumo para a equipe no WhatsApp <ArrowUpRight size={14} />
        </button>
      </dialog>
    </>
  );
}
