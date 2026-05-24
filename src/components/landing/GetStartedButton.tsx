"use client";

import { motion } from "framer-motion";
import { ArrowRight, CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GetStartedButton() {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center gap-4 sm:flex-row md:justify-start">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-20 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-cyan-300 px-6 py-3 text-base font-bold text-[#071016] shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:bg-cyan-200 hover:shadow-cyan-400/40"
        onClick={() => {
          router.push("/signup");
        }}
      >
        Get Started
        <ArrowRight className="h-5 w-5" />
      </motion.button>

      <motion.a
        href="#about"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative z-20 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/70 px-6 py-3 text-base font-semibold text-slate-200 shadow-lg shadow-black/20 transition-all duration-300 hover:border-amber-300/60 hover:bg-amber-300/10 hover:text-white"
      >
        <CircleHelp className="h-5 w-5" />
        Learn More
      </motion.a>
    </div>
  );
}
