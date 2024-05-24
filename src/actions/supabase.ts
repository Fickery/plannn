"use server";

import { createClient } from "@/utils/supabase/supabaseServer";

export async function registerWithEmailAndPassword({
  email,
}: {
  email: string;
}) {
  const supabase = await createClient();
  const response = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000",
    },
  });
  return JSON.stringify(response);
}
