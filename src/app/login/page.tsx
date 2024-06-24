"use client";
import React from "react";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import supabaseBrowser from "../../../lib/supabase/browser";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface FormValues {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Page() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const handleGoToSignUp = () => {
    router.push("/signup");
  };

  const handleLoginWithOauth = () => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleSignIn = async (data: { email: string; password: string }) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      window.location.reload();
    }
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
            <div>
              <p className="text-[0.65rem] text-slate-400">DEMO ACCOUNT:</p>
              <p className="text-[0.8rem] text-slate-400">
                <strong>email:</strong> demo@usethis.com{" "}
                <strong>password:</strong> password123
              </p>
            </div>
            <p className="cursor-default text-left text-[0.8rem] font-light uppercase text-darkblue">
              Login
            </p>
            <form onSubmit={handleSubmit(handleSignIn)}>
              <div className="flex flex-col gap-5 pb-10">
                <div className="flex flex-col">
                  <label className="text-md text-md cursor-default text-xs">
                    Email
                  </label>
                  <input
                    className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && typeof errors.email === "string" && (
                    <span className="text-xs text-red-500">{errors.email}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-md cursor-default text-xs font-thin">
                    Password
                  </label>
                  <input
                    className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                    type="password"
                    {...register("password")}
                  />
                  {errors.password && typeof errors.password === "string" && (
                    <span className="text-xs text-red-500">
                      {errors.password}
                    </span>
                  )}
                </div>
                <button
                  className="mt-3 bg-darkblue p-3 text-xs text-white outline outline-1 hover:bg-mainbuttons hover:text-lightblue"
                  type="submit"
                >
                  Login
                </button>
                <div className="flex justify-center gap-1 text-xs">
                  <p>Don't have an account? </p>
                  <span
                    className="cursor-pointer text-darkblue underline"
                    onClick={handleGoToSignUp}
                  >
                    Sign up
                  </span>
                </div>
                <button
                  className="flex items-center justify-center gap-2 bg-none p-3 text-xs text-black outline outline-1 hover:bg-midblue"
                  type="button"
                  onClick={handleLoginWithOauth}
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
