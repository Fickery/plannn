"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// const registerSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email is required")
//     .email("This is not a valid email"),
//   password: z.string().min(8, "Password is required"),
//   confirmPassword: z.string().min(8, "Please confirm your password"),
// });

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {},
    });
    router.refresh();
    setEmail("");
    setPassword("");
  };
  // const form = useForm({
  //   resolver: zodResolver(registerSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   },
  // });

  // const signUp = async (formData) => {
  //   const supabase = supabaseBrowser();
  //   const { error } = await supabase.auth.signUp({
  //     email: formData.email,
  //     password: formData.password,
  //     options: {
  //       emailRedirectTo: window.location.origin,
  //     },
  //   });

  //   if (error) {
  //     setError(error.message);
  //   } else {
  //     setSuccess("Successfully registered!");
  //     router.push("/login");
  //   }
  // };

  return (
    <div className="testBG">
      <div>
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
                Sign Up
              </p>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <div className="flex flex-col gap-5 pb-5">
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

                      <label className="text-md text-md cursor-default text-xs">
                        Password
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
                      type="submit"
                      className="bg-darkblue p-3 text-xs text-white outline outline-1 hover:bg-mainbuttons hover:text-lightblue"
                      onClick={handleSignUp}
                    >
                      Sign Up
                    </button>
                    <div className="mt-5 flex justify-center gap-1 text-xs">
                      <p>Already have an account?</p>
                      <span
                        className="cursor-pointer text-darkblue underline"
                        onClick={() => router.push("/login")}
                      >
                        Login
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
