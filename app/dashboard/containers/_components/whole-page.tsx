"use client";

import { Box } from "lucide-react";
import ActionButtons from "./action-buttons";
import ContainerListItem from "./container-list-item";
import { Session } from "next-auth";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type WholePageProps = {
  data: ContainersResponse;
  session: Session;
};

const WholePage = ({ data, session }: WholePageProps) => {
  const [showTerminatedContainer, setShowTerminatedContainer] = useState(false);

  const filteredContainers =
    data.containers &&
    data.containers.filter(
      (container) =>
        showTerminatedContainer || container.status !== "TERMINATED"
    );

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Box className="w-10 h-10 stroke-primary" />
          <span className="font-bold text-xl">Container</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-xs">
            <p className="text-black/80">Count</p>
            <p>{data.containers ? data.containers.length : "No"} containers</p>
          </div>
          <div className="border-r border-black/30 h-12"></div>
          <Button
            onClick={() => setShowTerminatedContainer((val) => !val)}
            size={"xs"}
          >
            {showTerminatedContainer
              ? "Hide terminated container"
              : "Show terminated container"}
          </Button>
          <ActionButtons session={session} />
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {filteredContainers &&
          filteredContainers.map((container, index) => (
            <ContainerListItem key={index} container={container} />
          ))}
      </div>
    </>
  );
};
export default WholePage;
