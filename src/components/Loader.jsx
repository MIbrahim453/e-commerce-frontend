import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Loader({
  fullscreen = false,
  text = "Loading...",
  subtext,
  size = "default",
  className = "",
}) {
  const iconSize = size === "small" ? 22 : size === "large" ? 42 : 32;

  const antIcon = (
    <LoadingOutlined style={{ fontSize: iconSize, color: "#5433eb" }} spin />
  );

  const loaderContent = (
    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
      <div className="relative flex items-center justify-center mb-4">
        <div className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 animate-ping opacity-60" />
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-surface border border-border shadow-violet-glow flex items-center justify-center">
          <Spin indicator={antIcon} size={size} />
        </div>
      </div>

      {text && (
        <h4 className="text-sm sm:text-base font-extrabold text-text-primary tracking-tight m-0 mb-1">
          {text}
        </h4>
      )}

      {subtext && (
        <p className="text-xs text-text-secondary font-medium max-w-xs m-0 leading-relaxed">
          {subtext}
        </p>
      )}

      <div className="w-24 h-1 bg-border rounded-full overflow-hidden mt-3.5">
        <div className="w-full h-full bg-primary rounded-full animate-pulse" />
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div
        className="fixed inset-0 z-[9999] bg-white/70 backdrop-blur-md flex items-center justify-center p-4 transition-all"
        style={{ pointerEvents: "auto" }}
      >
        <div className="bg-surface/95 border border-border rounded-card shadow-violet-glow p-2 max-w-sm w-full mx-auto backdrop-blur-sm">
          {loaderContent}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-[220px] flex items-center justify-center rounded-card bg-surface/50 border border-dashed border-border/70 ${className}`}
    >
      {loaderContent}
    </div>
  );
}
