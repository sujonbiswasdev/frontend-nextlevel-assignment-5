import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler:true,
  images: {
    domains: ["images.pexels.com","res.cloudinary.com"], 
    formats: ["image/avif", "image/webp"] as const,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],

  },

  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination:`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination:`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/:path*`,
      },
    ]
  },
};

export default nextConfig;
