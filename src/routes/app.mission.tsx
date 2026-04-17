import { createFileRoute } from "@tanstack/react-router";
import { Compass, Shield, Eye, Lock, Cpu } from "lucide-react";

import heroImg from "@/assets/mission-hero.jpg";
import missionImg from "@/assets/mission-mission.jpg";
import visionImg from "@/assets/mission-vision.jpg";

export const Route = createFileRoute("/app/mission")({
  component: Mission,
});

function Mission() {
  return (
    <div className="px-6 py-6 max-w-6xl space-y-10">
      {/* Hero */}
      <header className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            <Compass className="h-3.5 w-3.5" /> Our Charter
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Making safety <span className="text-primary">proactive, autonomous, and privacy-first.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            We believe the world's most critical infrastructure deserves decision intelligence that doesn't just react —
            it anticipates, adapts, and saves lives in the golden seconds before an incident escalates.
          </p>
        </div>
        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-[var(--shadow-elevated)]">
          <img
            src={heroImg}
            alt="LumiSafe AI autonomous intelligence"
            width={1280}
            height={960}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </header>

      {/* Mission + Vision cards with imagery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={missionImg}
              alt="Security camera on a modern building"
              width={1280}
              height={720}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              <Shield className="h-3 w-3" /> Mission
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold">Equip every commercial perimeter</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              From gated communities to industrial scrapyards — autonomous edge intelligence that turns passive cameras
              into a 24/7 decision-making security operations center.
            </p>
          </div>
        </div>

        <div className="group rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all">
          <div className="relative aspect-[16/9] overflow-hidden">
            <img
              src={visionImg}
              alt="Privacy-first protection at a gated community"
              width={1280}
              height={720}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
              <Eye className="h-3 w-3" /> Vision
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold">Privacy and security, never in tension</h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              A world where biometric inference happens on-device, footage stays inside the perimeter, and the cloud
              is an option — never a requirement.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principles */}
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
