/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'bafybeihu3veecxn5bscv3jrenittgviqkbe4epek6poggozbbdsx2vm6jy.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
