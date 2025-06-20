import { CSSProperties, FC, forwardRef, ReactNode, useMemo, PropsWithChildren, RefObject, createContext, useRef } from "react";
import "./index.scss";
import { useUtils } from "./useUtils";
import { createPortal } from "react-dom";
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

export const MessageProvider = forwardRef<MessageRef, {}>((props, ref) => {
  console.log("MessageProvider-props :>> ", props);
  console.log("MessageProvider-ref :>> ", ref);

  const { add, remove, update, clearAll } = useUtils();

  if ("current" in ref!) {
    ref.current = {
      add,
      remove,
      update,
      clearAll
    };
  }
  const messageWrapper = (
    <div className="message-wrapper">
      messageWrapper
      {/* {positions &&
        positions.map(direction => {
          return (
            <div key={direction} className={`message-wrapper-${direction}`}>
              {messageList[direction].map(item => {
                return <MessageComponent key={item.id} {...item} onClose={() => remove(item.id!)} />;
              })}
            </div>
          );
        })} */}
    </div>
  );
  const el = useMemo(() => {
    const el = document.createElement("div");
    el.className = `wrapper`;
    document.body.appendChild(el);
    return el;
  }, []);

  return createPortal(messageWrapper, el);
});
