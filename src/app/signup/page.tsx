"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import supabaseBrowser from "../../../lib/supabase/browser";

// https://www.youtube.com/watch?v=oNmWyqBlgx4&t=70s

const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not a valid email"),
  password: z.string().min(8, "Password is required"),
  confirmPassword: z.string().min(8, "Please confirm your password"),
});

const Page = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signUp = async (formData) => {
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Successfully registered!");
      router.push("/login");
    }
  };

  const onSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    await signUp(values);
  };

  return (
    <div className="testBG">
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <Form.Root>
                        <div className="flex flex-col gap-5 pb-5">
                          <Form.Field
                            name="email"
                            className="flex flex-col gap-2"
                          >
                            <Form.Label className="text-md cursor-default text-xs">
                              Email
                            </Form.Label>
                            <Form.Message match="valueMissing">
                              Please enter your email
                            </Form.Message>
                            <Form.Message match="typeMismatch">
                              Please provide a valid email
                            </Form.Message>
                            <input
                              type="email"
                              className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                              {...form.register("email")}
                            />
                          </Form.Field>

                          <Form.Field
                            name="password"
                            className="flex flex-col gap-2"
                          >
                            <Form.Label className="text-md cursor-default text-xs">
                              Password
                            </Form.Label>
                            <Form.Message match="valueMissing">
                              Please enter your password
                            </Form.Message>
                            <Form.Message match="typeMismatch">
                              Please provide a valid password
                            </Form.Message>
                            <input
                              type="password"
                              className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                              {...form.register("password")}
                            />
                          </Form.Field>

                          <Form.Field
                            name="confirmPassword"
                            className="flex flex-col gap-2"
                          >
                            <Form.Label className="text-md cursor-default text-xs">
                              Confirm Password
                            </Form.Label>
                            <Form.Message match="valueMissing">
                              Please confirm your password
                            </Form.Message>
                            <Form.Message match="typeMismatch">
                              Please provide a valid password
                            </Form.Message>
                            <input
                              type="password"
                              className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                              {...form.register("confirmPassword")}
                            />
                          </Form.Field>
                        </div>
                      </Form.Root>
                    </div>
                    <button
                      type="submit"
                      className="bg-darkblue p-3 text-xs text-white outline outline-1 hover:bg-mainbuttons hover:text-lightblue"
                    >
                      Sign Up
                    </button>
                    <div className="flex justify-center gap-1 text-xs">
                      <p>Already have an account? </p>
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
      </form>
    </div>
  );
};

export default Page;
