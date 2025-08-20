// src/app/signup/page.tsx
"use client"; // Mark as a Client Component
import { SignUp } from "@clerk/nextjs"; // Import Clerk's SignUp component

export default function SignUpPage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <SignUp path="/signup" routing="path" signInUrl="/login" /> {/* */}
    </div>
  );
}