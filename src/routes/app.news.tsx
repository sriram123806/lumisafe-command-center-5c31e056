import { createFileRoute } from "@tanstack/react-router";
import { Newspaper, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/app/news")({
  component: News;
});

interface Item {
  date: string;
  tag: "Firmware" | "Compliance" | "Breaking" | "Release";
  title: string;
  desc: string;
}

const ITEMS: Item[] = [
  { date: "Mar 28, 2026", tag: "Firmware", title: "Firmware Update v2.1 Released", desc: "Improved low-light Re-ID accuracy by 12% across all NODE-class devices. Rolling deployment underway." },
  { date: "Mar 22, 2026", tag: "Breaking", title: "Edge-Mesh Resilience Patch (Critical)", desc: "Addresses a rare race condition in the inter-node failover protocol. Auto-applied to all subscribed agencies." },
  { date: "Mar 14, 2026", tag: "Compliance", title: "Understanding the DPDP Act inside Edge-AI", desc: "How LumiSafe's on-device architecture protects citizen privacy by processing all biometric data within the perimeter." },
  { date: "Mar 04, 2026", tag: "Release", title: "Firmware v2.4 — Enhanced Scale-Invariant Kinematics", desc: "The latest OTA update reduces false positives by 31% in industrial loitering detection." },
  { date: "Feb 17, 2026", tag: "Compliance", title: "ISO 27001:2026 Certification Renewed", desc: "LumiSafe AI's commercial command platform passes annual audit with zero non-conformities." },
];

const TAG_STYLES: Record<Item["tag"], string> = {
  Firmware: "bg-primary/10 text-primary",
  Compliance: "bg-accent text-accent-foreground",
  Breaking: "bg-destructive/10 text-destructive",
  Release: "bg-muted text-foreground",
};

function News() {
  return (
    <div className="px-6 py-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Disruption News</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Stay informed on deployments, compliance, and field intelligence.</p>
      </header>

      <div className="space-y-3">
        {ITEMS.map((item) => (
          <article key={item.title} className="group rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Newspaper className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-muted-foreground">{item.date}</span>
                  <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TAG_STYLES[item.tag]}`}>{item.tag}</span>
                </div>
                <h2 className="mt-1.5 text-lg font-bold tracking-tight group-hover:text-primary transition-colors">{item.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
