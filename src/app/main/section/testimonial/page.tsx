"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "Line-A-Link has completely transformed my daily commute. I've met fantastic people on my route, and the AI icebreakers are a genuinely fun touch!",
    name: "Sarah J.",
    role: "Daily Commuter",
    avatar: "https://placehold.co/100x100/9333ea/ffffff?text=SJ",
  },
  {
    quote:
      "As a student on a budget, this app is a lifesaver. Finding someone on my exact line to the university was incredibly easy and has saved me a fortune.",
    name: "David L.",
    role: "University Student",
    avatar: "https://placehold.co/100x100/9333ea/ffffff?text=DL",
  },
  {
    quote:
      "The security and profile verification gave me the confidence to try this. The in-app chat is seamless for coordinating. Highly recommended.",
    name: "Maria K.",
    role: "Professional",
    avatar: "https://placehold.co/100x100/9333ea/ffffff?text=MK",
  },
];

const Testimonials = () => {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const cardsRef = useRef(null);
  const areCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Trusted by Commuters Like You
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg leading-8 text-gray-400">
            Line-A-Link is redefining the journey to work.
          </p>
        </motion.div>

        <motion.div
          ref={cardsRef}
          variants={containerVariants}
          initial="hidden"
          animate={areCardsInView ? "visible" : "hidden"}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative flex flex-col justify-between p-8 bg-gray-900/50 rounded-2xl border border-white/10 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="flex-grow">
                <FaQuoteLeft className="h-8 w-8 text-purple-500/50 mb-4" />
                <blockquote className="italic text-gray-300">
                  {`"${testimonial.quote}"`}
                </blockquote>
              </div>

              <footer className="mt-6 flex items-center gap-4">
                <Image
                  className="h-12 w-12 rounded-full object-cover"
                  src={testimonial.avatar}
                  alt={`Avatar of ${testimonial.name}`}
                  width={48}
                  height={48}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src =
                      "https://placehold.co/100x100/1a1a1a/ffffff?text=User";
                  }}
                />
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </footer>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
