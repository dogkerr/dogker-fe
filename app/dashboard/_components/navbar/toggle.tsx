"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Menu } from "lucide-react";

const Toggle = () => {
  const { collapsed, onCollapse, onExpand } = useSidebar();

  const handler = collapsed ? onExpand : onCollapse;

  return (
    <button onClick={handler} type="button" className="h-full w-auto">
      <Menu className="h-full w-auto" />
    </button>
  );
};
export default Toggle;
