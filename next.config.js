/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["malon.my.id"],
  },
};

module.exports = nextConfig;
