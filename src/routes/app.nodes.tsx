import { createFileRoute } from "@tanstack/react-router";
import { Server, Cpu, Activity } from "lucide-react";

export const Route = createFileRoute("/app/nodes")({
  component: Nodes,
});

interface Node {
  id: string;
  location: string;
  status: "online" | "offline";
  models: string[];
  ip: string;
  power: string;
}

const NODES: Node[] = [
  { id: "NODE-01", location: "Warehouse · Sector 1", status: "online", models: ["YOLO v8", "ReID-2"], ip: "10.0.4.11", power: "12.4 W" },
  { id: "NODE-02", location: "Back Wall · West Perimeter", status: "online", models: ["YOLO v8"], ip: "10.0.4.12", power: "9.8 W" },
  { id: "NODE-03", location: "Basement Parking · B1", status: "online", models: ["YOLO v8", "LPR-IN"], ip: "10.0.4.13", power: "14.1 W" },
  { id: "NODE-04", location: "Main Gate · Perimeter A", status: "online", models: ["YOLO v8", "LPR-IN", "ReID-2"], ip: "10.0.4.14", power: "16.2 W" },
  { id: "NODE-05", location: "Scrapyard Sector B", status: "offline", models: ["YOLO v8"], ip: "10.0.4.15", power: "0.0 W" },
  { id: "NODE-06", location: "Loading Bay · East", status: "online", models: ["YOLO v8", "Loiter-Net"], ip: "10.0.4.16", power: "11.7 W" },
  { id: "NODE-07", location: "Rooftop Telemetry", status: "online", models: ["Thermal-V1"], ip: "10.0.4.17", power: "8.3 W" },
  { id: "NODE-08", location: "Server Room HVAC", status: "online", models: ["Anomaly-Net"], ip: "10.0.4.18", power: "10.5 W" },
];

export const Route2 = Route;

function Nodes() {
  const online = NODES.filter((n) => n.status === "online").length;
  const total = NODES.length;
  const power = NODES.reduce((s, n) => s + parseFloat(n.power), 0).toFixed(1);

  return (
    <div className="px-6 py-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Node Infrastructure</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Status, inventory, and health of deployed Edge-AI nodes.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: Server, label: "Nodes Online", value: `${online}/${total}` },
          { icon: Cpu, label: "AI Models Deployed", value: "11" },
          { icon: Activity, label: "Total Power Draw", value: `${power} W` },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-3xl font-bold">{value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold">All Nodes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Node ID</th>
                <th className="px-5 py-3 font-semibold">Physical Location</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Installed AI Models</th>
                <th className="px-5 py-3 font-semibold">IP Address</th>
                <th className="px-5 py-3 font-semibold text-right">Power</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {NODES.map((n) => (
                <tr key={n.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <a href="#" className="font-semibold text-primary hover:underline">{n.id}</a>
                  </td>
                  <td className="px-5 py-3.5 text-foreground">{n.location}</td>
                  <td className="px-5 py-3.5">
                    {n.status === "online" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" /> ONLINE
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2 py-0.5 text-[11px] font-bold text-destructive">
                        <span className="h-1.5 w-1.5 rounded-full bg-destructive" /> OFFLINE
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex flex-wrap gap-1">
                      {n.models.map((m) => (
                        <span key={m} className="inline-flex rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">{m}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{n.ip}</td>
                  <td className="px-5 py-3.5 text-right font-semibold">{n.power}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
