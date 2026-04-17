import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertBanner } from "@/components/AlertBanner";
import { useNotifications, type NodeId } from "@/lib/notifications";
import { Maximize2, Mic, Radio, Volume2, Camera, Pause } from "lucide-react";

import gateImg from "@/assets/feed-gate.jpg";
import warehouseImg from "@/assets/feed-warehouse.jpg";
import backwallImg from "@/assets/feed-backwall.jpg";
import basementImg from "@/assets/feed-basement.jpg";

interface Feed {
  id: NodeId;
  label: string;
  location: string;
  img: string;
  detections: { label: string; confidence: number; x: number; y: number; w: number; h: number }[];
}

const FEEDS: Feed[] = [
  {
    id: "node-04",
    label: "NODE 04 - MAIN GATE",
    location: "Main Gate · Perimeter A",
    img: gateImg,
    detections: [
      { label: "Vehicle", confidence: 98, x: 28, y: 45, w: 22, h: 32 },
      { label: "Person", confidence: 97, x: 56, y: 50, w: 10, h: 28 },
    ],
  },
  {
    id: "node-01",
    label: "NODE 01 - WAREHOUSE",
    location: "Storage Block · Sector 1",
    img: warehouseImg,
    detections: [{ label: "Person", confidence: 92, x: 42, y: 38, w: 14, h: 40 }],
  },
  {
    id: "node-02",
    label: "NODE 02 - BACK WALL",
    location: "Perimeter Wall · West",
    img: backwallImg,
    detections: [],
  },
  {
    id: "node-03",
    label: "NODE 03 - BASEMENT",
    location: "Underground Lot · B1",
    img: basementImg,
    detections: [{ label: "Vehicle", confidence: 95, x: 30, y: 50, w: 20, h: 30 }],
  },
];

export const Route = createFileRoute("/app/surveillance")({
  validateSearch: (s: Record<string, unknown>) => ({ focus: (s.focus as string | undefined) ?? undefined }),
  component: Surveillance,
});

function Surveillance() {
  const { focus } = useSearch({ from: "/app/surveillance" });
  const { recentAnomalies, triggerAnomaly } = useNotifications();
  const [activeId, setActiveId] = useState<NodeId>("node-04");

  useEffect(() => {
    if (focus && FEEDS.some((f) => f.id === focus)) setActiveId(focus as NodeId);
  }, [focus]);

  const active = useMemo(() => FEEDS.find((f) => f.id === activeId)!, [activeId]);
  const previews = FEEDS.filter((f) => f.id !== activeId);
  const recentForActive = recentAnomalies.find((a) => a.nodeId === activeId);

  return (
    <div className="px-6 py-6 space-y-5">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live Surveillance</h1>
          <p className="text-sm text-muted-foreground mt-0.5">Real-time multi-node Edge-AI video intelligence.</p>
        </div>
        <button
          onClick={() => triggerAnomaly({ nodeId: "node-03" })}
          className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Radio className="h-3.5 w-3.5" /> Simulate Anomaly
        </button>
      </header>

      <AlertBanner active={!!recentForActive && Date.now() - recentForActive.timestamp < 10000} message={recentForActive ? `⚠ INTRUSION DETECTED AT ${active.label}` : undefined} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
        {/* Main Feed */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-md bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive pulse-dot" /> LIVE
              </span>
              <div className="text-sm font-semibold tracking-tight">[ LIVE FEED: {active.label} ]</div>
              <div className="text-xs text-muted-foreground hidden sm:block">· {active.location}</div>
            </div>
            <div className="flex items-center gap-1">
              {[Mic, Volume2, Camera, Pause, Maximize2].map((Icon, i) => (
                <button key={i} className="p-1.5 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>
          <div className="relative aspect-video bg-foreground">
            <img src={active.img} alt={active.label} className="absolute inset-0 h-full w-full object-cover" />
            {/* Scan line */}
            <div className="absolute inset-x-0 top-0 h-0.5 bg-primary/60 scan-line pointer-events-none" />
            {/* AI Bounding boxes */}
            {active.detections.map((d, i) => (
              <div
                key={i}
                className="absolute border-2 border-primary"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: `${d.w}%`,
                  height: `${d.h}%`,
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.4)",
                }}
              >
                <div className="absolute -top-6 left-0 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                  {d.label} ({d.confidence}%)
                </div>
              </div>
            ))}
            {/* HUD overlay */}
            <div className="absolute top-3 right-3 flex flex-col items-end gap-1 text-[10px] font-mono text-white/90">
              <div className="bg-black/50 px-2 py-1 rounded">REC · {new Date().toLocaleTimeString()}</div>
              <div className="bg-black/50 px-2 py-1 rounded">EDGE-AI v2.4.1 · 28 FPS</div>
            </div>
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-white/90">
              LAT 40ms · {active.location.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Right preview stack */}
        <aside className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">Node Previews</div>
          {previews.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveId(f.id)}
              className="group block w-full text-left rounded-xl border border-border bg-card overflow-hidden hover:border-primary/50 hover:shadow-[var(--shadow-elevated)] transition-all"
            >
              <div className="relative aspect-video">
                <img src={f.img} alt={f.label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-md bg-primary/90 backdrop-blur px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground">
                  <span className="h-1 w-1 rounded-full bg-primary-foreground pulse-dot" /> ONLINE
                </div>
              </div>
              <div className="px-3 py-2.5">
                <div className="text-sm font-semibold truncate group-hover:text-primary transition-colors">{f.label}</div>
                <div className="text-[11px] text-muted-foreground truncate">{f.location}</div>
              </div>
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}
