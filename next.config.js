// next.config.js
const isProd = process.env.NODE_ENV === 'production';
const repo = 'SecureFood'; // your repo name

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  trailingSlash: true, // <--- add this
};
