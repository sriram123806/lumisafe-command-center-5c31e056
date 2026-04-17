import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { Activity, Cpu, ShieldCheck, Zap } from "lucide-react";

export const Route = createFileRoute("/app/analytics")({
  component: Analytics,
});

const incidentData = [
  { name: "Intrusion", value: 42 },
  { name: "Vehicles", value: 78 },
  { name: "Loitering", value: 23 },
  { name: "Unknown", value: 11 },
];

const COLORS = ["#00875A", "#10B981", "#64748b", "#ef4444"];

const powerData = Array.from({ length: 30 }, (_, i) => ({
  day: `D${i + 1}`,
  watts: 88 + Math.sin(i / 3) * 8 + Math.random() * 6,
}));

function Analytics() {
  return (
    <div className="px-6 py-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Analytics & Usage</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Operational metrics across the Edge-AI fleet.</p>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Cpu, label: "Total Active Nodes", value: "121/124", trend: "+2.4%" },
          { icon: ShieldCheck, label: "Threats Prevented", value: "154", trend: "+18%" },
          { icon: Zap, label: "Avg Edge Latency", value: "42ms", trend: "-6ms" },
          { icon: Activity, label: "System Uptime", value: "99.97%", trend: "+0.02%" },
        ].map(({ icon: Icon, label, value, trend }) => (
          <div key={label} className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
            <div className="mt-1 text-xs font-semibold text-primary">{trend} this week</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="font-semibold">Incident Breakdown</h2>
          <p className="text-xs text-muted-foreground mb-4">Last 30 days · by category</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incidentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {incidentData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="font-semibold">Incident Type Distribution</h2>
          <p className="text-xs text-muted-foreground mb-4">Share of total events</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={incidentData} dataKey="value" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {incidentData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <h2 className="font-semibold">System Power Usage (Last 30 Days)</h2>
          <p className="text-xs text-muted-foreground mb-4">Aggregate watts across all online nodes</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={powerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} unit=" W" />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="watts" stroke="#00875A" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
