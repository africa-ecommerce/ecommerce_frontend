// module.exports = {
//   siteUrl: 'https://www.pluggn.com.ng',
//   generateRobotsTxt: true,
//   sitemapSize: 5000,
//   transform: async (config, path) => {
//     return {
//       loc: path,
//       changefreq: 'daily',
//       priority: path === '/' ? 1.0 : 0.7,  // Set homepage priority higher
//       lastmod: new Date().toISOString(),
//     };
//   },
// };



// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: 'https://www.pluggn.com.ng', // This tells the generator what your base URL is
//   generateRobotsTxt: true, // This enables automatic robots.txt generation
//   sitemapSize: 5000,
//   exclude: ['/auth/*', '/terms', '/privacy',  "/onboarding", "/checkout", "/product", "/order-error", "/thank-you", "/subdomain-error", "/track-order"], // Exclude unwanted pages
//   robotsTxtOptions: {
//     policies: [
//       {
//         userAgent: '*',
//         disallow: ['/auth/', '/terms', '/privacy', "/onboarding", "/checkout", "/product", "/order-error", "/thank-you", "/subdomain-error", "/track-order"],
//         allow: '/', // Allow everything else
//       },
//     ],
   
//   },
//   transform: async (config, path) => {
//     return {
//       loc: path,
//       changefreq: 'daily',
//       priority: path === '/' ? 1.0 : 0.7,
//       lastmod: new Date().toISOString(),
//     };
//   },
// };






/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.pluggn.com.ng',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [
    '/auth/*',
    '/terms',
    '/privacy',
    '/onboarding',
    '/checkout',
    '/product',
    '/order-error',
    '/thank-you',
    '/subdomain-error',
    '/track-order',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/auth/',
          '/terms',
          '/privacy',
          '/onboarding',
          '/checkout',
          '/product',
          '/order-error',
          '/thank-you',
          '/subdomain-error',
          '/track-order',
        ],
      },
    ],
    additionalSitemaps: ['https://www.pluggn.com.ng/sitemap.xml'],
    // 🛑 Disable the host line
    // Setting it to empty string or removing it altogether avoids the line
    host: '',
  },
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: path === '/' ? 1.0 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
