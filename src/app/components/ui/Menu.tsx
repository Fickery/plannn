import useClickOutside from "@/hooks/useClickOutside";

interface MenuProps {
  onMenuClick: () => void;
  showXIcon: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function Menu({ onMenuClick, showXIcon, setIsOpen }: MenuProps) {
  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onMenuClick();
  };

  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div
      ref={dropdownRef}
      className={`menu-icon ${showXIcon ? "opened" : ""}`}
      onClick={handleMenuClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="darkblue"
      >
        <path
          className="top-bar"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16"
        />
        <path
          className="middle-bar"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 12h16"
        />
        <path
          className="bottom-bar"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 18h16"
        />
      </svg>
    </div>
  );
}

export default Menu;
