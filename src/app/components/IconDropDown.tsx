import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import buildingIco from "../../../public/icons/buildings.svg";
import cableCar from "../../../public/icons/cableCar.svg";
import noIcon from "../../../public/icons/noIcon.svg";
import addIcon from "../../../public/icons/addIcon.svg";
import car from "../../../public/icons/car.svg";
import card from "../../../public/icons/card.svg";
import cycle from "../../../public/icons/cycle.svg";
import flight from "../../../public/icons/flight.svg";
import train from "../../../public/icons/train.svg";
import drink from "../../../public/icons/drink.svg";
import food from "../../../public/icons/food.svg";
import passport from "../../../public/icons/passport.svg";
import luggage from "../../../public/icons/luggage.svg";
import location from "../../../public/icons/location.svg";
import ship from "../../../public/icons/ship.svg";
import mountain from "../../../public/icons/mountain.svg";

function IconDropDown() {
  const iconClass = "min-w-8 h-fit p-1 hover:opacity-70 cursor-pointer";

  const [isActive, setIsActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const menu = useRef(null);

  const toggleOpen = () => {
    setIsActive(!isActive);
  };

  const closeOpenMenus = (e) => {
    if (isActive && !menu.current?.contains(e.target)) {
      setIsActive(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsActive(false);
  };

  const handleIfNoIcon = () => {
    setSelectedImage(null);
    setIsActive(false);
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
          <p className={`${selectedImage ? "shadow-none" : ""} ${iconClass}`}>
            {selectedImage ? (
              <Image src={selectedImage} alt="icon" className={iconClass} />
            ) : (
              <Image
                src={addIcon}
                alt="icon"
                className={`{iconClass} ${isActive ? "opacity-35" : ""}`}
              />
            )}
          </p>
        </button>

        {isActive && (
          <div
            key="copy"
            className="absolute right-[-5rem] top-16 flex w-48 flex-wrap justify-center gap-3 bg-white p-2 shadow-boxshadow"
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
    </div>
  );
}

export default IconDropDown;
