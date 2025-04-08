/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        perf_hooks: false,
        async_hooks: false,
      };
    }
    return config;
  },
  experimental: {
    esmExternals: "loose",
  },
  transpilePackages: ["three"],

  // staticPageGenerationTimeout is optional, but you can keep it:
  staticPageGenerationTimeout: 120,
};

module.exports = nextConfig;
