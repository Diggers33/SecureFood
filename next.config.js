// next.config.js
const isProd = process.env.NODE_ENV === 'production';
const repo = 'securefood-digital-twin'; // <= your repo name

module.exports = {
  output: 'export',              // enables `next export`
  images: { unoptimized: true }, // Pages has no image optimizer
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  // trailingSlash: true, // uncomment if you hit 404s with static hosting
};
