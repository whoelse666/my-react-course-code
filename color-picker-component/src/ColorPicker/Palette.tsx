import React, { useRef, type FC } from "react";
import type { Color } from "./color";
import Handler from "./Handler";
import "./index.scss";
import Transform from "./Transform";
import useColorDrag from "./useColorDrag";
import { calculateColor, calculateOffset } from "./utils";

const Palette: FC<{
  color: Color;
  onChange?: (color: Color) => void;
}> = ({ color, onChange }) => {
  const transformRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [offsetValue, dragStartHandle, onClickChangeColor] = useColorDrag({
    offset: { x: 0, y: 0 },
    color,
    containerRef: containerRef,
    targetRef: transformRef,
    direction: "x",
    onDragChange: offsetValue => {
      const newColor = calculateColor({
        offset: offsetValue,
        containerRef,
        targetRef: transformRef,
        color
      });
      console.log("newColor :>> ", newColor);
      onChange?.(newColor);
    },
    calculate: () => {
      return calculateOffset(containerRef, transformRef, color);
    }
  });

  return (
    <div ref={containerRef} onClick={onClickChangeColor} onMouseDown={dragStartHandle} className="color-picker-panel-palette">
      <Transform ref={transformRef} offset={offsetValue}>
        <Handler color={color.toRgbString()} />
      </Transform>
      <div
        className={`color-picker-panel-palette-main`}
        style={{
          backgroundColor: `hsl(${color.toHsl().h},100%, 50%)`,
          backgroundImage: "linear-gradient(0deg, #000, transparent),linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0))"
        }}
      ></div>
    </div>
  );
};

export default Palette;
