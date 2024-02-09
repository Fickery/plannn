import Image from "next/image";

function Navbar() {
  return (
    <div className="flex h-[5vh] w-full justify-between bg-white p-2 text-darkblue">
      <Image
        src="/PlannnLogo.svg"
        alt="Plannn Logo"
        width="0"
        height="0"
        className="h-auto w-fit"
        priority
      />
      <p>Singapore</p>
      <p>FICKERY</p>
    </div>
  );
}

export default Navbar;
