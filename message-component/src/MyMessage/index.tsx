import { CSSProperties, FC, forwardRef, ReactNode, useMemo, PropsWithChildren, RefObject, createContext, useRef, useEffect } from "react";
import "./index.scss";
import useUtils from "./useUtils";
import { createPortal } from "react-dom";
import { useTimer } from './useTimer'
export type Position = "top" | "bottom";
export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactNode | string;
  duration?: number;
  onClose?: (...args: any) => void;
  id?: number;
  position?: Position;
}

export interface MessageRef {
  add: (messageProps: MessageProps) => number;
  remove: (id: number) => void;
  update: (id: number, messageProps: MessageProps) => void;
  clearAll: () => void;
}

const MessageComponent: FC<MessageProps> = item => {
  const { onMouseEnter, onMouseLeave } = useTimer({
    id: item.id!,
    duration: item.duration,
    remove: item.onClose!
  });

  return (
    <div className="message-item" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {item.content}
    </div>
  );
};

export const MessageProvider = forwardRef<MessageRef, {}>((props, ref) => {
  console.log("MessageProvider-props :>> ", props);
  console.log("MessageProvider-ref :>> ", ref);
  const { messageObj, add, remove, update, clearAll } = useUtils("top");
  if ("current" in ref!) {
    ref.current = {
      add,
      remove,
      update,
      clearAll
    };
  }
  //   获取消息列表  位置数组
  const positions = Object.keys(messageObj) as Position[];

  const messageWrapper = (
    <div className="message-wrapper">
      {positions &&
        positions.map(direction => {
          return (
            <div key={direction} className={`message-wrapper-${direction}`}>
              {messageObj[direction].map(item => {
                // return <p key={item.id}>{item.content}</p>;
                return <MessageComponent key={item.id} {...item} onClose={() => remove(item.id!)} />;
              })}
            </div>
          );
        })}
    </div>
  );
  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = `wrapper`;
    document.body.appendChild(el);
    return el;
  }, []);
  // 组件卸载时清理
  useEffect(() => {
    return () => {
      if (el && el.parentNode) {
        document.body.removeChild(el);
      }
    };
  }, [el]);
  return createPortal(messageWrapper, el);
});
