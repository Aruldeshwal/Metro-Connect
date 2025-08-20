// src/app/(newuser)/details/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Gender = "Male" | "Female" | "Non-binary" | "Prefer not to say" | "";

export default function UserDetailsFormPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [name, setName] = useState(user?.fullName || user?.username || '');
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState('');
  const [socialMediaLink, setSocialMediaLink] = useState('');
  const [occupation, setOccupation] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState<Gender>('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (!user) {
      setError("User not authenticated. Please sign in.");
      setIsLoading(false);
      return;
    }

    const userId = user.id;

    try {
      const formData = {
        name: name,
        bio: bio || null,
        interests: interests.split(',').map(s => s.trim()).filter(Boolean),
        social_media_link: socialMediaLink || null,
        occupation: occupation || null,
        birth_date: birthDate ? new Date(birthDate).toISOString() : null,
        gender: gender || null,
      };

      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile.');
      }

      setSuccess("Profile updated successfully!");
      router.push('/dashboard');
    } catch (err: any) {
      console.error("Profile update error:", err);
      setError(err.message || "An unexpected error occurred during profile update.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded || !user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#b0a8b9]">
        <p className="text-[#4b4453]">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#b0a8b9] p-4">
      <div className="bg-white dark:bg-[#4b4453] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-[#845ec2] mb-6 text-center">
          Complete Your Profile
        </h2>
        <p className="text-[#4b4453] dark:text-[#b0a8b9] text-center mb-8">
          Tell us a little more about yourself to help others connect with you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-[#4b4453] dark:text-[#b0a8b9]">Display Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 border-[#845ec2] focus:border-[#845ec2] focus:ring-[#845ec2]"
            />
          </div>

          <div>
            <Label htmlFor="bio" className="text-[#4b4453] dark:text-[#b0a8b9]">Bio (Optional)</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="A short description about yourself..."
              rows={3}
              className="mt-1 border-[#845ec2] focus:border-[#845ec2] focus:ring-[#845ec2]"
            />
          </div>

          <div>
            <Label htmlFor="interests" className="text-[#4b4453] dark:text-[#b0a8b9]">Interests (Optional, comma-separated)</Label>
            <Input
              id="interests"
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="e.g., hiking, coding, reading"
              className="mt-1 border-[#845ec2] focus:border-[#845ec2] focus:ring-[#845ec2]"
            />
          </div>

          <div>
            <Label htmlFor="socialMediaLink" className="text-[#4b4453] dark:text-[#b0a8b9]">Social Media Link (Optional)</Label>
            <Input
              id="socialMediaLink"
              type="url"
              value={socialMediaLink}
              onChange={(e) => setSocialMediaLink(e.target.value)}
              placeholder="e.g., https://linkedin.com/in/yourprofile"
              className="mt-1 border-[#845ec2] focus:border-[#845ec2] focus:ring-[#845ec2]"
            />
          </div>

          <div>
            <Label htmlFor="occupation" className="text-[#4b4453] dark:text-[#b0a8b9]">Occupation (Optional)</Label>
            <Input
              id="occupation"
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="e.g., Software Engineer, Student"
              className="mt-1 border-[#845ec2] focus:border-[#845ec2] focus:ring-[#845ec2]"
            />
          </div>

          <div>
            <Label htmlFor="birthDate" className="text-[#4b4453] dark:text-[#b0a8b9]">Birth Date (Optional)</Label>
            <Input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1 border-[#845ec2] focus:border-[#845ec2] focus:ring-[#845ec2]"
            />
          </div>

          <div>
            <Label htmlFor="gender" className="text-[#4b4453] dark:text-[#b0a8b9]">Gender (Optional)</Label>
            <Select onValueChange={(value: Gender) => setGender(value)} value={gender}>
              <SelectTrigger className="w-full mt-1 border-[#845ec2] focus:border-[#845ec2] focus:ring-[#845ec2]">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-2 text-center">{success}</p>}

          <Button
            type="submit"
            className="w-full mt-6 bg-[#845ec2] hover:bg-[#6f48a9] text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Saving Profile...' : 'Complete Profile'}
          </Button>
        </form>
      </div>
    </div>
  );
}
