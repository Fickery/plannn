import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import icon1 from "../../../public/icons/buildings.svg";

function IconDropDown() {
  const iconClass = "min-w-8 p-1 shadow-boxshadow hover:shadow-boxshadow1";
  const [isActive, setIsActive] = useState(false);
  const menu = useRef(null);

  const toggleOpen = () => {
    setIsActive(!isActive);
  };

  const closeOpenMenus = (e: MouseEvent) => {
    if (isActive && !menu.current?.contains(e.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeOpenMenus);

    return () => {
      document.removeEventListener("click", closeOpenMenus);
    };
  }, [isActive]);

  return (
    <div className="relative items-center bg-white">
      <div ref={menu} className="flex h-auto w-full rounded text-white">
        <button onClick={toggleOpen}>
          <p
            className={`w-full p-2 pt-3 text-gray-400 ${
              isActive ? "shadow-boxshadow1" : ""
            } shadow-boxshadow hover:shadow-boxshadow1`}
          >
            icon
          </p>
        </button>

        {isActive && (
          <div
            key="copy"
            className="absolute right-[-5rem] top-12 flex w-48 flex-wrap justify-center gap-3 bg-white p-2 shadow-boxshadow1"
          >
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
            <Image src={icon1} alt="icon" className={iconClass} />
          </div>
        )}
      </div>
    </div>
  );
}

export default IconDropDown;
