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
import { useRecommendations } from "@/hooks/useRecommendations";
import { toast, Toaster } from "sonner";

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

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const { recommendations, hasActiveRoutes, isLoading: recommendationsLoading, connect } = useRecommendations(user?.id);

  const handleConnect = async (rec: any) => {
    try {
      await connect(rec.user.id, rec.myRouteId, rec.route.id, rec.matchScore);
      toast.success(`Connection request sent to ${rec.user.name}!`);
    } catch (err) {
      toast.error("Failed to send connection request");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <Toaster position="top-center" richColors />
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

          <div className="mt-8 space-y-5 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {recommendationsLoading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-32 w-full animate-pulse bg-white/5 rounded-2xl border border-white/10" />
                ))}
              </div>
            )}
            
            {!recommendationsLoading && !hasActiveRoutes && (
              <div className="text-center py-10 px-4">
                <div className="bg-violet-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-violet-500/20">
                  <FiMapPin className="text-2xl text-violet-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Routes Set</h3>
                <p className="text-zinc-500 text-sm mb-6">
                  Set your daily commute route to start seeing compatible commuters.
                </p>
                <Link href="/set-route">
                  <Button className="w-full rounded-xl bg-violet-600 hover:bg-violet-700">
                    Set My Daily Route
                  </Button>
                </Link>
              </div>
            )}

            {!recommendationsLoading && hasActiveRoutes && recommendations.length === 0 && (
              <div className="text-center py-10 px-4">
                <div className="bg-emerald-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <FiUsers className="text-2xl text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Searching for Matches</h3>
                <p className="text-zinc-500 text-sm mb-2">
                  We've saved your route! 
                </p>
                <p className="text-zinc-500 text-xs">
                  We'll notify you as soon as someone with a similar path joins.
                </p>
              </div>
            )}

            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-black/30 p-5 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Image
                      src={rec.user.profile_picture_url || `https://placehold.co/100x100/7c3aed/ffffff?text=${rec.user.name.charAt(0)}`}
                      alt={rec.user.name}
                      width={64}
                      height={64}
                      className="rounded-full border-2 border-transparent group-hover:border-violet-500/50 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-black" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">
                      {rec.user.name}
                    </h3>

                    <p className="text-sm text-zinc-400 truncate max-w-[120px]">
                      {rec.route.startStation.name}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="relative inline-flex items-center justify-center">
                      <svg className="w-12 h-12 transform -rotate-90">
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="transparent"
                          className="text-white/10"
                        />
                        <circle
                          cx="24"
                          cy="24"
                          r="20"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="transparent"
                          strokeDasharray={125.6}
                          strokeDashoffset={125.6 - (125.6 * rec.matchScore) / 100}
                          className="text-violet-500 transition-all duration-1000"
                        />
                      </svg>
                      <span className="absolute text-[10px] font-bold">
                        {Math.round(rec.matchScore)}%
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">Overlap</p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    onClick={() => handleConnect(rec)}
                    className="flex-1 rounded-xl bg-violet-600 hover:bg-violet-700 h-9 text-sm"
                  >
                    Connect
                  </Button>

                  <Link href={`/profile/${rec.user.id}`} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl border-white/10 bg-transparent hover:bg-white/10 h-9 text-sm"
                    >
                      Profile
                    </Button>
                  </Link>
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