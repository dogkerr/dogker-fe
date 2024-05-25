import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex space-y-8 flex-col items-center justify-center">
      <Image
        className="w-60"
        src={"/dogker-logo.png"}
        alt="Logo Dogker"
        width={500}
        height={300}
      />
      <p className="max-w-[30ch] text-center">
        Welcome to <strong>Dogker</strong>! The Ultimate Container as a Service
        Solution for Developers and DevOps Teams
      </p>
      <div className="flex-col space-y-3 flex w-80">
        <Link href="/login">
          <Button className="w-full">Login</Button>
        </Link>
        <Link href="/login">
          <Button className="w-full" variant={"secondary"}>
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
