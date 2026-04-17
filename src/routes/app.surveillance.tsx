import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertBanner } from "@/components/AlertBanner";
import { useNotifications, type NodeId } from "@/lib/notifications";
import { Maximize2, Mic, Radio, Volume2, Camera, Pause } from "lucide-react";

import gateImg from "@/assets/feed-gate.jpg";
import warehouseImg from "@/assets/feed-warehouse.jpg";
import backwallImg from "@/assets/feed-backwall.jpg";
import basementImg from "@/assets/feed-basement.jpg";
import scrapyardImg from "@/assets/feed-scrapyard.jpg";
import parkingImg from "@/assets/feed-parking.jpg";
import rooftopImg from "@/assets/feed-rooftop.jpg";
import loadingDockImg from "@/assets/feed-loadingdock.jpg";
import lobbyImg from "@/assets/feed-lobby.jpg";
import perimeterImg from "@/assets/feed-perimeter.jpg";

interface Feed {
  id: NodeId;
  label: string;
  short: string;
  location: string;
  img: string;
  status: "online" | "offline";
  detections: { label: string; confidence: number; x: number; y: number; w: number; h: number }[];
}

const FEEDS: Feed[] = [
  {
    id: "node-04",
    label: "NODE 04 - MAIN GATE",
    short: "Main Gate",
    location: "Main Gate · Perimeter A",
    img: gateImg,
    status: "online",
    detections: [
      { label: "Vehicle", confidence: 98, x: 28, y: 45, w: 22, h: 32 },
      { label: "Person", confidence: 97, x: 56, y: 50, w: 10, h: 28 },
    ],
  },
  {
    id: "node-01",
    label: "NODE 01 - WAREHOUSE",
    short: "Warehouse",
    location: "Storage Block · Sector 1",
    img: warehouseImg,
    status: "online",
    detections: [{ label: "Person", confidence: 92, x: 42, y: 38, w: 14, h: 40 }],
  },
  {
    id: "node-02",
    label: "NODE 02 - BACK WALL",
    short: "Back Wall",
    location: "Perimeter Wall · West",
    img: backwallImg,
    status: "online",
    detections: [],
  },
  {
    id: "node-03",
    label: "NODE 03 - BASEMENT",
    short: "Basement",
    location: "Underground Lot · B1",
    img: basementImg,
    status: "online",
    detections: [{ label: "Vehicle", confidence: 95, x: 30, y: 50, w: 20, h: 30 }],
  },
  {
    id: "node-05",
    label: "NODE 05 - SCRAPYARD",
    short: "Scrapyard",
    location: "Scrapyard · Sector B",
    img: scrapyardImg,
    status: "online",
    detections: [{ label: "Vehicle", confidence: 89, x: 38, y: 22, w: 18, h: 14 }],
  },
  {
    id: "node-06",
    label: "NODE 06 - PARKING LOT",
    short: "Parking",
    location: "Visitor Lot · East",
    img: parkingImg,
    status: "online",
    detections: [],
  },
  {
    id: "node-07",
    label: "NODE 07 - ROOFTOP",
    short: "Rooftop",
    location: "Rooftop · Tower 2",
    img: rooftopImg,
    status: "offline",
    detections: [],
  },
  {
    id: "node-08",
    label: "NODE 08 - LOADING DOCK",
    short: "Loading Dock",
    location: "Logistics Bay · North",
    img: loadingDockImg,
    status: "online",
    detections: [{ label: "Vehicle", confidence: 96, x: 12, y: 32, w: 28, h: 48 }],
  },
  {
    id: "node-09",
    label: "NODE 09 - LOBBY",
    short: "Lobby",
    location: "Reception · Block A",
    img: lobbyImg,
    status: "online",
    detections: [],
  },
  {
    id: "node-10",
    label: "NODE 10 - PERIMETER",
    short: "Perimeter",
    location: "Outer Fence · South",
    img: perimeterImg,
    status: "online",
    detections: [{ label: "Person", confidence: 88, x: 60, y: 55, w: 8, h: 28 }],
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

  const active = useMemo(() => FEEDS.find((f) => f.id === activeId) ?? FEEDS[0], [activeId]);
  const recentForActive = recentAnomalies.find((a) => a.nodeId === activeId);

  return (
    <div className="px-6 py-6 space-y-5">
      <header className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Live Surveillance</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time multi-node Edge-AI video intelligence · {FEEDS.filter((f) => f.status === "online").length}/{FEEDS.length} nodes online
          </p>
        </div>
        <button
          onClick={() => triggerAnomaly({ nodeId: "node-03" })}
          className="inline-flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/10 transition-colors"
        >
          <Radio className="h-3.5 w-3.5" /> Simulate Anomaly
        </button>
      </header>

      <AlertBanner
        active={!!recentForActive && Date.now() - recentForActive.timestamp < 10000}
        message={recentForActive ? `⚠ INTRUSION DETECTED AT ${active.label}` : undefined}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">
        {/* Main Feed - large, fills center */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex items-center gap-1.5 rounded-md bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive pulse-dot" /> LIVE
              </span>
              <div className="text-sm font-semibold tracking-tight truncate">[ LIVE FEED: {active.label} ]</div>
              <div className="text-xs text-muted-foreground hidden md:block truncate">· {active.location}</div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
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

        {/* Right scrollable preview rail */}
        <aside className="flex flex-col rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] overflow-hidden lg:max-h-[calc(100vh-220px)]">
          <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-muted/40 shrink-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Node Previews</div>
            <span className="text-[10px] font-semibold text-primary">{FEEDS.length} feeds</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
            {FEEDS.map((f) => {
              const isActive = f.id === activeId;
              const isOffline = f.status === "offline";
              return (
                <button
                  key={f.id}
                  onClick={() => !isOffline && setActiveId(f.id)}
                  disabled={isOffline}
                  className={[
                    "group block w-full text-left rounded-xl border overflow-hidden transition-all",
                    isActive
                      ? "border-primary ring-2 ring-primary/30 shadow-[var(--shadow-elevated)]"
                      : "border-border hover:border-primary/50 hover:shadow-[var(--shadow-card)]",
                    isOffline ? "opacity-60 cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  <div className="relative aspect-video bg-foreground/80">
                    <img
                      src={f.img}
                      alt={f.label}
                      loading="lazy"
                      className={`absolute inset-0 h-full w-full object-cover ${isOffline ? "grayscale" : ""}`}
                    />
                    {isActive && (
                      <div className="absolute inset-0 ring-2 ring-inset ring-primary pointer-events-none" />
                    )}
                    <div
                      className={[
                        "absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[9px] font-bold backdrop-blur",
                        isOffline
                          ? "bg-destructive/90 text-destructive-foreground"
                          : "bg-primary/90 text-primary-foreground",
                      ].join(" ")}
                    >
                      <span className={`h-1 w-1 rounded-full ${isOffline ? "bg-destructive-foreground" : "bg-primary-foreground pulse-dot"}`} />
                      {isOffline ? "OFFLINE" : "ONLINE"}
                    </div>
                    {isActive && (
                      <div className="absolute top-1.5 right-1.5 rounded-md bg-foreground/80 px-1.5 py-0.5 text-[9px] font-bold text-background">
                        VIEWING
                      </div>
                    )}
                  </div>
                  <div className="px-2.5 py-1.5">
                    <div className={`text-xs font-semibold truncate ${isActive ? "text-primary" : "group-hover:text-primary"} transition-colors`}>
                      {f.short}
                    </div>
                    <div className="text-[10px] text-muted-foreground truncate">{f.id.toUpperCase()}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
