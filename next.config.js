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
  },
  webpack: (config, { isServer }) => {
    // Fix for Firebase
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        perf_hooks: false,
        async_hooks: false,
      }
    }

    // Remove the problematic swc-loader for Firebase modules
    config.module.rules.forEach((rule) => {
      const { test, use } = rule
      if (test?.test?.("module.js") || test?.test?.("module.mjs")) {
        if (Array.isArray(use)) {
          rule.use = use.filter((u) => !u.loader?.includes("next-swc-loader"))
        }
      }
    })

    return config
  },
  // Disable experimental features that might cause issues
  experimental: {
    esmExternals: "loose", // This helps with ESM compatibility
  },
  // Disable transpilation of Firebase packages
  transpilePackages: ["three"], // Keep three.js but remove Firebase
}

module.exports = nextConfig

