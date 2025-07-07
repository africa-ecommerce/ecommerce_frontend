module.exports = {
  siteUrl: 'https://www.pluggn.com.ng',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: 'daily',
      priority: path === '/' ? 1.0 : 0.7,  // Set homepage priority higher
      lastmod: new Date().toISOString(),
    };
  },
};
