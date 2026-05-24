"use client";


import { useRouter } from 'next/navigation';
import React from 'react';
// Importing the icons needed for the social media links
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
    const socialLinks = [
        { name: 'LinkedIn', icon: <FiLinkedin />, href: 'https://www.linkedin.com/in/arul-deshwal-1367b1327/' },
        { name: 'Twitter', icon: <FiTwitter />, href: 'https://x.com/ArulDeshwal' },
        { name: 'GitHub', icon: <FiGithub />, href: 'https://github.com/Aruldeshwal' },
    ];
    const Router = useRouter();
    const footerLinks = [
        { name: 'About', path:'./about'},
        { name: 'Contact', path:'./contact'},
        { name: 'Privacy Policy', path:'./privacy'},
        { name: 'Terms', path:'./conditions'},
    ];

    return (
        <footer className="bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {/* Main content area */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-10">
                    
                    {/* Brand and Tagline */}
                    <div className="md:w-1/3">
                        <h2 className="text-2xl font-bold text-white">Line-A-Link</h2>
                        <p className="mt-2 text-base text-gray-400">
                            Connecting commuters, one line at a time.
                        </p>
                    </div>

                    {/* Links and Socials Container */}
                    <div className="flex flex-col sm:flex-row gap-10 md:gap-20">
                        {/* Navigation Links */}
                        <div>
                            <h3 className="font-semibold text-white tracking-wider">Links</h3>
                            <ul className="mt-4 space-y-2">
                                {footerLinks.map((link) => (
                                    <li key={link.name}>
                                        <a onClick={() => {Router.push(link.path)}} className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white tracking-wider">Follow Us</h3>
                            <div className="flex mt-4 space-x-5">
                                {socialLinks.map((social) => (
                                    <a 
                                        key={social.name} 
                                        href={social.href} 
                                        aria-label={social.name}
                                        className="text-gray-400 hover:text-purple-400 hover:scale-110 transition-all duration-300"
                                    >
                                        <span className="h-6 w-6">{social.icon}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-8 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Line-A-Link. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;