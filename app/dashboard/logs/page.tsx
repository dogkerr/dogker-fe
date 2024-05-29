import { auth } from "@/app/auth";
import { getLogs } from "@/lib/monitor-service";
import { modifyLinks } from "@/lib/utils";
import { FileClock } from "lucide-react";

const Logs = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const logsData = await getLogs(session.accessToken);
  if ("error" in logsData) {
    throw new Error(logsData.error);
  }

  const newLogsData = modifyLinks(
    logsData,
    "http://localhost",
    "http://10.70.70.1"
  ) as unknown as LogsLink;

  return (
    <div>
      <div className="flex items-center space-x-4">
        <FileClock className="w-10 h-10 stroke-primary" />
        <span className="font-bold text-xl">Logs</span>
      </div>
      <div className="mt-8 space-y-4">
        <div className="overflow-hidden h-[65rem] relative">
          <iframe
            className="relative -top-20 w-full h-[80rem]"
            src={newLogsData.logs_dashboard_link}
          ></iframe>
        </div>
      </div>
    </div>
  );
};
export default Logs;
