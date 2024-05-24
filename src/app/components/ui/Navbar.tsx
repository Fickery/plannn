"use client";
import store from "@/redux/store/store";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Provider } from "react-redux";
import supabaseBrowser from "../../../../lib/supabase/browser";
import AddSession from "./AddSession";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const dropDownOption = [{ label: "Sign Out", action: handleSignOut }];

  return (
    <>
      <Provider store={store}>
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
              <p className="w-full cursor-pointer p-3 hover:underline">keith</p>

              {isOpen ? (
                <div className="absolute top-full z-10 mt-1 flex items-center justify-center border border-gray-300 bg-white p-2 text-[0.7rem]">
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
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Provider>
    </>
  );
}

export default Navbar;

// "use client";
// import useUser from "@/app/auth/hook/useUser";
// import store from "@/redux/store/store";
// import { createClient } from "@/utils/supabase/supabaseServer";
// import { useQueryClient } from "@tanstack/react-query";
// import Image from "next/image";
// import { usePathname, useRouter } from "next/navigation";
// import { useState } from "react";
// import { Provider } from "react-redux";
// import supabaseBrowser from "../../../../lib/supabase/browser";
// import AddSession from "./AddSession";

// async function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const queryClient = useQueryClient();
//   const router = useRouter();
//   const pathname = usePathname();

//   const { isFetching, data } = useUser();

//   const handleSignOut = async () => {
//     const supabase = supabaseBrowser();
//     queryClient.clear();
//     await supabase.auth.signOut();
//     router.push("/login");
//   };

//   const dropDownOption = [{ label: "Sign Out", action: handleSignOut }];

//   if (isFetching) {
//     return <></>;
//   }

//   if (!data?.id && pathname === "/") {
//     router.push("/login");
//     return null;
//   }

//   return (
//     <>
//       <Provider store={store}>
//         {data?.id ? (
//           <div className="relative flex h-[5vh] w-full justify-between p-2 text-darkblue">
//             <Image
//               src="/PlannnLogo.svg"
//               alt="Plannn Logo"
//               width="0"
//               height="0"
//               className="h-auto w-fit cursor-pointer"
//               priority
//               onClick={() => router.push("/")}
//             />
//             <AddSession />
//             <div
//               className="relative flex items-center justify-center gap-2"
//               onClick={() => setIsOpen(!isOpen)}
//             >
//               {data?.id ? (
//                 <p className="w-full cursor-pointer p-3 hover:underline">
//                   {data?.name}
//                 </p>
//               ) : (
//                 <p onClick={() => router.push("/auth")}>log in</p>
//               )}
//               {isOpen ? (
//                 <div className="absolute top-full z-10 mt-1 flex items-center justify-center border border-gray-300 bg-white p-2 text-[0.7rem]">
//                   {dropDownOption.map((option, index) => (
//                     <div
//                       key={index}
//                       className="cursor-pointer hover:text-midblue"
//                       onClick={() => {
//                         option.action();
//                         setIsOpen(false);
//                       }}
//                     >
//                       {option.label}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <></>
//               )}
//             </div>
//           </div>
//         ) : (
//           <></>
//         )}
//       </Provider>
//     </>
//   );
// }

// export default Navbar;
