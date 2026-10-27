import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  // Lets other devices on the local WiFi open the dev server (dev mode only)
  allowedDevOrigins: ['192.168.100.25', '192.168.*.*'],
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
