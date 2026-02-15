"use client";

import React from 'react';
import { motion } from 'framer-motion';

// Define the shape of a single step for TypeScript
interface Step {
    id: number;
    name: string;
    icon: React.ReactNode;
}

// Define the props our ProgressBar component will accept
interface ProgressBarProps {
    steps: Step[];
    currentStep: number;
    className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, className = '' }) => {
    // Calculate the progress percentage based on the current step
    const progressPercentage = steps.length > 1 
        ? ((currentStep - 1) / (steps.length - 1)) * 100 
        : 100;

    return (
        <div className={`mb-8 ${className}`}>
            <div className="flex justify-between items-center mb-2">
                {steps.map((step) => (
                    <div 
                        key={step.id} 
                        className={`flex flex-col items-center transition-colors duration-500 ${
                            currentStep >= step.id ? 'text-purple-400' : 'text-gray-600'
                        }`}
                    >
                        {step.icon}
                        <span className="text-xs mt-1 font-medium">{step.name}</span>
                    </div>
                ))}
            </div>
            <div className="bg-gray-800 rounded-full h-1.5 w-full">
                <motion.div
                    className="bg-purple-500 h-1.5 rounded-full"
                    initial={{ width: '0%' }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;