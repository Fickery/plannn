import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import addIcon from "../../../../public/icons/addIcon.svg";
import buildingIco from "../../../../public/icons/buildings.svg";
import cableCar from "../../../../public/icons/cableCar.svg";
import car from "../../../../public/icons/car.svg";
import card from "../../../../public/icons/card.svg";
import cycle from "../../../../public/icons/cycle.svg";
import drink from "../../../../public/icons/drink.svg";
import flight from "../../../../public/icons/flight.svg";
import food from "../../../../public/icons/food.svg";
import location from "../../../../public/icons/location.svg";
import luggage from "../../../../public/icons/luggage.svg";
import mountain from "../../../../public/icons/mountain.svg";
import noIcon from "../../../../public/icons/noIcon.svg";
import passport from "../../../../public/icons/passport.svg";
import ship from "../../../../public/icons/ship.svg";
import train from "../../../../public/icons/train.svg";

function IconDropDown({
  subNote,
  selectedImage,
  setSelectedImage,
  handleIconChange,
}) {
  const iconClass = "h-fit p-1 md:p-[0.255rem] hover:opacity-70 cursor-pointer";
  const [isActive, setIsActive] = useState(false);
  const menu = useRef(null);

  useEffect(() => {
    const savedImage = JSON.parse(
      localStorage.getItem(`savedImage_${subNote.id}`) ||
        JSON.stringify(addIcon),
    );
    setSelectedImage(savedImage);
  }, [subNote.id, setSelectedImage]);

  const handleImageClick = (newSelectedImage) => {
    handleIconChange(newSelectedImage);
    localStorage.setItem(
      `savedImage_${subNote.id}`,
      JSON.stringify(newSelectedImage),
    );
  };

  const handleIfNoIcon = () => {
    setSelectedImage(null);
    setIsActive(false);
  };

  const toggleOpen = () => {
    setIsActive(!isActive);
  };

  const closeOpenMenus = (e) => {
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
    <div className="relative flex items-center">
      <div ref={menu} className="flex h-auto w-full rounded text-white">
        <button onClick={toggleOpen}>
          {selectedImage ? (
            <p className={`${selectedImage ? "shadow-none" : ""} ${iconClass}`}>
              <Image src={selectedImage} alt="icon" className={iconClass} />
            </p>
          ) : (
            <Image
              src={addIcon}
              alt="icon"
              className={`{iconClass} ${isActive ? "opacity-35" : ""}`}
            />
          )}
        </button>
      </div>

      {isActive && (
        <div
          key="copy"
          className="absolute right-[-5rem] top-16 z-50 flex w-48 flex-wrap justify-center gap-3 bg-white p-2 shadow-boxshadow"
        >
          <Image
            src={noIcon}
            alt="no icon"
            className={iconClass}
            onClick={() => handleIfNoIcon()}
          />
          <Image
            src={buildingIco}
            alt="building"
            className={iconClass}
            onClick={() => handleImageClick(buildingIco)}
          />
          <Image
            src={cableCar}
            alt="cable car"
            className={iconClass}
            onClick={() => handleImageClick(cableCar)}
          />
          <Image
            src={car}
            alt="car"
            className={iconClass}
            onClick={() => handleImageClick(car)}
          />
          <Image
            src={card}
            alt="card"
            className={iconClass}
            onClick={() => handleImageClick(card)}
          />
          <Image
            src={cycle}
            alt="cycle"
            className={iconClass}
            onClick={() => handleImageClick(cycle)}
          />
          <Image
            src={drink}
            alt="drink"
            className={iconClass}
            onClick={() => handleImageClick(drink)}
          />
          <Image
            src={flight}
            alt="flight"
            className={iconClass}
            onClick={() => handleImageClick(flight)}
          />
          <Image
            src={food}
            alt="food"
            className={iconClass}
            onClick={() => handleImageClick(food)}
          />
          <Image
            src={location}
            alt="location"
            className={iconClass}
            onClick={() => handleImageClick(location)}
          />
          <Image
            src={luggage}
            alt="luggage"
            className={iconClass}
            onClick={() => handleImageClick(luggage)}
          />
          <Image
            src={mountain}
            alt="mountain"
            className={iconClass}
            onClick={() => handleImageClick(mountain)}
          />
          <Image
            src={train}
            alt="train"
            className={iconClass}
            onClick={() => handleImageClick(train)}
          />

          <Image
            src={passport}
            alt="passport"
            className={iconClass}
            onClick={() => handleImageClick(passport)}
          />
          <Image
            src={ship}
            alt="ship"
            className={iconClass}
            onClick={() => handleImageClick(ship)}
          />
        </div>
      )}
    </div>
  );
}

export default IconDropDown;
