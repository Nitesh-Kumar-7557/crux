import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.SERVER_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
