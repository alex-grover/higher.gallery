import { fileURLToPath } from 'node:url'
import createJiti from 'jiti'

const jiti = createJiti(fileURLToPath(import.meta.url))
jiti('./src/env')

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

export default nextConfig
