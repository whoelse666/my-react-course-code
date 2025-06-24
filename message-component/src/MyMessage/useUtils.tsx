import { useState } from "react";
import { MessageProps, Position } from ".";

export type MessageObj = {
  top: MessageProps[];
  bottom: MessageProps[];
};

let count = 0;
export function getId(messageProps: MessageProps) {
  if (messageProps.id) {
    return messageProps.id;
  }
  count += 1;
  return count;
}

export function getMessagePosition(target: MessageObj, id: number) {
  for (const [position, list] of Object.entries(target)) {
    if (list.find(item => item.id === id)) {
      return position as Position;
    }
  }
}

export function findMessage(target: MessageObj, id: number) {
  const position = getMessagePosition(target, id);

  const index = position ? target[position].findIndex(message => message.id === id) : -1;

  return {
    position,
    index
  };
}

const initialState = {
  top: [],
  bottom: []
};

export default function useUtils(defaultPosition: Position) {
  const [messageObj, setMessageList] = useState<MessageObj>({
    ...initialState
  });
  const add = (messageProps: MessageProps) => {
    const id = getId(messageProps);

    setMessageList(preState => {
      console.log("preState :>> ", preState);
      let position = null;
      if (messageProps?.id) {
        /* 如果有id  并且   通过id 在 preState在 有message，就拦截 */
        position = getMessagePosition(preState, messageProps.id);
        if (position) return preState;
      }
      position = messageProps.position || defaultPosition;
      const isTop = position.includes("top");
      const messages = isTop ? [{ ...messageProps, id }, ...(preState[position] ?? [])] : [...(preState[position] ?? []), { ...messageProps, id }];
      console.log("nextState :>> ", {
        ...preState,
        [position]: messages
      });
      return {
        ...preState,
        [position]: messages
      };
    });
    return id;
  };

  const remove = (id: number) => {
    console.log("remove :>> ", remove);
    setMessageList(prevState => {
      const position = getMessagePosition(prevState, id);
      if (!position) return prevState;
      return {
        ...prevState,
        [position]: prevState[position].filter(notice => notice.id !== id)
      };
    });
  };
  const update = (id: number, options: any) => {
    console.log("update :>> ", update);
  };
  const clearAll = () => {
    console.log("clearAll :>> ", clearAll);
  };
  return {
    messageObj,
    add,
    remove,
    update,
    clearAll
  };
}
