"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FiUser, 
  FiBriefcase, 
  FiHash, 
  FiLink, 
  FiChevronLeft, 
  FiMessageSquare,
  FiMapPin,
  FiHeart
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRecommendations } from "@/hooks/useRecommendations";
import { toast, Toaster } from "sonner";

interface UserProfile {
  id: string;
  name: string;
  profile_picture_url?: string;
  bio?: string;
  occupation?: string;
  interests?: string[];
  social_media_link?: string;
  gender?: string;
  birth_date?: string;
}

export default function ViewProfilePage() {
  const { userId } = useParams() as { userId: string };
  const { user: currentUser, isLoaded: isUserLoaded } = useUser();
  const { recommendations, connect } = useRecommendations(currentUser?.id);
  const router = useRouter();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const matchData = recommendations.find(r => r.user.id === userId);

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleConnect = async () => {
    if (!matchData) return;
    try {
      await connect(matchData.user.id, matchData.myRouteId, matchData.route.id, matchData.matchScore);
      toast.success(`Connection request sent to ${matchData.user.name}!`);
    } catch (err) {
      toast.error("Failed to send connection request");
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/users/${userId}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("User not found");
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  if (isLoading || !isUserLoaded) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
          <p>Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{error || "Profile not found"}</h2>
          <Link href="/dashboard">
            <Button variant="outline" className="border-white/10 hover:bg-white/5">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === profile.id;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden">
      <Toaster position="top-center" richColors />
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-violet-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition group"
          >
            <FiChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          
          <h1 className="text-xl font-bold bg-linear-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            {isOwnProfile ? "Your Profile" : "Commuter Profile"}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          {/* Left Column: Avatar and Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 text-center">
              <div className="relative inline-block">
                <Image 
                  src={profile.profile_picture_url || `https://placehold.co/200x200/7c3aed/ffffff?text=${profile.name.charAt(0)}`} 
                  alt={profile.name}
                  width={160}
                  height={160}
                  className="rounded-2xl border-4 border-violet-500/20 shadow-2xl shadow-violet-500/10 mx-auto"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-black" />
              </div>
              
              <h2 className="text-2xl font-bold mt-6">{profile.name}</h2>
              <p className="text-violet-400 font-medium text-sm mt-1">{profile.occupation || "Metro Commuter"}</p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {profile.gender && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-zinc-400 text-xs border border-white/10">
                    {profile.gender}
                  </div>
                )}
                {profile.birth_date && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-zinc-400 text-xs border border-white/10">
                    {calculateAge(profile.birth_date)} years
                  </div>
                )}
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4">
              <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Stats</h3>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">Match Rate</span>
                <span className="font-bold text-violet-400">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400 text-sm">Connections</span>
                <span className="font-bold">48</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Bio and Interests */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                <FiUser className="text-violet-400" /> Bio
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                {profile.bio || "No bio provided yet. This commuter prefers to let their route do the talking!"}
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
              <h3 className="flex items-center gap-2 text-xl font-bold mb-6">
                <FiHash className="text-emerald-400" /> Interests
              </h3>
              <div className="flex flex-wrap gap-3">
                {profile.interests && profile.interests.length > 0 ? (
                  profile.interests.map((interest, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 rounded-xl bg-violet-500/10 text-violet-300 border border-violet-500/20 text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-zinc-500 italic text-sm">No interests listed.</p>
                )}
              </div>
            </div>

            {profile.social_media_link && (
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
                <h3 className="flex items-center gap-2 text-xl font-bold mb-4">
                  <FiLink className="text-blue-400" /> Connect Outside
                </h3>
                <a 
                  href={profile.social_media_link.startsWith('http') ? profile.social_media_link : `https://${profile.social_media_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition underline decoration-blue-400/30 underline-offset-4"
                >
                  <FiLink /> {profile.social_media_link.replace(/(^\w+:|^)\/\//, '')}
                </a>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              {isOwnProfile ? (
                <Link href="/profile" className="flex-1">
                  <Button className="w-full h-14 rounded-2xl bg-linear-to-r from-violet-600 to-blue-600 hover:opacity-90 text-lg font-bold">
                    Edit My Profile
                  </Button>
                </Link>
              ) : (
                <>
                  <Button 
                    onClick={handleConnect}
                    disabled={!matchData}
                    className="flex-1 h-14 rounded-2xl bg-violet-600 hover:bg-violet-700 text-lg font-bold flex items-center justify-center gap-2"
                  >
                    <FiUser /> Connect
                  </Button>
                  <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-lg font-bold flex items-center justify-center gap-2">
                    <FiMessageSquare /> Message
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
