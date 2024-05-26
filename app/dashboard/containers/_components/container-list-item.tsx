import Link from "next/link";

type ContainerListItemProps = {
  containerId: string;
};

const ContainerListItem = ({ containerId }: ContainerListItemProps) => {
  return (
    <Link className="block" href={`/dashboard/containers/${containerId}`}>
      <div className="bg-secondary hover:bg-secondary/80 flex space-x-4 p-4 rounded-sm shadow-sm">
        <div className="border-dashed bg-blue-500/30 border-blue-700 border w-20 h-20"></div>
        <div className="flex-grow space-y-1">
          <p className="font-medium">acme-billing-service</p>
          <p className="text-sm text-gray-500">
            <span>
              Last pull: 30/03/24 (12:00) | 1 CPU-Core | 2GB |
              https://example.hub.com
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
