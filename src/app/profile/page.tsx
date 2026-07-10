"use client";

import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiBriefcase, FiHash, FiLink, FiChevronLeft, FiSave, FiInfo } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import Link from "next/link";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    occupation: "",
    interests: "",
    social_media_link: "",
    gender: "",
  });
  
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      // Fetch existing profile data from our DB
      const fetchProfile = async () => {
        try {
          const res = await fetch(`/api/users/${user.id}`);
          if (res.ok) {
            const data = await res.json();
            setFormData({
              name: data.name || user.fullName || "",
              bio: data.bio || "",
              occupation: data.occupation || "",
              interests: data.interests ? data.interests.join(", ") : "",
              social_media_link: data.social_media_link || "",
              gender: data.gender || "",
            });
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
        }
      };
      fetchProfile();
    }
  }, [isLoaded, user]);

  const handleSave = async () => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      const interestsArray = formData.interests
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i !== "");

      const res = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          interests: interestsArray,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      toast.success("Profile updated successfully!");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
              <FiChevronLeft />
              Back to Dashboard
            </button>
          </Link>
          <h1 className="text-3xl font-bold bg-linear-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Commuter Identity
          </h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 space-y-8"
        >
          {/* Header Info */}
          <div className="flex items-center gap-6 pb-8 border-b border-white/10">
            <div className="relative">
              <img 
                src={user?.imageUrl} 
                className="w-24 h-24 rounded-2xl border-2 border-violet-500/50 shadow-xl shadow-violet-500/20"
                alt="Profile"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.fullName}</h2>
              <p className="text-zinc-500">{user?.primaryEmailAddress?.emailAddress}</p>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Verified Commuter
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Display Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-zinc-400">
                <FiUser className="text-violet-400" /> Public Name
              </Label>
              <Input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="How others see you..."
                className="bg-white/5 border-white/10 rounded-xl h-12 focus:ring-violet-500"
              />
            </div>

            {/* Occupation */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-zinc-400">
                <FiBriefcase className="text-blue-400" /> Occupation
              </Label>
              <Input 
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                placeholder="Software Engineer, Designer, Student..."
                className="bg-white/5 border-white/10 rounded-xl h-12"
              />
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-zinc-400">
                <FiInfo className="text-pink-400" /> Bio
              </Label>
              <Textarea 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell other commuters a bit about yourself..."
                className="bg-white/5 border-white/10 rounded-xl min-h-[120px] resize-none pt-4"
              />
              <p className="text-[10px] text-zinc-600">This bio is used by our AI to generate icebreakers.</p>
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-zinc-400">
                <FiHash className="text-emerald-400" /> Interests (Comma separated)
              </Label>
              <Input 
                value={formData.interests}
                onChange={(e) => setFormData({...formData, interests: e.target.value})}
                placeholder="Gaming, Coffee, Tech, Reading..."
                className="bg-white/5 border-white/10 rounded-xl h-12"
              />
            </div>

            {/* Social Link */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-zinc-400">
                <FiLink className="text-amber-400" /> Social Link (Optional)
              </Label>
              <Input 
                value={formData.social_media_link}
                onChange={(e) => setFormData({...formData, social_media_link: e.target.value})}
                placeholder="LinkedIn or Instagram profile..."
                className="bg-white/5 border-white/10 rounded-xl h-12"
              />
            </div>
          </div>

          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-14 rounded-2xl bg-linear-to-r from-violet-600 to-blue-600 hover:opacity-90 text-lg font-bold shadow-lg shadow-violet-600/20 transition-all active:scale-[0.98]"
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Syncing Profile...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <FiSave /> Save Identity
              </span>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
