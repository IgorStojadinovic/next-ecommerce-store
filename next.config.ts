import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        qualities: [100],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "*.netlify.app",
            },
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    output: "standalone",
};

export default nextConfig;
