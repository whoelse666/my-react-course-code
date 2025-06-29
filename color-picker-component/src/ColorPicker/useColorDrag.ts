import { useEffect, useRef, useState } from "react";
import { Color } from "./color";
import { TransformOffset } from "./Transform";

type EventType = MouseEvent | React.MouseEvent<Element, MouseEvent>;

type EventHandle = (e: EventType) => void;

interface useColorDragProps {
  offset?: TransformOffset;
  color?: Color;
  containerRef: React.RefObject<HTMLDivElement>;
  targetRef: React.RefObject<HTMLDivElement>;
  direction?: "x" | "y";
  onDragChange?: (offset: TransformOffset) => void;
  calculate?: () => TransformOffset;
}

function useColorDrag(props: useColorDragProps): [TransformOffset, EventHandle, EventHandle?] {
  const { offset, color, targetRef, containerRef, direction, onDragChange, calculate } = props;
  const [offsetValue, setOffsetValue] = useState(offset || { x: 0, y: 0 });
  const dragRef = useRef({ flag: false });
  useEffect(() => {
    if (dragRef.current.flag === false) {
      const calcOffset = calculate?.();
      
      calcOffset && setOffsetValue(calcOffset);
    }
  }, [color]);

  const updateOffset: EventHandle = e => {
    const scrollXOffset = document.documentElement.scrollLeft || document.body.scrollLeft;
    const scrollYOffset = document.documentElement.scrollTop || document.body.scrollTop;
    const pageX = e.pageX - scrollXOffset;
    const pageY = e.pageY - scrollYOffset;
    const { x: rectX, y: rectY, width, height } = containerRef.current!.getBoundingClientRect();

    const { width: targetWidth, height: targetHeight } = targetRef.current!.getBoundingClientRect();

    const centerOffsetX = targetWidth / 2;
    const centerOffsetY = targetHeight / 2;

    const offsetX = Math.max(0, Math.min(pageX - rectX, width)) - centerOffsetX;
    const offsetY = Math.max(0, Math.min(pageY - rectY, height)) - centerOffsetY;

    const calcOffset = {
      x: offsetX,
      y: offsetY
    };

    setOffsetValue(calcOffset);
    onDragChange?.(calcOffset);
  };

  const onClickChangeColor: EventHandle = e => {
    console.log("onClickChangeColor :>> ");
    updateOffset(e);
  };
  const onDragStart: EventHandle = e => {
    console.log("onDragStart :>> ");
    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragStop);
  };

  const onDragMove: EventHandle = e => {
    e.preventDefault();
    updateOffset(e);
  };

  const onDragStop: EventHandle = e => {
    e.preventDefault();
    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragStop);
  };

  return [offsetValue, onDragStart, onClickChangeColor];
}

export default useColorDrag;
