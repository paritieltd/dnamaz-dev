/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });
// module.exports = withBundleAnalyzer({});

module.exports = {
  nextConfig,
  optimizeFonts: true,
  compress: true,
  // withBundleAnalyzer: require('@next/bundle-analyzer')({
  //   enabled: process.env.ANALYZE === 'true',
  // }),
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // webpack: (config) => {
  //   console.log(config); // Debugging Webpack config
  //   return config;
  // },
};
