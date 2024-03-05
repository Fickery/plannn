import React from "react";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

function signInPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // function onSubmit(data: z.infer<typeof formSchema>) {

  // }

  return (
    <div className="testBG">
      <div className="flex h-full w-2/3 items-center justify-center pl-5">
        <div className="flex h-screen flex-col justify-center">
          <Image
            src="/PlannnLogo.svg"
            width="350"
            height="350"
            alt="Plannn Logo"
          />
          <div className="flex w-fit flex-col gap-2 bg-slate-200 pl-[5.5rem] pt-10">
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
                <button className="hover:bg-mainbuttons bg-darkblue p-2 text-xs text-white outline outline-1 hover:text-lightblue">
                  Login
                </button>

                <button className="flex items-center justify-center gap-2 bg-none p-2 text-xs text-black outline outline-1 hover:bg-midblue">
                  <Image
                    src="/Google_icon.png"
                    width="15"
                    height="15"
                    alt="Login with Google"
                  />
                  Login with Google
                </button>
              </div>
              {/* <p className="flex justify-center pb-2 text-xs text-darkblue">
                or login with
              </p>
              <div className="flex justify-between gap-5">
                <p className="text-md cursor-pointer font-thin hover:underline">
                  Google
                </p>
                <p className="text-md cursor-pointer font-thin hover:underline">
                  Github
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default signInPage;
