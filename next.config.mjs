
let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Use redirects() for permanent redirects with status codes
    return [
      {
        source: "/:path*",
        has: [{
          type: "host",
          value: "pluggn.store",
        }],
        destination: `${process.env.APP_URL}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{
          type: "host",
          value: "www.pluggn.store",
        }],
        destination:  `${process.env.APP_URL}/:path*`,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.pluggn.com.ng";
    console.log(`Using BACKEND_URL: ${backendUrl}`);
    
    return [
      // ✅ Handle share link redirects
      {
        source: "/:slug([A-Za-z0-9]{7})",
        has: [
          {
            type: "query",
            key: "m",
          },
        ],
        destination: `${backendUrl}/links/:slug?m=:m`,
      },
      // Handle routes that don't start with /api/og
      {
        source: "/api/og/:path*",
        // point back to itself so Next.js will serve your OG handler
        destination: "/api/og/:path*",
      },
      // 2. Then proxy _all other_ /api/* to your backend
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Set environment variables with fallbacks to prevent undefined issues
  env: {
    BACKEND_URL: process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.pluggn.com.ng",
    APP_URL: process.env.APP_URL || process.env.VERCEL_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.pluggn.com.ng",
  }
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig










