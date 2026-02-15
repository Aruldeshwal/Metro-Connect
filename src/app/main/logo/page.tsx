"use client";
import React, { useState } from "react";
import { motion, easeInOut } from "framer-motion";
import SplitText from "@/blocks/TextAnimations/SplitText/SplitText";
import LineALinkLogo from "../../../../public/images/logo/Line-A-Link.png";
import Image from "next/image";

const MotionImage = motion(Image);

const logoVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: [1, 1.2, 1, 1.2, 1],
    rotate: [0, 15, -15, 10, -5, 0],
    transition: {
      duration: 0.8,
      ease: easeInOut,
      times: [0, 0.2, 0.5, 0.7, 1],
    },
  },
};

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="z-20 flex items-center cursor-pointer opacity-100"
      initial="initial"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <MotionImage
        src={LineALinkLogo}
        alt="Line-A-Link App Logo"
        className="p-3 w-20 h-auto rounded-full"
        variants={logoVariants}
        width={80}
        height={80}
      />

      {/* Reserve fixed width for text so layout doesn’t shift */}
      <div className="w-32 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SplitText
            text="Line-A-Link"
            className="text-white font-inter text-lg font-semibold whitespace-nowrap"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Logo;
