import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register");
  };

  return (
    <div className="w-full h-screen flex space-y-8 flex-col items-center justify-center">
      <Image
        className="w-60"
        src={"/dogker-logo.png"}
        alt="Logo Dogker"
        width={500}
        height={300}
      />
      <p className="max-w-[30ch] text-center">Register an account</p>
      <form
        onSubmit={(e) => handleRegister(e)}
        className="flex-col space-y-4 flex w-80"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="fullName">Full Name</Label>
          <Input type="text" id="fullName" placeholder="Full Name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input type="text" id="username" placeholder="Username" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password" />
        </div>
        <p className="text-sm !mt-0">
          Already have an account?{" "}
          <Link href={"/login"}>
            <Button className="px-0" variant={"link"}>
              Login
            </Button>
          </Link>
        </p>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
};
export default Register;
