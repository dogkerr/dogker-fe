"use client";

import { Button } from "@/components/ui/button";
import { cn, formatToRp } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Mutation = {
  id: string;
  mutation: number;
  type: "deposit" | "charge";
  currentBalance: number;
  chargeId: string;
  depositId: string;
  createdAt: string;
};

export const columns: ColumnDef<Mutation>[] = [
  {
    accessorKey: "id",
    header: "Billing ID",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;

      return <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>;
    },
  },
  {
    accessorKey: "mutation",
    header: "Mutation",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("mutation"));
      const isCharge = row.original.chargeId ? true : false;

      return (
        <span
          className={cn(
            "font-bold",
            isCharge ? "text-red-700" : "text-green-700"
          )}
        >
          {formatToRp(amount)}
        </span>
      );
    },
  },
  {
    accessorKey: "currentBalance",
    header: "Current Balance",
    cell: ({ row }) => {
      const amount = row.getValue<number>("currentBalance");

      return <span className="font-semibold">{formatToRp(amount)}</span>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mutation = row.original;
      const type = mutation.chargeId ? "charge" : "deposit";
      const id = mutation.chargeId ? mutation.chargeId : mutation.depositId;
      const url = `/dashboard/billing/${id}/${type}`;

      return (
        <Link href={url}>
          <Button size={"xs"}>See details</Button>
        </Link>
      );
    },
  },
];
