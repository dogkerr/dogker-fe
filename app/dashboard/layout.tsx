import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import { Container } from "./_components/container";
import Sidebar from "./_components/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex pt-20 h-full">
        <Sidebar />
        <Container>{children}</Container>
      </div>
    </>
  );
};
export default Layout;
