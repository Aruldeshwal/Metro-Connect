'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'lucide-react';
import Image from "next/image";

// Placeholder data for team members
const teamMembers = [
    {
        name: 'Arul Deshwal',
        role: 'Everything',
        avatar: 'https://placehold.co/200x200/9333ea/ffffff?text=AD',
    },
];

interface animatedSectionProps {
    children: React.ReactNode
}

const AnimatedSection = ({ children }: animatedSectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
        >
            {children}
        </motion.div>
    );
};

const AboutPage = () => {
    return (
        <div className="bg-[#0d0d0d] text-white overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative text-center py-28 sm:py-40 px-6 lg:px-8 bg-gray-900/50">
                <div className="absolute inset-0 bg-purple-900/20 blur-3xl"></div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                        Connecting the Dots of Your Daily Commute.
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
                        Line-A-Link was born from a simple observation: every day, countless individuals travel the same lines, yet remain disconnected. We set out to change that.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-28 space-y-24">
                {/* Our Story Section */}
                <AnimatedSection>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Story</h2>
                            <p className="mt-6 text-gray-300 leading-relaxed">
                                The idea for Line-A-Link sparked during a rainy, congested commute. Our founder, stuck in traffic, noticed dozens of other solo drivers heading in the exact same direction. The inefficiency was palpable. What if we could link these parallel journeys? What if we could transform wasted time into an opportunity for connection, savings, and a greener planet? From this single question, our mission took shape: to build the most intelligent, secure, and user-friendly platform for shared travel.
                            </p>
                        </div>
                        <div className="flex justify-center">
                             <FiHeart className="h-40 w-40 text-purple-500/30" />
                        </div>
                    </div>
                </AnimatedSection>

                {/* Our Mission Section */}
                <AnimatedSection>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our Mission</h2>
                        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
                            To seamlessly connect commuters on shared routes, fostering a community built on efficiency, trust, and a mutual desire for smarter travel.
                        </p>
                    </div>
                </AnimatedSection>
                
                {/* Meet the Team Section */}
                 <AnimatedSection>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Meet the Creator</h2>
                        <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
                            Line-A-Link is the vision and dedication of one individual.
                        </p>
                        {/* Centering the single team member */}
                        <div className="mt-16 flex justify-center">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="text-center">
                                    <Image
                                        className="h-32 w-32 rounded-full mx-auto object-cover ring-2 ring-purple-500/50"
                                        src={member.avatar}
                                        alt={`Avatar of ${member.name}`}
                                        width={128}
                                        height={128}
                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        e.currentTarget.src =
                                            "https://placehold.co/200x200/1a1a1a/ffffff?text=User";
                                        }}

                                    />
                                    <h3 className="mt-6 text-xl font-semibold text-white">{member.name}</h3>
                                    <p className="text-purple-400">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

                {/* Call to Action Section */}
                <AnimatedSection>
                    <div className="text-center p-12 bg-gray-900/50 rounded-2xl border border-white/10">
                         <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to Join the Movement?</h2>
                         <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-300">
                            Set your route, find your link, and start your journey towards a smarter commute today.
                         </p>
                         <div className="mt-8">
                            <Link href="/signup" className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300">
                                Get Started
                            </Link>
                         </div>
                    </div>
                </AnimatedSection>
            </div>
        </div>
    );
};

export default AboutPage;