import { Outlet } from "@tanstack/react-router";
import { AppSidebar } from "./AppSidebar";
import { useNotifications } from "@/lib/notifications";
import { AlertBanner } from "./AlertBanner";

export function AppShell() {
  const { recentAnomalies } = useNotifications();
  const latest = recentAnomalies[0];
  // Show top alert if anomaly within last 8s
  const showAlert = latest && Date.now() - latest.timestamp < 8000;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 min-w-0">
        {showAlert && (
          <div className="sticky top-0 z-30 px-6 pt-4">
            <AlertBanner active message={`⚠ INTRUSION ALERT AT ${latest.nodeLabel.toUpperCase()}`} />
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}
