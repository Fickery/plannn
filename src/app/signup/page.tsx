"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Username is required").max(9),
  password: z.string().min(8, "Password is required"),
  comfirmPassword: z.string().min(8, "Please comfirm your password"),
});

export default function page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      comfirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          confirmPassword: values.comfirmPassword,
        }),
      });

      if (response.ok) {
        router.push("/auth");
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignUp = () => {
    console.log("registering user");
  };

  function handleGoToLogin() {
    router.push("/auth");
  }

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
                <div>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                      <Form.Root>
                        <div className="flex flex-col gap-5 pb-5">
                          <Form.Field
                            name="username"
                            className="flex flex-col gap-2"
                          >
                            <Form.Label className="text-md text-md cursor-default text-xs">
                              Username
                            </Form.Label>
                            <Form.Message match="valueMissing">
                              Please enter your Username
                            </Form.Message>
                            <Form.Message match="typeMismatch">
                              Please provide a valid username
                            </Form.Message>
                            <input
                              type="text"
                              className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                            />
                          </Form.Field>

                          <Form.Field
                            name="password"
                            className="flex flex-col gap-2"
                          >
                            <Form.Label className="text-md text-md cursor-default text-xs">
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
                            />
                          </Form.Field>

                          <Form.Field
                            name="confirmPassword"
                            className="flex flex-col gap-2"
                          >
                            <Form.Label className="text-md text-md cursor-default text-xs">
                              Confirm password
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
                            />
                          </Form.Field>
                        </div>
                      </Form.Root>
                    </div>
                    <button
                      className="hover:bg-mainbuttons bg-darkblue p-3 text-xs text-white outline outline-1 hover:text-lightblue"
                      onClick={() => handleSignUp()}
                    >
                      Sign Up
                    </button>
                    <div className="flex justify-center gap-1 text-xs">
                      <p>Already have an account? </p>
                      <span
                        className="cursor-pointer text-darkblue underline"
                        onClick={() => handleGoToLogin()}
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
}

{
  /* 
                        <label className="text-md text-md cursor-default text-xs">
                          username
                        </label>
                        <input
                          className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                          type="username"
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
                      <div className="flex flex-col">
                        <label className="text-md cursor-default text-xs font-thin">
                          confirm password
                        </label>
                        <input
                          className="border-b-[0.05px] border-b-black bg-transparent text-sm font-thin focus:outline-none"
                          type="password"
                        /> */
}
