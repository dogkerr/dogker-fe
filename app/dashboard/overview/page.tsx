import { auth } from "@/app/auth";
import { getMonitor } from "@/lib/monitor-service";
import { modifyLinks } from "@/lib/utils";
import { Home } from "lucide-react";

const Dashboard = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const monitorData = await getMonitor(session.accessToken);
  if ("error" in monitorData) {
    throw new Error(monitorData.error);
  }

  const newMonitorData = modifyLinks(
    monitorData,
    "http://127.0.0.1",
    "http://10.70.70.1"
  ) as unknown as MonitoringLinks;

  return (
    <div>
      <div className="flex items-center space-x-4">
        <Home className="w-10 h-10 stroke-primary" />
        <span className="font-bold text-xl">Overview</span>
      </div>
      <div className="mt-8 space-y-4">
        <iframe
          className="inline"
          src={newMonitorData.total_container}
        ></iframe>
        <iframe
          className="inline w-full h-80"
          src={newMonitorData.overall_cpu_usage}
        ></iframe>
        <iframe
          className="inline w-full h-80"
          src={newMonitorData.cpu_usage_link}
        ></iframe>
        <iframe
          className="inline w-full h-80"
          src={newMonitorData.memory_swap_per_container_link}
        ></iframe>
        <iframe
          className="inline w-full h-80"
          src={newMonitorData.memory_usage_not_graph}
        ></iframe>
        <iframe
          className="inline w-full h-80"
          src={newMonitorData.memory_usage_per_container_link}
        ></iframe>
        <iframe
          className="inline w-full h-80"
          src={newMonitorData.received_network_link}
        ></iframe>
        <iframe
          className="inline w-full h-80"
          src={newMonitorData.send_network_link}
        ></iframe>
      </div>
    </div>
  );
};
export default Dashboard;
