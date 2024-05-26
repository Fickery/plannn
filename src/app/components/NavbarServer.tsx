import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface NavbarServerProps {
  children: (user: any) => React.ReactNode;
}

export default async function NavbarServer({ children }: NavbarServerProps) {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <>{children(user)}</>;
}
