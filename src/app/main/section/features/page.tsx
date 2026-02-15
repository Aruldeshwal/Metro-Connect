'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { FiShare2, FiUser, FiMessageSquare, FiCpu } from 'react-icons/fi';

const features = [
  {
    icon: <FiShare2 className="h-7 w-7" />,
    title: 'Real-Time Route Matching',
    description:
      'Our intelligent algorithm constantly scans routes, instantly linking you with commuters traveling along your exact line for maximum efficiency.',
  },
  {
    icon: <FiUser className="h-7 w-7" />,
    title: 'Set up a profile',
    description:
      'Create your unique travel identity. Customize your profile with your commuting preferences and a bit about yourself to help others connect with the real you.',
  },
  {
    icon: <FiMessageSquare className="h-7 w-7" />,
    title: 'Secure In-App Chat',
    description:
      'Coordinate with ease using our end-to-end encrypted chat. Discuss pickup points and share updates without ever leaving the app.',
  },
  {
    icon: <FiCpu className="h-7 w-7" />,
    title: 'AI Icebreakers',
    description:
      'Break the silence effortlessly. Our AI generates personalized conversation starters, making it easy and comfortable to connect with your new travel partners.',
  },
];

const Features = () => {
  const titleRef = useRef(null);
  const firstPairRef = useRef(null);
  const secondPairRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, margin: '-100px' });
  const firstPairInView = useInView(firstPairRef, { once: true, margin: '-100px' });
  const secondPairInView = useInView(secondPairRef, { once: true, margin: '-100px' });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, rotateZ: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* 🟣 Title Section */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Core Features
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-400">
            Everything you need for a seamless and connected journey.
          </p>
        </motion.div>

        {/* 🟢 First Pair of Cards */}
        <motion.div
          ref={firstPairRef}
          variants={containerVariants}
          initial="hidden"
          animate={firstPairInView ? 'visible' : 'hidden'}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative flex flex-col items-center text-center p-8 bg-gray-900/50 rounded-2xl border border-white/10 transition-colors duration-300 hover:border-purple-500/50"
            >
              <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-xl bg-purple-600/20 text-purple-300 mb-6 ring-1 ring-inset ring-purple-600/30">
                <div className="absolute -inset-2 rounded-xl bg-purple-500/20 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* 🟡 Second Pair of Cards */}
        <motion.div
          ref={secondPairRef}
          variants={containerVariants}
          initial="hidden"
          animate={secondPairInView ? 'visible' : 'hidden'}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.slice(2).map((feature, index) => (
            <motion.div
              key={index + 2}
              variants={cardVariants}
              className="group relative flex flex-col items-center text-center p-8 bg-gray-900/50 rounded-2xl border border-white/10 transition-colors duration-300 hover:border-purple-500/50"
            >
              <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-xl bg-purple-600/20 text-purple-300 mb-6 ring-1 ring-inset ring-purple-600/30">
                <div className="absolute -inset-2 rounded-xl bg-purple-500/20 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-base text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Features;
