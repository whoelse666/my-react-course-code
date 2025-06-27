import React from "react";
import type { Color } from "./color";
import Handler from "./Handler";
import "./index.scss";
export default function Palette({ color, onChange }: { color: Color; onChange?: (value: Color) => void }) {
  return (
    <div className="color-picker-panel-palette">
      <div
        className={`color-picker-panel-palette-main`}
        style={{
          backgroundColor: `hsl(${color.toHsl().h},100%, 50%)`,
          backgroundImage: "linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"
        }}
      >
        <Handler color={color.toRgbString()} />
      </div>
    </div>
  );
}
