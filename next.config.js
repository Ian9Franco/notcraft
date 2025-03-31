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
    // Solución para el problema de Firebase con Next.js
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

    // Fix for Three.js and undici
    config.module.rules.unshift({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    })

    // Exclude undici from being processed by Next.js
    config.module.rules.push({
      test: /node_modules\/undici\/.*\.js$/,
      use: ["next-swc-loader"],
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    })

    // Transpile the modules that need it
    config.module.rules.push({
      test: /node_modules\/(firebase|@firebase|three)\/.*\.js$/,
      use: ["next-swc-loader"],
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    })

    return config
  },
  // Add experimental flag to handle modern JavaScript features
  experimental: {
    serverComponentsExternalPackages: ["undici"],
  },
  transpilePackages: ["firebase", "@firebase", "three"],
}

module.exports = nextConfig

