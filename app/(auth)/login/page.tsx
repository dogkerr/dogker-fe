"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error && res.error !== "undefined") {
      setError("Invalid credentials");
      return;
    }

    setError("");
    router.replace("/dashboard/overview");
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
      <p className="max-w-[30ch] text-center">
        Login to <strong>Dogker</strong>
      </p>
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex-col space-y-4 flex w-80"
      >
        {error && (
          <div className="text-sm flex items-center justify-between bg-red-500/30 border border-red-700 text-red-700 rounded-sm px-4 py-3">
            <span>{error}</span>{" "}
            <X
              onClick={() => setError("")}
              className="cursor-pointer w-5 stroke-red-700"
            />
          </div>
        )}
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <p className="text-sm !mt-0">
          Don&apos;t have an account?{" "}
          <Link href={"/register"}>
            <Button className="px-0" variant={"link"}>
              Register
            </Button>
          </Link>
        </p>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};
export default Login;
