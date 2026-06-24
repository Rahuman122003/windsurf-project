/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/insights",
        destination: "https://blogsbyprobiz.vercel.app/blyn-tech/blogs",
        permanent: true,
      },
    ];
  },
};
module.exports = nextConfig;
