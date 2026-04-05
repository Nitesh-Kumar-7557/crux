import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:4001/:path*", // internal docker service name
      },
    ];
  },
};

export default nextConfig;
