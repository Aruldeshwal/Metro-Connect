"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function PurpleCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className="bg-[#111111] border border-purple-600/30 shadow-lg shadow-purple-900/40 rounded-2xl p-4 w-80 hover:shadow-purple-700/50 transition-all">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-purple-400">
            Metro Insights 🚇
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 text-sm leading-relaxed">
          Plan your route, connect with fellow commuters, and explore smarter 
          ways to travel. <span className="text-purple-400">Line-A-Link</span> 
          makes your metro ride social.
        </CardContent>
      </Card>
    </motion.div>
  );
}
