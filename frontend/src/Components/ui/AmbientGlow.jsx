import React from "react";

const AmbientGlow = () => {
  return (
    <div
      id="ambient-glow"
      className="pointer-events-none absolute left-1/2 -top-48 z-0 h-200 w-200 -translate-x-1/2 bg-radial-[circle,var(--ambient-glow)_0%,var(--glow-transparent)_70%]"
    ></div>
  );
};

export default AmbientGlow;
