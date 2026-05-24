"use client";

import React from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { motion, Variants } from "framer-motion";
import {
  FiMapPin,
  FiMessageSquare,
  FiUser,
  FiUsers,
  FiTrendingUp,
  FiHeart,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

const matches = [
  {
    name: "Sophia Carter",
    station: "HUDA City Centre",
    compatibility: "92%",
    avatar:
      "https://placehold.co/100x100/7c3aed/ffffff?text=SC",
  },
  {
    name: "Emma Wilson",
    station: "Saket",
    compatibility: "88%",
    avatar:
      "https://placehold.co/100x100/2563eb/ffffff?text=EW",
  },
];

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#6d28d933,transparent_25%),radial-gradient(circle_at_bottom_left,#2563eb22,transparent_30%)]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grid grid-cols-1 lg:grid-cols-[320px_1fr_360px] gap-6 p-6 max-w-400 mx-auto"
      >
        {/* PROFILE SECTION */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 h-fit sticky top-6"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">Profile</h2>
              <p className="text-zinc-400 text-sm">
                Your commuter identity
              </p>
            </div>
            <UserButton />
          </div>

          <div className="mt-8 text-center">
            <Image
              src={
                user?.imageUrl ||
                "https://placehold.co/120x120/7c3aed/ffffff?text=U"
              }
              alt="profile"
              width={120}
              height={120}
              className="rounded-full mx-auto border-4 border-violet-500/40"
            />

            <h3 className="mt-5 text-2xl font-semibold">
              {user?.fullName}
            </h3>

            <p className="text-zinc-400 mt-1">
              Metro Connect User
            </p>

            <div className="mt-6">
              <div className="flex justify-between text-sm text-zinc-400 mb-2">
                <span>Profile Strength</span>
                <span>82%</span>
              </div>

              <div className="w-full bg-zinc-800 rounded-full h-2">
                <div className="bg-linear-to-r from-violet-500 to-blue-500 h-2 rounded-full w-[82%]" />
              </div>
            </div>

            <Link href="/profile">
              <Button className="mt-6 w-full rounded-xl bg-violet-600 hover:bg-violet-700">
                Edit Profile
              </Button>
            </Link>
          </div>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
              <FiMapPin className="text-violet-400 text-xl" />
              <div>
                <p className="text-sm text-zinc-400">
                  Primary Route
                </p>
                <p className="font-medium">
                  Faridabad → Gurugram
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
              <FiUsers className="text-cyan-400 text-xl" />
              <div>
                <p className="text-sm text-zinc-400">
                  Connections
                </p>
                <p className="font-medium">24 Active Links</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DASHBOARD SECTION */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <p className="text-violet-400 font-medium">
                  Smart Dashboard
                </p>

                <h1 className="text-4xl font-bold mt-2">
                  Welcome back, {user?.firstName}
                </h1>

                <p className="text-zinc-400 mt-3 max-w-xl">
                  Your AI-powered commute companion is tracking
                  routes, matches and social activity in real time.
                </p>
              </div>

              <Button className="rounded-xl bg-linear-to-r from-violet-600 to-blue-600 hover:opacity-90">
                Explore Routes
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl bg-linear-to-br from-violet-600/20 to-violet-900/10 border border-violet-500/20 p-6">
              <FiMessageSquare className="text-3xl text-violet-400" />

              <h3 className="mt-5 text-3xl font-bold">18</h3>

              <p className="text-zinc-400 mt-1">
                Unread Messages
              </p>
            </div>

            <div className="rounded-3xl bg-linear-to-br from-cyan-600/20 to-cyan-900/10 border border-cyan-500/20 p-6">
              <FiTrendingUp className="text-3xl text-cyan-400" />

              <h3 className="mt-5 text-3xl font-bold">94%</h3>

              <p className="text-zinc-400 mt-1">
                Match Accuracy
              </p>
            </div>

            <div className="rounded-3xl bg-linear-to-br from-pink-600/20 to-pink-900/10 border border-pink-500/20 p-6">
              <FiHeart className="text-3xl text-pink-400" />

              <h3 className="mt-5 text-3xl font-bold">7</h3>

              <p className="text-zinc-400 mt-1">
                New Interests
              </p>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">
                  Activity Feed
                </h2>

                <p className="text-zinc-400 mt-1">
                  Your latest commuter interactions
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {[
                "Matched with 3 new commuters nearby",
                "AI suggested a better metro timing",
                "You received 5 new messages",
                "A commuter viewed your profile",
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-5 rounded-2xl bg-black/30 border border-white/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <FiUser className="text-violet-400" />
                    </div>

                    <p className="text-zinc-300">
                      {activity}
                    </p>
                  </div>

                  <span className="text-sm text-zinc-500">
                    Just now
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FIND MATCH SECTION */}
        <motion.div
          variants={itemVariants}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 h-fit sticky top-6"
        >
          <div>
            <h2 className="text-2xl font-bold">
              Find Match
            </h2>

            <p className="text-zinc-400 mt-1">
              AI-based route compatibility
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {matches.map((match, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-black/30 p-5"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={match.avatar}
                    alt={match.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {match.name}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      {match.station}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-violet-400 font-bold">
                      {match.compatibility}
                    </p>

                    <p className="text-xs text-zinc-500">
                      Match
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <Button className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700">
                    Connect
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-xl border-white/10 bg-transparent hover:bg-white/10"
                  >
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-8 rounded-2xl bg-linear-to-r from-violet-600 to-blue-600 hover:opacity-90 h-12">
            Discover More Matches
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}