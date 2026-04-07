// src/components/GoogleLoginButton.tsx
"use client";
import React from "react";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    const betterAuthUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const callbackURL = "http://localhost:3000/google/success"; // server-side success handler

    // Simply redirect browser
    window.location.href = `${betterAuthUrl}/api/auth/sign-in/social?provider=google&callbackURL=${encodeURIComponent(callbackURL)}`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Sign in with Google
    </button>
  );
}