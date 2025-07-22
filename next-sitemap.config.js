



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
