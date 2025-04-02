
const nextConfig = {
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  devIndicators: {
    autoPrerender: false,
  },
  basePath: "",
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "petserviceconnect.com",
      },
      {
        protocol: "https",
        hostname: "content.petbacker.com",
        port: "",
        pathname: "/images/cms/icons/service-type/**",
      },
    ],
  },
};

export default nextConfig;
