/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: 'https://cdn.jsdelivr.net/gh/nemakore/msbtescholar2@main/out',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'api.dicebear.com'],
  },
};

export default nextConfig;

