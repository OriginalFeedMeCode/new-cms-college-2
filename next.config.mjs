/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "internationalschooling.org",
      },
      {
        protocol: "https",
        hostname: "ischat.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
