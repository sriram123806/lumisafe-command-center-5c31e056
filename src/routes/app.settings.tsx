import { createFileRoute } from "@tanstack/react-router";
import { Bell, Shield, Monitor, Globe, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});

const CARDS = [
  { icon: Bell, title: "Notification Preferences", desc: "Configure alert thresholds, escalation rules, and notification channels." },
  { icon: Shield, title: "Security Policies", desc: "Manage DPDP compliance settings, data retention, and access control." },
  { icon: Monitor, title: "Display & Interface", desc: "Customize dashboard layout, video themes, and data visualization preferences." },
  { icon: Globe, title: "API & Integrations", desc: "Manage API keys, webhook endpoints, and third-party integrations." },
];

function Settings() {
  return (
    <div className="px-6 py-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Configure platform preferences and security policies.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CARDS.map(({ icon: Icon, title, desc }) => (
          <button
            key={title}
            className="group text-left rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h2 className="mt-4 text-base font-bold">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
