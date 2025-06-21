import { MessageProps, Position } from ".";

export type MessageList = {
  top: MessageProps[];
  bottom: MessageProps[];
};

export function useUtils() {
  const add = (messageProps: MessageProps): number => {
    console.log("add :>> ", add);
    const id = messageProps.id || 1;
    return id;
  };
  const remove = (id: number) => {
    console.log("remove :>> ", remove);
  };
  const update = (id: number, options: any) => {
    console.log("update :>> ", update);
  };
  const clearAll = () => {
    console.log("clearAll :>> ", clearAll);
  };
  return {
    add,
    remove,
    update,
    clearAll
  };
}
