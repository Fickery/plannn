import { useState } from "react";

function useRandomPastelColor() {
  const [color, setColor] = useState("#000000");
  const generateColor = () => {
    setColor(Math.random().toString(16).slice(-6));
  };
  return { color, generateColor };
}

export default useRandomPastelColor;
