"use client";
import { registerWithEmailAndPassword } from "@/actions/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import supabaseBrowser from "../../../lib/supabase/browser";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function LoginPage() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    try {
      const response = await registerWithEmailAndPassword(values);
      const { error, data } = response;
      if (error) {
        setError(error.message);
        return;
      }
      console.log("User registered:", data);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleLoginWithOauth() {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email:</label>
      <input id="email" {...register("email")} type="email" required />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password:</label>
      <input id="password" {...register("password")} type="password" required />
      {errors.password && <p>{errors.password.message}</p>}

      {error && <p>{error}</p>}

      <button type="submit">Sign up</button>
      <button type="button" onClick={handleSubmit(handleLoginWithOauth)}>
        Log in
      </button>
    </form>
  );
}
