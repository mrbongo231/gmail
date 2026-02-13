import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    env: {
        AUTH_PASSWORD: process.env.AUTH_PASSWORD,
    },
};

export default nextConfig;
