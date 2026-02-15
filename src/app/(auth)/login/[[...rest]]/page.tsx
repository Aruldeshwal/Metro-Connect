"use client";
import { SignIn } from '@clerk/nextjs';
import React from 'react';
export default function SignInPage() {
  return (
    // The main container is now responsible for centering the entire card on the page.
    <div className="relative min-h-screen w-full flex flex-col md:flex-row bg-gray-900 bg-center bg-cover">
       <div
        className="relative w-full
      flex flex-col md:flex-row overflow-hidden"
      >
      {/* The main card container, which now houses both the sign-in form and the text content. */}
      {/* It uses flexbox to arrange its children and features rounded corners and a shadow. */}
      <div className="absolute inset-0 z-0 bg-cover bg-center bg-black"></div>

        {/* A semi-transparent overlay is placed on top of the image to improve text readability. */}
        <div className="absolute inset-0 bg-opacity-50 z-0"></div>
      {/* For responsiveness, it stacks content vertically on small screens and horizontally on larger ones. */}
      <div className="w-full md:w-1/2 relative z-10 p-8 flex items-center justify-center">
                <div className="w-full ml-35">
                  
      
                  {/* Clerk SignUp component - styled container wrapper keeps existing look */}
                  <div className="w-full bg-transparent">
                    <SignIn signUpUrl="/signup" fallbackRedirectUrl="/dashboard"/>
                  </div>
      
                  
      
                  
                  
                </div>
              </div>

        {/* The Text section. It also occupies half the width on medium screens and up. */}
        <div
          className="w-full md:w-1/2 relative z-10 flex flex-col justify-center p-12 bg-cover bg-center"
          style={{backgroundImage: 'url("/images/login/metrosunset.png")'}}
        >
          <div className="relative z-10 text-white"> {/* General text color for this section */}
            <h2 className="text-xl font-semibold mb-2 uppercase text-white">Your Metro Community</h2> {/* Keep white for strong presence */}
            <h1 className="text-6xl font-extrabold mb-4 leading-tight text-white">Connect on the Go</h1> {/* Keep white for strong presence */}
            <p className="text-lg mb-6 text-white">
              Find and connect with fellow commuters on similar DMRC routes.
            </p>
            <p className="text-md text-white">
              Your network, one station at a time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}