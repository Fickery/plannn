import Image from "next/image";

function Navbar() {
  return (
    <div className="flex h-[5vh] w-full justify-between bg-white p-2">
      <Image
        src="/PlannnLogo.svg"
        alt="Plannn Logo"
        width={100}
        height={24}
        priority
      />
      <p>Singapore</p>
      <p>FICKERY</p>
    </div>
  );
}

export default Navbar;
