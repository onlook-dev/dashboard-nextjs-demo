const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: [['@onlook/nextjs', { projectRoot: path.resolve('.') }]]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh'
      }
    ]
  }
};

module.exports = nextConfig;
