import { ShieldCheck, AlertTriangle } from "lucide-react";

export function AlertBanner({ active, message }: { active?: boolean; message?: string }) {
  if (active) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive">
        <AlertTriangle className="h-5 w-5 shrink-0" />
        <span className="text-sm font-semibold tracking-tight">{message ?? "INTRUSION DETECTED"}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-3 rounded-xl border border-primary/25 bg-primary/8 px-4 py-3 text-primary" style={{ backgroundColor: "color-mix(in oklab, var(--primary) 8%, transparent)" }}>
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-50 pulse-dot"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
      </span>
      <ShieldCheck className="h-5 w-5 shrink-0" />
      <span className="text-sm font-semibold tracking-tight">SYSTEM SECURE — 0 ACTIVE THREATS</span>
    </div>
  );
}
