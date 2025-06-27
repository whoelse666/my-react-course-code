import React, { ChangeEventHandler, useState } from "react";
import "./App.css";
import { Color } from "./ColorPicker/color";
import Palette from "./ColorPicker/Palette";

function App() {
  const [colorValue, setColorValue] = useState<Color>(new Color("rgb(166,57,255)"));

  const onPaletteColorChange = (newColor: Color) => {
    console.log(newColor);
    setColorValue(newColor);
  };
  return (
    <div style={{ width: "300px", marginLeft: "100px", position: "relative" }}>
      <Palette color={colorValue} onChange={onPaletteColorChange}></Palette>
    </div>
  );
}

export default App;
