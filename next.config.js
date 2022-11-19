/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "malon.my.id",
        port: "8888",
        pathname: "/**",
      },
    ],
    domains: ["malon.my.id"],
  },
};

module.exports = nextConfig;
