import { auth } from "@/app/auth";
import { getDeposit } from "@/lib/billing-service";
import { formatToRp } from "@/lib/utils";
import { Box } from "lucide-react";

const DepositDetail = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const deposit = await getDeposit(session.accessToken, params.id);
  if ("error" in deposit) {
    throw new Error(deposit.error);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Box className="w-10 h-10 stroke-primary" />
          <div>
            <p className="font-bold text-xl">Deposit Details</p>
            <p className="text-xs">ID: {deposit.data.ID}</p>
          </div>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900">Transaction Details</h3>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">User ID:</span>{" "}
              {deposit.data.UserID}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Amount:</span>{" "}
              {formatToRp(deposit.data.Amount)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Status:</span>{" "}
              {deposit.data.Status}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Created At:</span>{" "}
              {new Date(deposit.data.CreatedAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Updated At:</span>{" "}
              {new Date(deposit.data.UpdatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositDetail;
