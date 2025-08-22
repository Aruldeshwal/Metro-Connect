'use client'
import { useRouter } from 'next/navigation'; 
import React from 'react';


const ButtonSignupLogin = () => {
    const router = useRouter();
  return (
        <div className="absolute top-4 right-4 z-20 flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm 
            font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 
            group-hover:from-purple-500 group-hover:to-pink-500 focus:ring-4 focus:outline-none
            focus:ring-purple-200 dark:focus:ring-purple-800" onClick={() => {router.push("/signup")}}>
              <span className="relative px-5 py-2.5 w-full h-full transition-all duration-300 ease-in-out 
                  bg-gray-900 text-white rounded-md 
                  group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 
                  group-hover:text-gray-700">
                Sign Up
              </span>
            </button>
            <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm 
            font-medium rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 
            group-hover:from-purple-500 group-hover:to-pink-500 focus:ring-4 focus:outline-none 
            focus:ring-purple-200 dark:focus:ring-purple-800" onClick={() => {router.push("/login")}}>
              <span className="relative px-5 py-2.5 w-full h-full transition-all duration-300 ease-in-out 
                  bg-gray-900 text-white rounded-md 
                  group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 
                  group-hover:text-gray-700">
                Login
              </span>
            </button>
          </div>
        </div>
  )
}

export default ButtonSignupLogin