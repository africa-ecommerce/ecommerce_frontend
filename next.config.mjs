// let userConfig = undefined
// try {
//   userConfig = await import('./v0-user-next.config')
// } catch (e) {
//   // ignore error
// }

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*", // Match all /api requests
//         destination: `${process.env.BACKEND_URL}/:path*`, // Forward to backend using env variable
//       },
//     ];
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
//   experimental: {
//     webpackBuildWorker: true,
//     parallelServerBuildTraces: true,
//     parallelServerCompiles: true,
//   },
//   env: {
//     BACKEND_URL: process.env.BACKEND_URL,
//     APP_URL: process.env.APP_URL,
//     NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL, // Add this to make it accessible in the browser
//   }
// }

// mergeConfig(nextConfig, userConfig)

// function mergeConfig(nextConfig, userConfig) {
//   if (!userConfig) {
//     return
//   }

//   for (const key in userConfig) {
//     if (
//       typeof nextConfig[key] === 'object' &&
//       !Array.isArray(nextConfig[key])
//     ) {
//       nextConfig[key] = {
//         ...nextConfig[key],
//         ...userConfig[key],
//       }
//     } else {
//       nextConfig[key] = userConfig[key]
//     }
//   }
// }

// export default nextConfig


let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Handle routes that don't start with /api/og
     {
        source: "/api/og/:path*",
        // point back to itself so Next.js will serve your OG handler
        destination: "/api/og/:path*",
      },
      // 2. Then proxy _all other_ /api/* to your backend
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/:path*`,
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
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.BACKEND_URL,
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