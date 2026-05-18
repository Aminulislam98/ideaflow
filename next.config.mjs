/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    qualities: [70, 75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: "https",

        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
