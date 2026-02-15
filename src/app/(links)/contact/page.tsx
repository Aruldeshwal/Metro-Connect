'use client';

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin } from 'react-icons/fi';

const ContactPage = () => {
    // Replace 'YOUR_FORM_ID' with the actual ID from your Formspree dashboard
    const [state, handleSubmit] = useForm('YOUR_FORM_ID'); 

    if (state.succeeded) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0d0d] text-white text-center px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-10 bg-gray-900/50 rounded-2xl border border-white/10"
                >
                    <h2 className="text-3xl font-bold text-white">Thank You!</h2>
                    <p className="mt-4 text-lg text-gray-300">Your message has been sent successfully. We will be in touch shortly.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-[#0d0d0d] text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 sm:py-28">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Get in Touch
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                        We welcome your questions, feedback, and partnership inquiries.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Left Column: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                            <p className="mt-2 text-gray-400">
                                Fill out the form, and we will get back to you within 24 hours.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <FiMail className="h-6 w-6 text-purple-400" />
                            <a href="mailto:aruldeshwal1@gmail.com" className="text-lg text-gray-300 hover:text-purple-400 transition-colors">
                                support@linealink.com
                            </a>
                        </div>
                        <div className="flex items-center gap-4">
                            <FiMapPin className="h-6 w-6 text-purple-400" />
                            <p className="text-lg text-gray-300">Faridabad, Haryana, India</p>
                        </div>
                    </motion.div>

                    {/* Right Column: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="p-8 bg-gray-900/50 rounded-2xl border border-white/10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    required
                                    className="mt-1 block w-full bg-gray-800/50 border border-white/10 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    className="mt-1 block w-full bg-gray-800/50 border border-white/10 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                />
                                <ValidationError prefix="Email" field="email" errors={state.errors} className="mt-1 text-red-400 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="mt-1 block w-full bg-gray-800/50 border border-white/10 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                                />
                                <ValidationError prefix="Message" field="message" errors={state.errors} className="mt-1 text-red-400 text-sm" />
                            </div>
                            <div>
                                <button 
                                    type="submit" 
                                    disabled={state.submitting}
                                    className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {state.submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;