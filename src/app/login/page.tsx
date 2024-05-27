"use client";
import React, { useState } from "react";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import supabaseBrowser from "../../../lib/supabase/browser";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const supabase = createClientComponentClient();
  const router = useRouter();

  function handleGoToSignUp() {
    router.push("/signup");
  }

  function handleLoginWithOauth() {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    window.location.reload();
  };

  return (
    <div className="testBG">
      <div className="flex h-full w-2/3 items-center justify-center pl-5">
        <div className="flex h-screen flex-col justify-center">
          <Image
            src="/PlannnLogo.svg"
            width="350"
            height="350"
            alt="Plannn Logo"
            priority
          />
          <div className="flex flex-col gap-3 pl-[5.5rem] pt-10">
            <p className="cursor-default text-left text-[0.8rem] font-light uppercase text-darkblue">
              Login
            </p>
            <div>
              <div className="flex flex-col gap-5 pb-10">
                <div className="flex flex-col">
                  <label className="text-md text-md cursor-default text-xs">
                    Email
                  </label>
                  <input
                    className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-md cursor-default text-xs font-thin">
                    password
                  </label>
                  <input
                    className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="mt-3 bg-darkblue p-3 text-xs text-white outline outline-1 hover:bg-mainbuttons hover:text-lightblue"
                  onClick={handleSignIn}
                >
                  Login
                </button>
                <div className="flex justify-center gap-1 text-xs">
                  <p>Don't have an account? </p>
                  <span
                    className="cursor-pointer text-darkblue underline"
                    onClick={() => handleGoToSignUp()}
                  >
                    Sign up
                  </span>
                </div>
                <button
                  className="flex items-center justify-center gap-2 bg-none p-3 text-xs text-black outline outline-1 hover:bg-midblue"
                  onClick={() => handleLoginWithOauth()}
                >
                  <Image
                    src="/Google_icon.png"
                    width="15"
                    height="15"
                    alt="Login with Google"
                  />
                  Login with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
