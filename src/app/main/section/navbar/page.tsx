"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Logo from "../../logo/page";
import ButtonSignupLogin from "../../button/signup-login/page";
import NavLinks from "../../button/nav-links/page";

const Navbar = () => {
  const [isSolid, setIsSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Become solid after scrolling 50px (you can tweak this)
      if (window.scrollY > 50) {
        setIsSolid(true);
      } else {
        setIsSolid(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
  className="fixed top-0 z-20 w-screen h-fit flex justify-between items-center px-8 py-3"
  animate={{
    backgroundColor: isSolid ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.0)",
    backdropFilter: isSolid ? "blur(12px)" : "blur(0px)",
    boxShadow: isSolid
      ? "0 2px 10px rgba(0,0,0,0.4)"
      : "0 0 0 rgba(0,0,0,0)",
  }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  <Logo />
  
  <div className="flex-1 flex justify-center">
    <NavLinks />
  </div>
  
  <ButtonSignupLogin />
</motion.div>

  );
};

export default Navbar;
