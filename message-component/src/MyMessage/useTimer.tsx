import { useEffect, useRef } from "react";

export interface UseTimerProps {
  id: number;
  duration?: number;
  remove: (id: number) => void;
}

export function useTimer(props: UseTimerProps) {
  const { remove, id, duration = 2000 } = props;
  const timer = useRef<number | null>(null);

  const onMouseEnter = () => {
    console.log("onMouseEnter :>> ");
    if (timer.current) {
      clearTimeout(timer.current);
    }
  };

  const onMouseLeave = () => {
    console.log("onMouseLeave :>> ");
    timer.current = window.setTimeout(() => {
      remove(id);
    }, duration);
  };
  useEffect(() => {
    onMouseLeave();
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);
  return {
    onMouseEnter,
    onMouseLeave
  };
}
