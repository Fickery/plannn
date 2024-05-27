"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const supabase = createClientComponentClient();

  function handleGoToSignUp() {
    redirect("/signup");
  }

  const handleSignIn = async (data: FormData) => {
    try {
      const { email, password } = data;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError("password", {
          type: "manual",
          message: "Incorrect email or password",
        });
        throw error;
      }
      window.location.reload();
    } catch (error) {
      console.error("Password sign-in error:", error);
    }
  };

  const handleGoogleClick = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/auth/callback",
        },
      });
      if (data.url) {
        redirect(data.url);
      }
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
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
          />
          <div className="flex flex-col gap-3 pl-[5.5rem] pt-10">
            <p className="cursor-default text-left text-[0.8rem] font-light uppercase text-darkblue">
              Login
            </p>
            <div>
              <form
                onSubmit={handleSubmit(handleSignIn)}
                className="flex flex-col gap-5 pb-10"
              >
                <div className="flex flex-col">
                  <label className="text-md text-md cursor-default text-xs">
                    Email
                  </label>
                  <input
                    className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-xs text-red-500">
                      {errors.email.message}
                    </span>
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
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="mt-3 bg-darkblue p-3 text-xs text-white outline outline-1 hover:bg-mainbuttons hover:text-lightblue"
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
              </form>
              <form action={handleGoogleClick}>
                <button className="flex w-full items-center justify-center gap-2 bg-none p-3 text-xs text-black outline outline-1 hover:bg-midblue">
                  <Image
                    src="/Google_icon.png"
                    width="15"
                    height="15"
                    alt="Login with Google"
                  />
                  Login with Google
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
