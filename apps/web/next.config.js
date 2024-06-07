import { fileURLToPath } from 'node:url'
import createJiti from 'jiti'

const jiti = createJiti(fileURLToPath(import.meta.url))
jiti('./src/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pink-worldwide-orangutan-81.mypinata.cloud',
        port: '',
        pathname: '/ipfs/**',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

export default nextConfig
