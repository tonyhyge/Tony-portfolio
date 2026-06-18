import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true, // GitHub Pages doesn't support Next.js Image Optimization
  },
  basePath: process.env.NODE_ENV === "production" ? "/Tony-portfolio" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/Tony-portfolio/" : "",
};

export default nextConfig;
