'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const links = [
  { name: 'About', href: '#about' },
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const NavLinks = () => {
  return (
    <nav className="w-fit py-4 pt-8 shadow-lg">
      <ul className="flex justify-center space-x-10">
        {links.map((link, index) => (
          <motion.li
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <Link
              href={link.href}
              className="text-gray-300 font-medium tracking-wide transition-colors duration-300 group-hover:text-purple-400"
            >
              {link.name}
              {/* Underline animation */}
            <motion.span
              layoutId="underline"
              className="absolute left-0 bottom-0 h-0.5 bg-purple-500 w-0 group-hover:w-full transition-all duration-300"
            />
            </Link>

            
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default NavLinks;
