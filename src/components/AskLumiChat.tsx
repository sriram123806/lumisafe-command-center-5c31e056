import { useEffect, useRef, useState } from "react";
import { MessageSquare, Send, X, ShieldCheck, Sparkles } from "lucide-react";

interface Msg {
  id: string;
  role: "user" | "ai";
  text: string;
}

const SUGGESTIONS = [
  "Status of Node 03?",
  "Any threats today?",
  "Show offline nodes",
  "Power usage trend",
];

function generateReply(q: string): string {
  const lower = q.toLowerCase();
  if (lower.includes("node 03") || lower.includes("basement"))
    return "Node 03 (Basement) is ONLINE · 18W · last anomaly 2h ago. Edge-AI v2.4.1 active.";
  if (lower.includes("threat") || lower.includes("intrusion"))
    return "0 active threats. 3 resolved in the last 24h. All perimeters nominal.";
  if (lower.includes("offline"))
    return "1 node offline: Node 07 (Server Closet) — last seen 14m ago. Auto-failover active.";
  if (lower.includes("power"))
    return "Avg power draw: 16.4W/node. Down 8% week-over-week thanks to v2.4 firmware.";
  if (lower.includes("hello") || lower.includes("hi"))
    return "Hi Operator. I'm LumiSafe AI — ask me about node status, threats, billing or analytics.";
  return `Acknowledged. Routing query to Edge-AI cluster… (mock response for: "${q}")`;
}

export function AskLumiChat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "init",
      role: "ai",
      text: "Hi Operator Beta — I'm LumiSafe AI. Ask about node status, anomalies, billing, or system health.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const user: Msg = { id: `u-${Date.now()}`, role: "user", text: trimmed };
    setMessages((m) => [...m, user]);
    setInput("");
    setTimeout(() => {
      const ai: Msg = { id: `a-${Date.now()}`, role: "ai", text: generateReply(trimmed) };
      setMessages((m) => [...m, ai]);
    }, 500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-start sm:items-center sm:justify-center bg-foreground/30 backdrop-blur-sm p-0 sm:p-6 animate-in fade-in duration-150">
      <div
        className="relative w-full sm:w-[460px] h-[86vh] sm:h-[640px] sm:max-h-[86vh] bg-card sm:rounded-2xl border border-border shadow-[var(--shadow-elevated)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15 backdrop-blur">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold tracking-tight flex items-center gap-1.5">
              LumiSafe AI <Sparkles className="h-3.5 w-3.5" />
            </div>
            <div className="text-[11px] opacity-90">Edge-AI assistant · always on</div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/15 transition-colors"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background/40">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={[
                  "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-card border border-border rounded-bl-sm",
                ].join(" ")}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[11px] rounded-full border border-border bg-card px-2.5 py-1 hover:border-primary/50 hover:text-primary transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="border-t border-border bg-card px-3 py-3 flex items-center gap-2"
        >
          <div className="flex-1 flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary/50 transition-colors">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about nodes, threats, billing…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
