import { useState } from "react";
import { ConfigProvider } from "./MyMessage/ConfigProvider";
import { useMessage } from "./MyMessage/useMessage";

function Aaa() {
  const message = useMessage();
  return (
    <button
      onClick={() => {
        message.add({
          id: 99,
          content: "请求成功",
          position: "bottom"
        });
      }}
    >
      成功
    </button>
  );
}
function App() {
  const [count, setCount] = useState(0);
  return (
    <ConfigProvider>
      <div>
        <p> App Component {count}</p>
        <Aaa />
      </div>
    </ConfigProvider>
  );
}

export default App;
