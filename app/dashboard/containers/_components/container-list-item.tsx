import { cn } from "@/lib/utils";
import Link from "next/link";

type ContainerListItemProps = {
  container: Container;
};

// TODO: Tambahkan container yang dischedule ke list container
const ContainerListItem = ({ container }: ContainerListItemProps) => {
  const labelTextStyle = {
    "text-green-700": container.status === "RUN",
    "text-red-700": container.status === "TERMINATED",
    "text-orange-700": container.status === "STOP",
  };

  const labelColorStyle = {
    "border-green-700 bg-green-500/30": container.status === "RUN",
    "border-red-700 bg-red-500/30": container.status === "TERMINATED",
    "border-orange-700 bg-orange-500/30": container.status === "STOP",
  };

  return (
    <Link
      className="block"
      href={`/dashboard/containers/${container.service_id}`}
    >
      <div className="bg-secondary hover:bg-secondary/80 flex space-x-4 p-4 rounded-sm shadow-sm">
        <div className="border-dashed bg-blue-500/30 border-blue-700 rounded-sm border w-20 h-20"></div>
        <div className="flex-grow space-y-1">
          <p className="font-medium">{container.name}</p>
          <p className="text-sm text-gray-500">
            <span>
              Created time: {new Date(container.created_at).toLocaleString()} |{" "}
              Terminated time:{" "}
              {new Date(container.terminated_time).toLocaleString()} |{" "}
              {container.limit.cpus / 1000} CPU-Core |{" "}
              {container.limit.memory / 1000}GB
            </span>
          </p>
          <button
            type="button"
            className={cn(
              "px-1 py-0.5 border rounded-sm text-sm",
              labelColorStyle
            )}
          >
            <span className={cn(labelTextStyle)}>{container.status}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
export default ContainerListItem;
