/** @type {import('next').NextConfig} */
const nextConfig = {
  // @onegroup/shared ships raw TypeScript; the app compiler transpiles it.
  transpilePackages: ['@onegroup/shared'],
  reactStrictMode: true,
};

module.exports = nextConfig;
