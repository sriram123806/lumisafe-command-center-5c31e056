import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, Lock, ArrowRight, Cpu, Wifi, EyeOff } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LumiSafe AI — Autonomous Edge Security for Commercial Assets" },
      { name: "description", content: "Secure communities and storage hubs with zero-latency AI video analytics. Air-gapped SOC platform for B2B clients." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Top nav */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-5 border-b border-border/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-bold">LumiSafe AI</div>
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Commercial Command</div>
          </div>
        </div>
        <button
          onClick={() => setShowLogin(true)}
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Operator Sign-in →
        </button>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
          AIR-GAPPED EDGE-AI · NO CLOUD DEPENDENCY
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]">
          Autonomous Edge Security<br />
          <span className="text-primary">for Commercial Assets.</span>
        </h1>
        <p className="mt-6 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Secure communities and storage hubs with zero-latency AI video analytics. On-device intelligence — your footage never leaves the perimeter.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => setShowLogin(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-[var(--shadow-elevated)] hover:shadow-[var(--shadow-glow)]"
          >
            Authenticate Operator <ArrowRight className="h-4 w-4" />
          </button>
          <Link to="/app/surveillance" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-all">
            Live Demo
          </Link>
        </div>

        {/* Feature row */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          {[
            { icon: Cpu, title: "On-Device Inference", desc: "Sub-50ms detection with no upstream calls." },
            { icon: EyeOff, title: "Privacy-First", desc: "DPDP-compliant, footage stays on-prem." },
            { icon: Wifi, title: "Resilient Mesh", desc: "Operates across LAN outages and degraded links." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
              <Icon className="h-5 w-5 text-primary mb-3" />
              <div className="font-semibold text-foreground">{title}</div>
              <div className="text-sm text-muted-foreground mt-1">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Login overlay */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm px-4" onClick={() => setShowLogin(false)}>
          <div
            className="w-full max-w-md rounded-2xl bg-card p-8 shadow-[var(--shadow-elevated)] border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Air-Gapped SOC Authentication</h2>
                <p className="text-xs text-muted-foreground">Operator credentials required</p>
              </div>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                navigate({ to: "/app/surveillance" });
              }}
            >
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Agency ID</label>
                <input
                  defaultValue="AGENCY-BETA-04"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
                <input
                  type="password"
                  defaultValue="••••••••••"
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm font-medium outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-[var(--shadow-elevated)]"
              >
                Authenticate <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-[11px] text-center text-muted-foreground">
                Authentication occurs on-prem. No credentials transit external networks.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
