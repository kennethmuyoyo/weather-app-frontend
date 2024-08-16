/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['openweathermap.org'],
    },
    env: {
      NEXT_PUBLIC_LARAVEL_API_URL: process.env.NEXT_PUBLIC_LARAVEL_API_URL,
    },
  }
  
export default nextConfig;
