"use client";
import GradientText from "@/blocks/TextAnimations/GradientText/GradientText";
import RotatingText from "@/blocks/TextAnimations/RotatingText/RotatingText";
import React from "react";

const HeaderText = () => {
  return (
    <div className="z-20 mt-20 flex items-center gap-2">
      <div className="pt-4 pl-4 pr-4 h-7xl">
        <GradientText
          colors={["#a855f7", "#22d3ee", "#60a5fa"]}
          animationSpeed={6}
          showBorder={false}
          className="text-6xl text-clip h-20"
        >
          Connect Your Commute.
        </GradientText>
      </div>

      <div
        className="bg-gradient-to-r from-[#a855f7] via-[#22d3ee] to-[#60a5fa]  
                   text-[#0d0d0d] rounded-lg pt-4 pl-4 pr-4 overflow-hidden"
      >
        <RotatingText
          texts={["Ride", "Chat", "Grow"]}
          mainClassName="px-2 pb-2 text-4xl sm:text-5xl leading-none flex items-center"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-150%" }}
          staggerDuration={0.025}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={3000}
        />
      </div>
    </div>
  );
};

export default HeaderText;
