import { Menu } from "lucide-react";
import Image from "next/image";
import Toggle from "./toggle";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full h-20 z-[49] border-b border-[#24292E]/30 shadow-sm">
      <div className="w-full py-2 px-4 h-11 border-b border-[#24292E]/30">
        <Image
          className="h-full w-auto"
          src={"/seal.png"}
          alt="dogker"
          width={100}
          height={70}
        />
      </div>
      <div className="w-full space-x-4 py-2 flex items-center px-4 h-9">
        <Toggle />
        <span className="text-sm">Overview</span>
      </div>
    </nav>
  );
};
export default Navbar;
