import React from "react";
import classNames from "classnames";

export default function Handler({ color = "pink", size = "default" }) {
  return (
    <div
      className={classNames(`color-picker-panel-palette-handler`, {
        [`color-picker-panel-palette-handler-sm`]: size === "small"
      })}
      style={{
        backgroundColor: color
      }}
    ></div>
  );
}
