import { auth } from "@/app/auth";
import { Box } from "lucide-react";
import { getCharge } from "@/lib/billing-service";
import { formatToRp } from "@/lib/utils";

const ChargeDetail = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const charge = await getCharge(session.accessToken, params.id);
  if ("error" in charge) {
    throw new Error(charge.error);
  }

  const { data } = charge;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Box className="w-10 h-10 stroke-primary" />
          <div>
            <p className="font-bold text-xl">Charge Details</p>
            <p className="text-xs">ID: {data.ID}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Charge Information</h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Container ID:</span>{" "}
              {data.ContainerID}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">User ID:</span> {data.UserID}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Total CPU Usage:</span>{" "}
              {data.TotalCpuUsage} units
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Total Memory Usage:</span>{" "}
              {data.TotalMemoryUsage} MB
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">
                Total Network Ingress Usage:
              </span>{" "}
              {data.TotalNetIngressUsage} units
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Total Network Egress Usage:</span>{" "}
              {data.TotalNetEgressUsage} units
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(data.Timestamp).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Total Cost:</span>{" "}
              {formatToRp(parseFloat(data.TotalCost.toFixed(2)))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChargeDetail;
