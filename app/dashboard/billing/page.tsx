import { ChevronDown, CreditCard } from "lucide-react";
import BillingDetail from "./_components/billing-detail";

const Billing = () => {
  return (
    <div>
      <div className="flex items-center space-x-4">
        <CreditCard className="w-10 h-10 stroke-primary" />
        <span className="font-bold text-xl">Billing</span>
      </div>
      <div className="mt-8 text-sm">
        <div className="grid py-2 grid-cols-3 border-b border-[#24292E]/15">
          <span className="font-bold ml-8">Container Name</span>
          <span className="font-bold">Specifications</span>
          <span className="font-bold">Cost</span>
        </div>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <BillingDetail key={index} />
          ))}
      </div>
    </div>
  );
};
export default Billing;
