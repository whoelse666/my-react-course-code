import { PropsWithChildren, RefObject, createContext, useRef } from "react";
import { MessageProvider, MessageRef } from ".";

interface ConfigProviderProps {
  // messageRef?: RefObject<MessageRef>;
  [key: string]: any;
}

export const ConfigContext = createContext<ConfigProviderProps>({});

export function ConfigProvider(props: PropsWithChildren & Partial<ConfigProviderProps>) {
  const messageRef = useRef<MessageRef>(null);
  const { children } = props;
  return (
    // value={{ messageRef }} 传递  <MessageProvider ref={messageRef}></MessageProvider> 下级组件
    <ConfigContext.Provider value={{ messageRef }}>
      {/* ref={messageRef}  messageRef 赋值为 MessageProvider */}
      <MessageProvider ref={messageRef}></MessageProvider>
      {children}
    </ConfigContext.Provider>
  );
}
