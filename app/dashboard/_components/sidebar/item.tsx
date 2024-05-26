"use client";

import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type ItemProps = {
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
};

const Item = ({ Icon, label, href }: ItemProps) => {
  const pathname = usePathname();
  const isActive = pathname.includes(href);

  return (
    <Link className="flex group items-center space-x-4 text-sm" href={href}>
      <Icon
        className={cn(
          "w-5 group-hover:stroke-primary",
          isActive && "stroke-primary"
        )}
      />
      <span
        className={cn("group-hover:text-primary", isActive && "text-primary")}
      >
        {label}
      </span>
    </Link>
  );
};
export default Item;
