import { useTrail, useChain, useSprings, animated, useSpringRef } from "@react-spring/web";
import "./styles.css";
import { useEffect } from "react";

const STROKE_WIDTH = 0.5;

const MAX_WIDTH = 150;
const MAX_HEIGHT = 100;

export default function App() {
  const gridApi = useSpringRef();

  const gridSprings = useTrail(16, {
    ref: gridApi,
    from: {
      x2: 0,
      y2: 0
    },
    to: {
      x2: MAX_WIDTH,
      y2: MAX_HEIGHT
    }
  });

  useEffect(() => {
    gridApi.start();
  });

  return (
    <div className="container">
      <svg viewBox={`0 0 ${MAX_WIDTH} ${MAX_HEIGHT}`}>
        <g>
          {gridSprings.map(({ x2 }, index: number) => {
            return <animated.line x1={0} y1={index * 10} x2={x2} y2={index * 10} key={index} strokeWidth={STROKE_WIDTH} stroke="currentColor" />;
          })}
          {gridSprings.map(({ y2 }, index: number) => (
            <animated.line x1={index * 10} y1={0} x2={index * 10} y2={y2} key={index} strokeWidth={STROKE_WIDTH} stroke="currentColor" />
          ))}
        </g>
      </svg>
    </div>
  );
}
