import { createFileRoute } from "@tanstack/react-router";
import { Newspaper, ArrowUpRight } from "lucide-react";

import deploymentImg from "@/assets/news-deployment.jpg";
import firmwareImg from "@/assets/news-firmware.jpg";
import complianceImg from "@/assets/news-compliance.jpg";
import meshImg from "@/assets/news-mesh.jpg";

export const Route = createFileRoute("/app/news")({
  component: News,
});

interface Item {
  date: string;
  tag: "Firmware" | "Compliance" | "Breaking" | "Release";
  title: string;
  desc: string;
  img: string;
}

const ITEMS: Item[] = [
  { date: "Mar 28, 2026", tag: "Firmware", title: "Firmware Update v2.1 Released", desc: "Improved low-light Re-ID accuracy by 12% across all NODE-class devices. Rolling deployment underway.", img: firmwareImg },
  { date: "Mar 22, 2026", tag: "Breaking", title: "Edge-Mesh Resilience Patch (Critical)", desc: "Addresses a rare race condition in the inter-node failover protocol. Auto-applied to all subscribed agencies.", img: meshImg },
  { date: "Mar 14, 2026", tag: "Compliance", title: "Understanding the DPDP Act inside Edge-AI", desc: "How LumiSafe's on-device architecture protects citizen privacy by processing all biometric data within the perimeter.", img: complianceImg },
  { date: "Mar 04, 2026", tag: "Release", title: "Firmware v2.4 — Enhanced Scale-Invariant Kinematics", desc: "The latest OTA update reduces false positives by 31% in industrial loitering detection.", img: firmwareImg },
  { date: "Feb 17, 2026", tag: "Compliance", title: "ISO 27001:2026 Certification Renewed", desc: "LumiSafe AI's commercial command platform passes annual audit with zero non-conformities.", img: complianceImg },
];

const TAG_STYLES: Record<Item["tag"], string> = {
  Firmware: "bg-primary/10 text-primary",
  Compliance: "bg-accent text-accent-foreground",
  Breaking: "bg-destructive/10 text-destructive",
  Release: "bg-muted text-foreground",
};

function News() {
  const [feature, ...rest] = ITEMS;

  return (
    <div className="px-6 py-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Disruption News</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Stay informed on deployments, compliance, and field intelligence.</p>
      </header>

      {/* Featured story */}
      <article className="group grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:border-primary/30 transition-all cursor-pointer">
        <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
          <img
            src={deploymentImg}
            alt="Smart city deployment"
            width={1280}
            height={720}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-md bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            Featured
          </div>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground">Apr 02, 2026</span>
            <span className="inline-flex rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">Deployment</span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
            Zone 2 Corridors Provisioned Across 14 Commercial Sites
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Major intersections across our enterprise client network now run autonomous edge-AI 24/7,
            with zero-latency inference handling intrusion, loitering, and vehicle classification.
          </p>
          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Read full report <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </article>

      {/* Card grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rest.map((item) => (
          <article
            key={item.title}
            className="group rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:border-primary/30 transition-all cursor-pointer flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                width={1280}
                height={720}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground">{item.date}</span>
                <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TAG_STYLES[item.tag]}`}>{item.tag}</span>
              </div>
              <h2 className="mt-2 text-base font-bold tracking-tight group-hover:text-primary transition-colors">{item.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground line-clamp-3">{item.desc}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <Newspaper className="h-3.5 w-3.5" /> Read more
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
