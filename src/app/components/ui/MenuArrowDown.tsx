import React, { useState } from "react";
import "../../../../src/app/globals.css";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleArrowIconClick = () => {
    setIsOpen((prevOpen) => !prevOpen);
  };

  return (
    <div
      className={`arrow-icon ${isOpen ? "open" : ""}`}
      onClick={handleArrowIconClick}
    >
      <a className="arrow-link">
        <span className="left-bar"></span>
        <span className="right-bar"></span>
      </a>
    </div>
  );
}

export default Menu;
