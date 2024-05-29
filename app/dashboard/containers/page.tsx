import { Box } from "lucide-react";
import ContainerListItem from "./_components/container-list-item";
import { Button } from "@/components/ui/button";
import { auth } from "@/app/auth";
import { getContainers } from "@/lib/container-service";
import ActionButtons from "./_components/action-buttons";

const ContainerList = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const data = await getContainers(session.accessToken);
  if ("error" in data) {
    throw new Error("Failed to fetch containers: " + data.error);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Box className="w-10 h-10 stroke-primary" />
          <span className="font-bold text-xl">Container</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-xs">
            <p className="text-black/80">Count</p>
            <p>{data.containers.length} containers</p>
          </div>
          <div className="border-r border-black/30 h-12"></div>
          <ActionButtons session={session} />
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {data.containers.map((container, index) => (
          <ContainerListItem key={index} container={container} />
        ))}
      </div>
    </div>
  );
};
export default ContainerList;
