import { CSSProperties, FC, forwardRef, ReactNode, useMemo } from "react";
import useStore from "./useStore";
import { createPortal } from "react-dom";

export type Position = "top" | "bottom";

export interface MessageProps {
  style?: CSSProperties;
  className?: string | string[];
  content: ReactNode;
  duration?: number;
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
  const { messageList, add, update, remove, clearAll } = useStore("top");

  if ("current" in ref!) {
    ref.current = {
      add,
      update,
      remove,
      clearAll
    };
  }
  const positions = Object.keys(messageList) as Position[];
  const messageWrapper = (
    <div className="message-wrapper">
      {positions &&
        positions.map(direction => {
          return (
            <div className={`message-wrapper-${direction}`} key={direction}>
              {messageList[direction].map(item => {
                return (
                  <div key={item.id} className="message-item">
                    {item.content}
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
  return createPortal(messageWrapper, document.body);
});
