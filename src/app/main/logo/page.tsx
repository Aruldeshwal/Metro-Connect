"use client"
import React from 'react'
import { motion, easeInOut } from "framer-motion";
import { useState } from "react";
import SplitText from '@/blocks/TextAnimations/SplitText/SplitText';
import LineALinkLogo from "../../../../public/images/logo/Line-A-Link App Icon.png";

const logoVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: [1, 1.2, 1, 1.2, 1],
    rotate: [0, 15, -15, 10, -5, 0],
    transition: {
      duration: 0.8,
      ease: easeInOut,
      times: [0, 0.2, 0.5, 0.7, 1],
    }
  }
};

const Logo = () => {
  const [hoverKey, setHoverKey] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
          className="absolute top-4 left-4 z-20 flex items-center cursor-pointer"
          initial="initial"
          whileHover="hover"
          onHoverStart={() => {
            setHoverKey(prev => prev + 1);
            setIsHovered(true);
          }}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.img
            src={LineALinkLogo.src}
            alt="Line-A-Link App Logo"
            className="p-3 w-20 h-auto rounded-full"
            variants={logoVariants}
          />

          <div className="ml-4">
            {isHovered && (
              <motion.div
                key={hoverKey}
              >
                <SplitText
                  text="Line-A-Link"
                  className="text-white font-inter text-lg font-semibold"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
  )
}

export default Logo