import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import { Container } from "./_components/container";
import Sidebar from "./_components/sidebar";
import { auth } from "../auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Navbar user={session.user} />
      <div className="flex pt-20 h-full">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};
export default Layout;
