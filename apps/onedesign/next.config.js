/** @type {import('next').NextConfig} */
const nextConfig = {
  // @onegroup/shared ships raw TypeScript; the app compiles it.
  transpilePackages: ['@onegroup/shared'],
};

module.exports = nextConfig;
