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
import { Fragment } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "next-auth";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

type NavbarProps = {
  user: {
    id: string;
    fullname: string;
    username: string;
    email: string;
  } & User;
};

const Navbar = ({ user }: NavbarProps) => {
  const segments = useSelectedLayoutSegments();

  return (
    <nav className="fixed bg-white top-0 w-full h-20 z-[49] border-b border-[#24292E]/30 shadow-sm">
      <div className="w-full flex items-center justify-between py-2 px-4 h-11 border-b border-[#24292E]/30">
        <Image
          className="h-full w-auto"
          src={"/seal.png"}
          alt="dogker"
          width={100}
          height={70}
        />
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer h-full w-auto">
            <div className="flex items-center space-x-2 h-full w-auto">
              <Avatar className="h-full w-auto">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Profile pic"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="text-xs font-medium">{user.fullname}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="w-full space-x-4 py-2 flex items-center px-4 h-9">
        <Toggle />
        <Breadcrumb>
          <BreadcrumbList>
            {segments.map((segment, index, segments) => (
              <Fragment key={index}>
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
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </nav>
  );
};
export default Navbar;
