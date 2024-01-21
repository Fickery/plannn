function Menu({ onMenuClick }: { onMenuClick: () => void }) {
  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    onMenuClick();
    e.currentTarget.classList.toggle("opened");
  };

  return (
    <div className="menu-icon" onClick={handleMenuClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="darkblue"
      >
        <path
          className="top-bar"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16"
        />
        <path
          className="middle-bar"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 12h16"
        />
        <path
          className="bottom-bar"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 18h16"
        />
      </svg>
    </div>
  );
}

export default Menu;
