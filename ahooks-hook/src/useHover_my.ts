import React, { useEffect, useState } from "react";
interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
  onChange?: (isHovering: boolean) => void;
}

export default function useHover(ref: React.RefObject<HTMLElement>, options?: Options): boolean {
  const { onEnter, onLeave, onChange } = options || {};
  const [isEnter, setIsEnter] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const handleEnter = () => {
      onEnter?.();
      setIsEnter(true);
      onChange?.(true);
    };
    const handleLeave = () => {
      onLeave?.();
      setIsEnter(false);
      onChange?.(isEnter);
    };
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  });

  return isEnter;
}
