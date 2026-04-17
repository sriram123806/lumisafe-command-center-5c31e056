import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export type NodeId = "node-01" | "node-02" | "node-03" | "node-04";

interface Anomaly {
  id: string;
  nodeId: NodeId;
  nodeLabel: string;
  type: "intrusion" | "loitering" | "vehicle";
  severity: "critical" | "warning";
  timestamp: number;
}

interface NotificationContextValue {
  focusNodeId: NodeId | null;
  setFocusNodeId: (id: NodeId | null) => void;
  triggerAnomaly: (a?: Partial<Anomaly>) => void;
  recentAnomalies: Anomaly[];
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

const NODE_LABELS: Record<NodeId, string> = {
  "node-01": "Node 01 - Warehouse",
  "node-02": "Node 02 - Back Wall",
  "node-03": "Node 03 - Basement",
  "node-04": "Node 04 - Main Gate",
};

export function NotificationProvider({ children, onAnomaly }: { children: ReactNode; onAnomaly?: (a: Anomaly) => void }) {
  const [focusNodeId, setFocusNodeId] = useState<NodeId | null>(null);
  const [recentAnomalies, setRecentAnomalies] = useState<Anomaly[]>([]);
  const onAnomalyRef = useRef(onAnomaly);
  onAnomalyRef.current = onAnomaly;

  const triggerAnomaly = useCallback((partial?: Partial<Anomaly>) => {
    const nodeId: NodeId = partial?.nodeId ?? "node-03";
    const anomaly: Anomaly = {
      id: `anom-${Date.now()}`,
      nodeId,
      nodeLabel: NODE_LABELS[nodeId],
      type: partial?.type ?? "intrusion",
      severity: partial?.severity ?? "critical",
      timestamp: Date.now(),
    };
    setRecentAnomalies((prev) => [anomaly, ...prev].slice(0, 10));
    onAnomalyRef.current?.(anomaly);
  }, []);

  // Auto-trigger a demo anomaly every 45 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nodes: NodeId[] = ["node-01", "node-02", "node-03"];
      triggerAnomaly({ nodeId: nodes[Math.floor(Math.random() * nodes.length)] });
    }, 45000);
    return () => clearInterval(interval);
  }, [triggerAnomaly]);

  const value = useMemo(
    () => ({ focusNodeId, setFocusNodeId, triggerAnomaly, recentAnomalies }),
    [focusNodeId, triggerAnomaly, recentAnomalies],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}

export const NODE_LABEL_MAP = NODE_LABELS;
