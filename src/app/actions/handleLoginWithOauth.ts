"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const handleLoginWithOauth = async (origin: string) => {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });
    if (error) {
      throw error;
    } else {
      return redirect(data.url);
    }
  } catch (error) {
    console.error("OAuth sign-in error:", error);
    throw new Error("OAuth sign-in error");
  }
};
