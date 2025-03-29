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
  
      // EXCLUIR `undici` EN EL SERVER BUNDLE
      if (isServer) {
        config.externals.push("undici")
      }
  
      return config
    },
    // Temporarily disable static export to troubleshoot
    output: "standalone",
  }
  
  module.exports = nextConfig
  
  