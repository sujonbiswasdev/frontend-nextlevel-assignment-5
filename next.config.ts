import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ["images.pexels.com","res.cloudinary.com"], 
    remotePatterns:[
      {
        protocol:"https",
        hostname:"*"
      }
    ]
  },
};

export default nextConfig;
