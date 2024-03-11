"use client";
import React from "react";
import Image from "next/image";
import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Form } from "@radix-ui/react-form";
import supabaseBrowser from "../../../lib/supabase/browser";

// const formSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(8, {
//     message: "Password must be at least 8 characters long",
//   }),
// });

export default function page() {
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },d
  // });

  function handleLoginWithOauth() {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  }

  return (
    // <Form {...form}>
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
          {/* <div className="flex w-fit flex-col gap-3 pl-[5.5rem] pt-10">
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
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-md cursor-default text-xs font-thin">
                      password
                    </label>
                    <input
                      className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                      type="password"
                    />
                  </div>
                  <button
                    className="mt-3 bg-darkblue p-2 text-xs text-white outline outline-1 hover:bg-mainbuttons hover:text-lightblue"
                    onClick={() => handleLoginWithOauth}
                  >
                    Login
                  </button> */}

          <button
            className="flex items-center justify-center gap-2 bg-none p-2 text-xs text-black outline outline-1 hover:bg-midblue"
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
    //     </div>
    //   </div>
    // </div>
    //   console.log(user, data);
    // </Form>
  );
}
