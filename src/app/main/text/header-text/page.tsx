"use client";
import RotatingText from "@/blocks/TextAnimations/RotatingText/RotatingText";
import React from "react";

const HeaderText = () => {
  return (
    <div className="z-20 flex w-full flex-col items-center gap-5 md:items-start">
      <div className="inline-flex items-center gap-3 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
        <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
        Line-A-Link
      </div>
      <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
        <span className="block bg-gradient-to-r from-sky-200 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Connect your commute.
        </span>
        <span className="mt-3 flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <span className="text-slate-100">Share the</span>
          <span className="inline-flex min-w-36 overflow-hidden rounded-lg border border-cyan-200/30 bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 px-4 py-2 text-[#071016] shadow-lg shadow-cyan-500/20">
            <RotatingText
              texts={["Ride", "Route", "Moment"]}
              mainClassName="text-4xl sm:text-5xl leading-none flex items-center"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-150%" }}
              staggerDuration={0.025}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />
          </span>
        </span>
      </h1>
    </div>
  );
};

export default HeaderText;
