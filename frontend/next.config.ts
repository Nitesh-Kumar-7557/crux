import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://backend:4001/:path*", // for production
        destination: "http://localhost:8000/:path*",  // for development
      },
    ];
  },
};

export default nextConfig;
