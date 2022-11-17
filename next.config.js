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
  },
};

module.exports = nextConfig;
