"use client";

import Image from "next/image";
import Toggle from "./toggle";
import { useSelectedLayoutSegments } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const Navbar = () => {
  const segments = useSelectedLayoutSegments();

  return (
    <nav className="fixed bg-white top-0 w-full h-20 z-[49] border-b border-[#24292E]/30 shadow-sm">
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
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment, index, segments) => (
              <>
                <BreadcrumbItem key={index}>
                  <BreadcrumbLink asChild>
                    <Link
                      href={`/dashboard/${segments
                        .slice(0, index + 1)
                        .join("/")}`}
                    >
                      {index === 0
                        ? segment.charAt(0).toUpperCase() + segment.slice(1)
                        : segment}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < segments.length - 1 && (
                  <BreadcrumbSeparator key={`separator-${index}`} />
                )}
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  );
};
export default Navbar;
