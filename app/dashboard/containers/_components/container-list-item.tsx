import Link from "next/link";

type ContainerListItemProps = {
  container: Container;
};

const ContainerListItem = ({ container }: ContainerListItemProps) => {
  return (
    <Link
      className="block"
      href={`/dashboard/containers/${container.service_id}`}
    >
      <div className="bg-secondary hover:bg-secondary/80 flex space-x-4 p-4 rounded-sm shadow-sm">
        <div className="border-dashed bg-blue-500/30 border-blue-700 border w-20 h-20"></div>
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
            className="px-1 py-0.5 bg-green-500/30 border text-sm border-green-700"
          >
            <span className="text-green-700">Running</span>
          </button>
        </div>
      </div>
    </Link>
  );
};
export default ContainerListItem;
