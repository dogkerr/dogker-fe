import { Box } from "lucide-react";
import ContainerListItem from "./_components/container-list-item";

const ContainerList = () => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <Box className="w-10 h-10 stroke-primary" />
        <span className="font-bold text-xl">Container</span>
      </div>
      <div className="mt-8 space-y-4">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <ContainerListItem key={index} containerId={index.toString()} />
          ))}
      </div>
    </div>
  );
};
export default ContainerList;
