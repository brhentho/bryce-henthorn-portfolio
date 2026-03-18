/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: {
      root: '/vercel/share/v0-project',
    },
  },
}

export default nextConfig
