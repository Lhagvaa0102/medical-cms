"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/admin",
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[300px] space-y-3">
        <input
          placeholder="email"
          className="border p-2 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="password"
          type="password"
          className="border p-2 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white p-2 w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
