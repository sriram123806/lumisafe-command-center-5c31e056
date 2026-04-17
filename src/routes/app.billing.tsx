import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Calendar, Server, Download } from "lucide-react";

export const Route = createFileRoute("/app/billing")({
  component: Billing,
});

const HISTORY = [
  { date: "Mar 01, 2026", amount: "₹1,80,000", status: "Paid", invoice: "INV-2026-003" },
  { date: "Feb 01, 2026", amount: "₹1,80,000", status: "Paid", invoice: "INV-2026-002" },
  { date: "Jan 01, 2026", amount: "₹1,80,000", status: "Paid", invoice: "INV-2026-001" },
  { date: "Dec 01, 2025", amount: "₹1,65,000", status: "Paid", invoice: "INV-2025-012" },
  { date: "Nov 01, 2025", amount: "₹1,65,000", status: "Paid", invoice: "INV-2025-011" },
];

function Billing() {
  return (
    <div className="px-6 py-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Subscription & Billing</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Manage plan, nodes, and payment history.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/8 to-card p-6 shadow-[var(--shadow-card)]" style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 8%, var(--card)), var(--card))" }}>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Current Plan</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-1">Commercial Pro</h2>
              <p className="text-sm text-muted-foreground mt-1">15 Nodes · Unlimited AI inferences · Air-gapped deployment</p>
            </div>
            <CreditCard className="h-6 w-6 text-primary" />
          </div>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Billing Cycle</div>
              <div className="font-semibold mt-0.5">Monthly</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Next Charge</div>
              <div className="font-semibold mt-0.5">Apr 01, 2026</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Expiry</div>
              <div className="font-semibold mt-0.5">Oct 2026</div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">Upgrade Plan</button>
            <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors">Manage Nodes</button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Server className="h-3.5 w-3.5 text-primary" /> Node Allocation
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">12</span>
              <span className="text-sm text-muted-foreground">/ 15 active</span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "80%" }} />
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">3 slots available for expansion</div>
          </div>
          <div className="mt-5 pt-5 border-t border-border">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-primary" /> Contract
            </div>
            <div className="mt-2 text-sm font-semibold">12-month renewal</div>
            <div className="text-[11px] text-muted-foreground">Renews Oct 14, 2026</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-[var(--shadow-card)]">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Billing History</h2>
          <button className="text-xs font-semibold text-primary hover:text-primary/80">View all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3 font-semibold">Date Paid</th>
                <th className="px-5 py-3 font-semibold">Invoice</th>
                <th className="px-5 py-3 font-semibold">Amount Paid</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {HISTORY.map((h) => (
                <tr key={h.invoice} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3.5">{h.date}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-muted-foreground">{h.invoice}</td>
                  <td className="px-5 py-3.5 font-semibold">{h.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">{h.status.toUpperCase()}</span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80">
                      <Download className="h-3.5 w-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
