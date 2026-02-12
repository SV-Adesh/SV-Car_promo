import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Avoid Turbopack inferring a wrong workspace root when multiple lockfiles exist.
  // This is especially common on Windows when you have another `package-lock.json`
  // higher up the directory tree.
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
