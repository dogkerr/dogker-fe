"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const BillingDetail = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="[&:not(:last-child)]:border-b hover:bg-black/[0.05] cursor-pointer border-[#24292E]/15"
    >
      <div className="grid py-2 grid-cols-3">
        <span className="flex items-center">
          <ChevronDown className="w-3 mx-3" />
          <span>Container 1</span>
        </span>
        <span>1 GB RAM, 1 CPU</span>
        <span className="font-bold">$5</span>
      </div>
      {isOpen && (
        <ul className="border-l border-[#24292E]/25 p-4 ml-5 mb-4 space-y-2">
          <li>
            <strong>CPU: </strong> 2 CPU core-hours * $0.10/core-hour = $0.20
          </li>
          <li>
            <strong>Memory: </strong> 2 GB-hours * $0.10/GB-hour = $0.20
          </li>
          <li>
            <strong>Ingress: </strong> 2 GB * $0.10/GB = $0.20
          </li>
          <li>
            <strong>Egress: </strong> 2 GB * $0.10/GB = $0.20
          </li>
        </ul>
      )}
    </div>
  );
};
export default BillingDetail;
