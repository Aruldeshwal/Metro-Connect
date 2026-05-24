"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { FiUser, FiBriefcase, FiLink } from "react-icons/fi";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Gender = "Male" | "Female" | "Non-binary" | "Prefer not to say" | "";
type FormData = {
  name: string;
  bio: string;
  occupation: string;
  birthDate: string;
  gender: Gender;
  interests: string;
  socialMediaLink: string;
};


const VerticalConnectorBar = ({ currentStep }: { currentStep: number }) => {
  // Step 1 → 0%, Step 2 → 50%, Step 3 → 100%
  const progress = Math.min(Math.max((currentStep - 1) / 2, 0), 1);

  return (
    <div className="pointer-events-none absolute bottom-28 left-1/2 top-28 hidden w-8 -translate-x-1/2 lg:block">
      {/* Base Line */}
      <div className="absolute bottom-0 left-1/2 top-0 w-2 -translate-x-1/2 rounded-full bg-slate-700/50" />

      {/* Progress Fill */}
      <motion.div
        className="absolute bottom-0 left-1/2 top-0 w-2 origin-top -translate-x-1/2 rounded-full bg-teal-400 shadow-[0_0_18px_rgba(45,212,191,0.45)]"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: progress }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      {[0, 0.5, 1].map((stepProgress) => (
        <div
          key={stepProgress}
          className={`absolute left-1/2 h-4 w-4 rounded-full border-2 ${
            progress >= stepProgress
              ? "border-teal-300 bg-teal-400 shadow-[0_0_14px_3px_rgba(45,212,191,0.55)]"
              : "border-slate-600 bg-slate-800"
          }`}
          style={{
            top: `${stepProgress * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      <motion.div
        className="absolute left-1/2 h-5 w-5 rounded-full bg-teal-300 shadow-[0_0_16px_5px_rgba(45,212,191,0.65)]"
        animate={{ top: `${progress * 100}%` }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
};


interface UserDetailsFormProps {
  initialName: string;
  userId: string;
}

function UserDetailsForm({ initialName, userId }: UserDetailsFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: initialName,
    bio: "",
    occupation: "",
    birthDate: "",
    gender: "",
    interests: "",
    socialMediaLink: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleGenderChange = (value: Gender) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setError(null);

  if (!formData.name.trim() || !formData.gender) {
    setError(
      "Please ensure all required fields (Display Name and Gender) are filled out before submitting."
    );
    return;
  }

  setIsLoading(true);

  try {
    const finalData = {
      name: formData.name,
      bio: formData.bio || null,
      interests: formData.interests
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      social_media_link: formData.socialMediaLink || null,
      occupation: formData.occupation || null,
      birth_date: formData.birthDate
        ? new Date(formData.birthDate).toISOString()
        : null,
      gender: formData.gender,
    };

    const response = await fetch(`/api/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update profile.");
    }

    router.push("/set-route");
  } catch (err: unknown) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred.");
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-screen bg-[#0d0d0d] p-10 lg:p-20"> 
      <div className="w-full max-w-7xl"> 
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="pb-12"
        >
          <form onSubmit={handleFinalSubmit}>
            
            <h2 className="text-6xl lg:text-8xl font-extrabold text-white mb-16 text-center border-b border-teal-500/30 pb-8">
              Complete Your Profile
            </h2>
            
            {/* Fields Container: GRID LAYOUT FOR ZIG-ZAG - RELATIVE FOR PROGRESS BAR */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-20 relative">

                {/* 🌟 VERTICAL CONNECTOR BAR (Progress Visualizer) 🌟 */}
                <VerticalConnectorBar currentStep={currentStep} />
            
                {/* 1. IDENTITY - TOP LEFT (col 1, row 1) */}
                {/* JUSTIFY-END to push the card to the right side of the left column (next to the bar) */}
                <div className="col-span-1 row-start-1 flex justify-end z-10 mt-20">
                  <div className="max-w-xl w-full p-10 bg-slate-800/70 rounded-xl shadow-2xl">
                    <h3 className="text-4xl text-slate-300 flex items-center mb-8 mt-4">
                      <FiUser className="w-10 h-10 mr-5 text-slate-400" /> Your Identity
                    </h3>
                    {/* ... (Identity Card Content) ... */}
                    <div className="mt-8 pt-6 border-t border-slate-700">
                      {/* ... (Input fields) ... */}
                      <div className="mb-8">
                        <Label htmlFor="name" className="text-xl text-gray-400 block mb-2">
                          Display Name <span className="text-slate-400">*</span>
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-slate-700/80 border-slate-500/50 focus:ring-2 focus:ring-slate-400 text-white text-xl p-4 w-full"
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio" className="text-xl text-slate-400 block mb-2">
                          Your Bio (Optional)
                        </Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          placeholder="A short, engaging description about yourself..."
                          rows={5}
                          className="bg-slate-700/80 border-slate-500/50 focus:ring-2 focus:ring-slate-400 text-white text-xl p-4 w-full resize-none"
                        />
                      </div>
                      <div className="mt-8 pt-6 border-t border-slate-700">
                        <a href="#personal" 
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentStep(2);
                            document.querySelector("#personal")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="w-full block text-center py-3 bg-slate-500 hover:bg-slate-600 text-white font-semibold rounded-lg transition duration-200 text-xl"
                        >
                          Next
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* *** NEW FILLER ELEMENT ***
                  This placeholder pushes the "Personal" card down, creating the staggered effect.
                  It needs to be in the Top Right slot (col 2, row 1).
                */}
                <div className="hidden lg:block col-span-1 row-start-1 justify-start">
                    {/* Placeholder content to take up vertical space, adjust height (h-full/h-96) as needed for spacing */}
                    <div className="h-96 w-full" /> 
                </div>

                
                {/* 2. PERSONAL & PROFESSIONAL - MIDDLE RIGHT (col 2, row 2) */}
                <div id="personal" className="col-span-1 mt-32 row-start-2 col-start-2 flex justify-end z-10">
                  <div className="max-w-xl w-full p-10 bg-slate-800/70 rounded-xl shadow-2xl">
                    <h3 className="text-4xl text-cyan-400 flex items-center mb-8 mt-4">
                      <FiBriefcase className="w-10 h-10 mr-5 text-cyan-500" /> Personal & Professional
                    </h3>
                    <div className="mt-8 pt-6 border-t border-slate-700">
                      <div className="grid grid-cols-1 gap-8">
                        <div className="col-span-1">
                          <Label htmlFor="occupation" className="text-xl text-gray-200 block mb-2">Occupation (Optional)</Label>
                          <Input id="occupation" type="text" value={formData.occupation} onChange={handleChange} placeholder="Engineer, Artist, Writer" className="bg-slate-700/80 border-cyan-500/50 focus:ring-2 focus:ring-cyan-400 text-white text-xl p-4 w-full"/>
                        </div>
                        <div className="col-span-1">
                          <Label htmlFor="birthDate" className="text-xl text-gray-200 block mb-2">Birth Date (Optional)</Label>
                          <Input id="birthDate" type="date" value={formData.birthDate} onChange={handleChange} className="bg-slate-700/80 border-cyan-500/50 focus:ring-2 focus:ring-cyan-400 text-white text-xl p-4 w-full"/>
                        </div>
                        <div className="col-span-1">
                          <Label htmlFor="gender" className="text-xl text-gray-200 block mb-2">Gender <span className="text-cyan-400">*</span></Label>
                          <Select onValueChange={handleGenderChange} value={formData.gender} required>
                            <SelectTrigger className="w-full bg-slate-700/80 border-cyan-500/50 focus:ring-2 focus:ring-cyan-400 text-white text-xl h-auto p-4"><SelectValue placeholder="Select..." /></SelectTrigger>
                            <SelectContent className="bg-gray-900 border-cyan-500/30 text-white text-xl">
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Non-binary">Non-binary</SelectItem>
                              <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-8 pt-6 border-t border-slate-700">
                        <a href="#connectivity" 
                          onClick={(e) => {
                            e.preventDefault(); // stop anchor jump
                            setCurrentStep(3)
                            document.querySelector("#connectivity")?.scrollIntoView({ behavior: "smooth" }
                          );}}
                          className="w-full block text-center py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition duration-200 text-xl"
                        >
                          Next
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                
                {/* 3. CONNECTIVITY - BOTTOM LEFT (col 1, row 3) */}
                {/* JUSTIFY-END to push the card to the right side of the left column (next to the bar) */}
                <div className="col-span-1 row-start-3 mt-20 flex justify-start z-10" id="connectivity">
                  <div className="max-w-xl w-full p-10 bg-slate-800/70 rounded-xl shadow-2xl">
                    <h3 className="text-4xl text-amber-400 flex items-center mb-8 mt-4">
                      <FiLink className="w-10 h-10 mr-5 text-amber-500" /> Connectivity
                    </h3>
                    {/* ... (Connectivity Card Content) ... */}
                    <div className="mt-8 pt-6 border-t border-slate-700">
                      <div className="mb-8">
                        <Label htmlFor="interests" className="text-xl text-gray-200 block mb-2">Interests (comma-separated, Optional)</Label>
                        <Input id="interests" type="text" value={formData.interests} onChange={handleChange} placeholder="e.g., hiking, coding, jazz music" className="bg-slate-700/80 border-amber-500/50 focus:ring-2 focus:ring-amber-400 text-white text-xl p-4 w-full"/>
                      </div>
                      <div className="mb-8">
                        <Label htmlFor="socialMediaLink" className="text-xl text-gray-200 block mb-2">Social Media Link (Optional)</Label>
                        <Input id="socialMediaLink" type="url" value={formData.socialMediaLink} onChange={handleChange} placeholder="https://linkedin.com/in/yourprofile" className="bg-slate-700/80 border-amber-500/50 focus:ring-2 focus:ring-amber-400 text-white text-xl p-4 w-full"/>
                      </div>
                    </div>
                    
                    {/* === SUBMIT SECTION (Inside Card 3) === */}
                    <div className="mt-8 pt-6 border-t border-slate-700">
                      
                      {/* Error Message */}
                      {error && (
                        <p className="text-red-500 text-xl mb-6 text-center">{error}</p>
                      )}

                      {/* Submit Button */}
                      <div className="flex justify-center">
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold w-full px-16 py-6 transition-transform duration-300 ease-out transform hover:scale-[1.03] text-xl"
                        >
                          {isLoading ? "Saving Profile..." : "Complete Profile"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Filler for the bottom-right slot to balance the grid visually */}
                <div className="hidden lg:block col-span-1 row-start-3 justify-start"></div>
                
            </div> 
          </form>
        </motion.div>
      </div>
    </div>
  );

}

export default function UserDetailsFormPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-[#0d0d0d]">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-[#0d0d0d]">
        <p className="text-gray-400">Please sign in to continue.</p>
      </div>
    );
  }

  return (
    <UserDetailsForm
      initialName={user.fullName || user.username || ""}
      userId={user.id}
    />
  );
}
