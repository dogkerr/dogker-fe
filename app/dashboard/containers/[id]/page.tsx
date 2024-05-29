import { auth } from "@/app/auth";
import { getContainer } from "@/lib/container-service";
import { Box } from "lucide-react";

const ContainerDetail = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const data = await getContainer(params.id, session.accessToken);
  if ("error" in data) {
    throw new Error("Failed to fetch container: " + data.error);
  }

  return (
    <div>
      <div className="flex items-center space-x-4">
        <Box className="w-10 h-10 stroke-primary" />
        <div>
          <p className="font-bold text-xl">{data.container.name}</p>
          <p className="text-xs">{data.container.service_id}</p>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Container Details</h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Status:</span>{" "}
              {data.container.status}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Image:</span>{" "}
              {data.container.image}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Replicas:</span>{" "}
              {data.container.replica}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Available Replicas:</span>{" "}
              {data.container.replica_available}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">User ID:</span>{" "}
              {data.container.user_id}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(data.container.created_at).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Terminated Time:</span>{" "}
              {data.container.terminated_time === "0001-01-01T00:00:00Z"
                ? "N/A"
                : new Date(data.container.terminated_time).toLocaleString()}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Resource Limits</h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">CPUs:</span>{" "}
              {data.container.limit.cpus}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Memory:</span>{" "}
              {data.container.limit.memory} MB
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Endpoints</h3>
            {data.container.endpoint.map((ep, index) => (
              <p key={index} className="text-sm text-gray-600">
                <span className="font-semibold">
                  {ep.protocol.toUpperCase()} - Target Port:
                </span>{" "}
                {ep.target_port},{" "}
                <span className="font-semibold">Published Port:</span>{" "}
                {ep.published_port}
              </p>
            ))}
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Lifecycles</h3>
            {data.container.all_container_lifecycles.map((lifecycle) => (
              <div
                key={lifecycle.id}
                className="px-6 py-3 border border-gray-200 rounded-md"
              >
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Status:</span>{" "}
                  {lifecycle.status}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Replica:</span>{" "}
                  {lifecycle.replica}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Start Time:</span>{" "}
                  {new Date(lifecycle.start_time).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Stop Time:</span>{" "}
                  {lifecycle.stop_time === "0001-01-01T00:00:00Z"
                    ? "N/A"
                    : new Date(lifecycle.stop_time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContainerDetail;
