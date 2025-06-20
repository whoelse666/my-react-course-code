import { PropsWithChildren, RefObject, createContext, useRef } from "react";
import { MessageProvider, MessageRef } from ".";

interface ConfigProviderProps {
  messageRef?: RefObject<MessageRef>;
  [key: string]: any;
}

export const ConfigContext = createContext<ConfigProviderProps>({});

export function ConfigProvider(props: PropsWithChildren &  Partial<{ count: number; setCount: (count: number) => void }>) {
  const { children, count, setCount } = props;
  const messageRef = useRef<MessageRef>(null);
  return (
    <ConfigContext.Provider value={{ messageRef, setCount, count }}>
      <MessageProvider ref={messageRef}></MessageProvider>
      {children}
    </ConfigContext.Provider>
  );
}
