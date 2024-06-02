import { CreditCard } from "lucide-react";
import { DataTable } from "./_components/data-table";
import { Mutation, columns } from "./_components/data-table/columns";
import { auth } from "@/app/auth";
import { getMutations } from "@/lib/billing-service";
import ActionButtons from "./_components/action-buttons";

const Billing = async () => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const mutations = await getMutations(session.accessToken);
  if ("error" in mutations) {
    throw new Error(mutations.error);
  }

  const data: Mutation[] = mutations.map((mutation) => ({
    id: mutation.ID,
    type: mutation.Type,
    mutation:
      mutation.Type === "deposit" ? mutation.Mutation : -1 * mutation.Mutation,
    currentBalance: mutation.Balance,
    createdAt: new Date(mutation.CreatedAt).toLocaleString(),
    chargeId: mutation.ChargeID,
    depositId: mutation.DepositID,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <CreditCard className="w-10 h-10 stroke-primary" />
          <span className="font-bold text-xl">Billing</span>
        </div>
        <div className="flex items-center space-x-4">
          <ActionButtons session={session} />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};
export default Billing;
