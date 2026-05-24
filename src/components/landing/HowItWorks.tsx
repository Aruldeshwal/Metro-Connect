"use client"


import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { FiMap, FiUsers, FiMessageSquare } from 'react-icons/fi';

const steps = [
    {
        icon: <FiMap className="h-8 w-8" />,
        title: 'Set your route',
        description: 'Set your definitive travel line. Pinpoint your start and end destinations to instantly generate the most efficient route for your commute or journey.',
    },
    {
        icon: <FiUsers className="h-8 w-8" />,
        title: 'Link with relevant commuters',
        description: 'Discover your link. Our smart system identifies and suggests other verified commuters traveling along your exact line, helping you find the perfect travel companions.',
    },
    {
        icon: <FiMessageSquare className="h-8 w-8" />,
        title: 'Chat with your link',
        description: 'Communicate with ease. Once linked, use our secure, built-in chat to coordinate pickup times, share live updates, and connect with your travel partners.',
    },
];

const HowItWorks = () => {
    const titleRef = useRef(null);
    const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

    const cardsRef = useRef(null);
    const areCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.25,
            },
        },
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 15,
                mass: 1,
            },
        },
    };

    return (
        // The main ref on the section is no longer needed
        <section id="how-it-works" className="py-20 sm:py-28">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Title section now has its own ref and animation trigger */}
                <motion.div
                    ref={titleRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        How It Works
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-400">
                        A simple, three-step process to elevate your experience.
                    </p>
                </motion.div>

                <motion.div
                    ref={cardsRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={areCardsInView ? "visible" : "hidden"}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10"
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="relative flex flex-col p-8 bg-gray-900/50 rounded-2xl border border-white/10 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-600/20 text-purple-400 ring-1 ring-inset ring-purple-600/30">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white">
                                    {step.title}
                                </h3>
                            </div>
                            <p className="mt-4 text-base text-gray-400">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default HowItWorks;