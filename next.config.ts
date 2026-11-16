import type { NextConfig } from "next";

const apiUrl = (process.env.API_URL ?? "http://localhost:3001").replace(
    /\/+$/,
    "",
);

const nextConfig: NextConfig = {
    agentRules: false,
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${apiUrl}/:path*`,
            },
        ];
    },
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
    output: "standalone",
};

export default nextConfig;
