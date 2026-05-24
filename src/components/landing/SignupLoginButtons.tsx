"use client";
import { useRouter } from "next/navigation";
import React from "react";

const ButtonSignupLogin = () => {
  const router = useRouter();
  return (
    <div className="z-20 flex items-center space-x-4 m-4">
      <div className="flex items-center space-x-4">
        {/* Sign Up Butt  on */}
        <button
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm 
          font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-indigo-600 
          group-hover:from-purple-600 group-hover:to-indigo-500 focus:ring-4 focus:outline-none
          focus:ring-purple-300 dark:focus:ring-purple-800"
          onClick={() => {
            router.push("/signup");
          }}
        >
          <span
            className="relative px-5 py-2.5 w-full h-full transition-all duration-300 ease-in-out 
              bg-gray-900 text-white rounded-md 
              group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-indigo-600 
              group-hover:text-cyan-300"
          >
            Sign Up
          </span>
        </button>

        {/* Login Button */}
        <button
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm 
          font-medium rounded-lg group bg-gradient-to-br from-indigo-500 to-purple-600 
          group-hover:from-indigo-600 group-hover:to-purple-500 focus:ring-4 focus:outline-none 
          focus:ring-indigo-300 dark:focus:ring-indigo-800 mr-2"
          onClick={() => {
            router.push("/login");
          }}
        >
          <span
            className="relative px-5 py-2.5 w-full h-full transition-all duration-300 ease-in-out 
              bg-gray-900 text-white rounded-md 
              group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 
              group-hover:text-pink-300"
          >
            Login
          </span>
        </button>
      </div>
    </div>
  );
};

export default ButtonSignupLogin;
