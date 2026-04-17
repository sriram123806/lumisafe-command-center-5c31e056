import { Link, useLocation } from "@tanstack/react-router";
import { ShieldCheck, Video, Server, BarChart3, CreditCard, Newspaper, Compass, Settings, Send, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NAV = [
  { to: "/app/surveillance", label: "Live Surveillance", icon: Video },
  { to: "/app/nodes", label: "Node Infrastructure", icon: Server },
  { to: "/app/analytics", label: "Analytics & Usage", icon: BarChart3 },
  { to: "/app/billing", label: "Subscription & Billing", icon: CreditCard },
  { to: "/app/news", label: "Disruption News", icon: Newspaper },
  { to: "/app/mission", label: "Mission & Vision", icon: Compass },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const location = useLocation();
  const [query, setQuery] = useState("");

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-sidebar text-sidebar-foreground h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="text-base font-bold tracking-tight">LumiSafe AI</div>
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Commercial Command</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV.map(({ to, label, icon: Icon }) => {
          const active = location.pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              ].join(" ")}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Ask LumiSafe AI */}
      <div className="px-3 pb-3">
        <div className="rounded-xl bg-accent/60 p-3">
          <div className="text-[11px] uppercase tracking-wider text-accent-foreground font-semibold mb-2">Ask LumiSafe AI</div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!query.trim()) return;
              toast.success("Query dispatched to Edge-AI", { description: query });
              setQuery("");
            }}
            className="flex items-center gap-1.5 rounded-lg bg-card border border-border px-2 py-1.5"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Status of Node 03?"
              className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="text-primary hover:text-primary/80">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Profile */}
      <div className="border-t border-sidebar-border px-4 py-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
          <User className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">Operator Beta</div>
          <div className="text-[11px] text-muted-foreground truncate">Gated Community Sec-Team</div>
        </div>
      </div>
    </aside>
  );
}
