"use client";
import store from "@/redux/store/store";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import supabaseBrowser from "../../../lib/supabase/browser";
import AddSession from "./ui/AddSession";
import useClickOutside from "@/hooks/useClickOutside";

const NavbarClient = ({ user }: { user: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    window.location.reload();
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  const dropDownOption = [{ label: "Sign Out", action: handleSignOut }];

  if (!user) {
    router.push("/login");
  }

  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <Provider store={store}>
      {user ? (
        <div className="relative flex h-[5vh] justify-between p-2 text-darkblue md:h-auto md:flex-col md:gap-5 md:p-5">
          <div className="flex w-2/5 justify-start md:w-full md:justify-center">
            <Image
              src="/PlannnLogo.svg"
              alt="Plannn Logo"
              width="0"
              height="0"
              className="flex h-auto w-fit cursor-pointer md:h-[2rem]"
              priority
              onClick={() => router.push("/")}
            />
          </div>
          <div className="flex w-3/5 items-center justify-between md:w-full">
            <div>
              <AddSession />
            </div>
            <div
              className="relative flex items-center justify-center gap-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {user.email ? (
                <>
                  <p className="w-full cursor-pointer p-2 hover:underline">
                    {user?.email || "..."}
                  </p>
                  {isOpen && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-2 top-full z-10 flex w-24 items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-[0.7rem]"
                    >
                      {dropDownOption.map((option, index) => (
                        <div
                          key={index}
                          className="cursor-pointer hover:text-midblue"
                          onClick={() => {
                            option.action();
                            setIsOpen(false);
                          }}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <p
                  onClick={handleLoginRedirect}
                  className="w-full cursor-pointer p-2 hover:underline"
                >
                  Sign In
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Provider>
  );
};

export default NavbarClient;
