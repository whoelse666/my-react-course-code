import { CSSProperties, FC, forwardRef, ReactNode, useMemo } from "react";
import useStore from "./useStore";
import { useTimer } from "./useTimer";
import { createPortal } from "react-dom";
import "./index.scss";
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
  const { messageList, add, update, remove, clearAll } = useStore("top");

  if ("current" in ref!) {
    ref.current = {
      add,
      update,
      remove,
      clearAll
    };
  }

  //   获取消息列表  位置数组
  const positions = Object.keys(messageList) as Position[];

  const messageWrapper = (
    <div className="message-wrapper">
      {positions &&
        positions.map(direction => {
          return (
            <div key={direction} className={`message-wrapper-${direction}`}>
              {messageList[direction].map(item => {
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
 
 return createPortal(messageWrapper, el);
});
