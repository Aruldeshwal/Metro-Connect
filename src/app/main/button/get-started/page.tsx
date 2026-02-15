"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function GetStartedButton() {
  const router = useRouter(); // It's conventional to use 'router' (lowercase)

  return (
    <div className="flex items-center justify-center gap-12 mt-10">
      {/* Primary Button: Get Started */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-20 px-6 py-3 rounded-full font-semibold text-lg 
                   bg-gradient-to-r from-purple-500 via-cyan-400 to-blue-500
                   text-[#0d0d0d] shadow-lg shadow-purple-500/30 
                   hover:shadow-cyan-400/40 transition-all duration-300"
        onClick={() => { router.push("/signup"); }} // Corrected path to be absolute
      >
        Get Started
      </motion.button>

      {/* Secondary Button: Learn More (Restyled for black background with purple accent) */}
      <motion.a
        href="#how-it-works"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-20 px-6 py-3 rounded-full font-semibold text-lg 
                   bg-gray-800/50 border border-gray-700 
                   text-gray-300 shadow-lg shadow-black/20 
                   hover:text-white hover:border-purple-500 hover:bg-purple-600/20 
                   transition-all duration-300"
      >
        Learn More
      </motion.a>
    </div>
  );
}