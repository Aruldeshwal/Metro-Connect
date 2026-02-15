// GradientText.tsx
import React, { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8, // seconds

}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    backgroundSize: "200% 100%",
    animation: `gradientSlide ${animationSpeed}s ease infinite`,
  };

  return (
    <div
      className={`relative mx-auto flex max-w-fit items-center justify-center font-medium transition-shadow duration-500 ${className}`}
    >
      <div
        className="relative z-20 text-transparent bg-clip-text py-2"
        style={{
          ...gradientStyle,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {children}
      </div>
    </div>
  );
}
