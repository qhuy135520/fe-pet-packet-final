/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: '"petserviceconnect.com"',
      },
      {
        protocol: 'https',
        hostname: 'content.petbacker.com',
        port: '',
        pathname: '/images/cms/icons/service-type/**',
      },
    ],
  },
};

export default nextConfig;
