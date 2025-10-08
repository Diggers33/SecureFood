// next.config.js
const isProd = process.env.NODE_ENV === 'production';
const repo = 'SecureFood'; // exact repo name and casing

module.exports = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repo}` : '',   // <—
  },
};

