import { useRef } from 'react';
import useHover from './useHover_my';

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHover(ref);
  return <div style={{background: isHovering ? 'pink' : 'red',textAlign: 'center',cursor: 'pointer'}} ref={ref}>{isHovering ? 'hover' : 'leaveHover'}</div>;
};
