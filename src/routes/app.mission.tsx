import { createFileRoute } from "@tanstack/react-router";
import { Compass, Shield, Eye, Lock, Cpu } from "lucide-react";

export const Route = createFileRoute("/app/mission")({
  component: Mission,
});

function Mission() {
  return (
    <div className="px-6 py-6 max-w-4xl space-y-8">
      <header>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
          <Compass className="h-3.5 w-3.5" /> Our Charter
        </div>
        <h1 className="mt-4 text-5xl font-extrabold tracking-tight leading-[1.05]">
          Making safety <span className="text-primary">proactive, autonomous, and privacy-first.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground">
          We believe the world's most critical infrastructure deserves decision intelligence that doesn't just react —
          it anticipates, adapts, and saves lives in the golden seconds before an incident escalates.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <Shield className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-xl font-bold">Mission</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Equip every commercial perimeter — from gated communities to industrial scrapyards — with autonomous
            edge intelligence that turns passive cameras into a 24/7 decision-making security operations center.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <Eye className="h-6 w-6 text-primary" />
          <h2 className="mt-3 text-xl font-bold">Vision</h2>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            A world where citizen privacy and asset security are not in tension — where biometric inference happens
            on-device, footage stays inside the perimeter, and the cloud is an option, never a requirement.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
        <h2 className="text-xl font-bold">Core Principles</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Cpu, title: "Edge-First", desc: "Every inference runs on-device. No upstream calls. No latency." },
            { icon: Lock, title: "Privacy-Native", desc: "DPDP, GDPR, and ISO 27001 baked into the architecture, not bolted on." },
            { icon: Shield, title: "Operator-Centric", desc: "Built with security teams, not for marketing dashboards." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title}>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" />
              </div>
              <div className="mt-3 font-bold">{title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
