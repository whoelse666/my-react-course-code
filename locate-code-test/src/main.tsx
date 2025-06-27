import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// @ts-ignore
import { ClickToComponent } from "click-to-react-component";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* editor="windsurf" 修改IDE 工具 */}
    <ClickToComponent editor="windsurf" />
    <App />
  </>
);
