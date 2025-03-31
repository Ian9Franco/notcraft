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
    unoptimized: true, // Esto es importante para la exportación estática
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

    return config
  },
  // Disable experimental features that might cause issues
  experimental: {
    esmExternals: "loose", // This helps with ESM compatibility
  },
  // Disable transpilation of Firebase packages
  transpilePackages: ["three"], // Keep three.js but remove Firebase

  // Configuración para output estático
  output: "export",
  distDir: "out",

  // Desactivar la generación estática incremental
  staticPageGenerationTimeout: 120,
}

module.exports = nextConfig

