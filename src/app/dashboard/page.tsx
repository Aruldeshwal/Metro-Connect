"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { motion, Variants } from "framer-motion";
import { FiMapPin, FiMessageSquare, FiUser, FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const hasActiveLink = true;

const activeLinkData = {
  with: "Jenna Carter",
  avatar: "https://placehold.co/100x100/9333ea/ffffff?text=JC",
  route: {
    from: "Sector 15, Faridabad",
    to: "Cyber Hub, Gurugram",
  },
  status: "In Progress",
};

const recentActivity = [
  { type: "message", content: "New message from David L.", time: "2h ago" },
  { type: "link", content: "Completed link with Sarah J.", time: "1d ago" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0d0d0d]">
        <p className="text-gray-400">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-4 sm:p-6 lg:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <motion.header
          variants={itemVariants}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              Welcome back, {user?.firstName || "Commuter"}!
            </h1>
            <p className="text-gray-400">
              {"Here's your snapshot for today."}
            </p>
          </div>
          <UserButton />
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-gray-900/50 p-6 rounded-2xl border border-white/10"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">
                Current Link
              </h2>
              {hasActiveLink ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <Image
                    src={activeLinkData.avatar}
                    alt={activeLinkData.with}
                    width={80}
                    height={80}
                    className="h-20 w-20 rounded-full border-2 border-purple-500"
                  />
                  <div className="flex-grow">
                    <p className="text-gray-400">
                      You are linked with:
                    </p>
                    <p className="text-xl font-bold text-white">
                      {activeLinkData.with}
                    </p>
                    <p className="text-gray-300 mt-2">
                      {activeLinkData.route.from} →{" "}
                      {activeLinkData.route.to}
                    </p>
                  </div>
                  <div className="text-center sm:text-right">
                    <p className="text-gray-400 text-sm">Status</p>
                    <span className="inline-block mt-1 px-3 py-1 text-sm font-semibold text-cyan-300 bg-cyan-800/50 rounded-full">
                      {activeLinkData.status}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <FiMapPin className="mx-auto h-12 w-12 text-gray-600" />
                  <p className="mt-4 text-lg text-gray-400">
                    You have no active links for today.
                  </p>
                  <Button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-bold">
                    <FiPlusCircle className="mr-2 h-5 w-5" />
                    Find a New Link
                  </Button>
                </div>
              )}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-900/50 p-6 rounded-2xl border border-white/10"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">
                Recent Activity
              </h2>
              <ul className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <div className="p-2 bg-gray-800/70 rounded-full">
                      {activity.type === "message" ? (
                        <FiMessageSquare className="h-5 w-5 text-purple-400" />
                      ) : (
                        <FiUser className="h-5 w-5 text-purple-400" />
                      )}
                    </div>
                    <p className="text-gray-300 flex-grow">
                      {activity.content}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {activity.time}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-gray-900/50 p-6 rounded-2xl border border-white/10 text-center"
            >
              <Image
                src={user?.imageUrl || "/fallback.png"}
                alt="Your avatar"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full mx-auto border-4 border-purple-500/50"
              />
              <h3 className="mt-4 text-xl font-bold text-white">
                {user?.fullName}
              </h3>
              <p className="text-gray-400">
                Profile Completion: 80%
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
              <Link href="/profile">
                <Button
                  variant="outline"
                  className="mt-4 w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                >
                  Edit Profile
                </Button>
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gray-900/50 p-6 rounded-2xl border border-white/10"
            >
              <h2 className="text-xl font-semibold mb-4 text-white">
                Quick Links
              </h2>
              <div className="space-y-3">
                <Link href="/messages">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <FiMessageSquare className="mr-3 h-5 w-5" />
                    Messages
                  </Button>
                </Link>
                <Link href="/routes">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <FiMapPin className="mr-3 h-5 w-5" />
                    My Routes
                  </Button>
                </Link>
                <Link href="/profile">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
                  >
                    <FiUser className="mr-3 h-5 w-5" />
                    My Profile
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
