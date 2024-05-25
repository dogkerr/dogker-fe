"use client";

import { Box, CreditCard, Home, Settings } from "lucide-react";
import Item from "./item";
import { useSidebar } from "@/store/use-sidebar";

const sidebarItems = [
  {
    Icon: Home,
    label: "Overview",
    href: "/dashboard",
  },
  {
    Icon: Box,
    label: "Container",
    href: "/dashboard/containers",
  },
  {
    Icon: CreditCard,
    label: "Billing",
    href: "/dashboard/billing",
  },
  {
    Icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

const Sidebar = () => {
  const { collapsed } = useSidebar();

  if (collapsed) {
    return null;
  }

  return (
    <aside className="fixed space-y-5 px-4 pt-4 left-0 flex flex-col w-56 h-full bg-background drop-shadow-[0px_6px_4px_rgba(0,0,0,0.2)] z-[48]">
      {sidebarItems.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </aside>
  );
};
export default Sidebar;
