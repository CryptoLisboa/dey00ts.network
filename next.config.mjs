import {withSentryConfig} from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image-resizing.degods.workers.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'bafybeidz4pvfdd6yyu4mx3xwfo2imxfjtwc3vugmcrgfeq5u7skgj36moy.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
      // {
      //   protocol: 'https',
      //   hostname:
      //     'bafybeihu3veecxn5bscv3jrenittgviqkbe4epek6poggozbbdsx2vm6jy.ipfs.dweb.link',
      //   port: '',
      //   pathname: '/**',
      // },
      {
        protocol: 'https',
        hostname:
          'bafybeicpzukcczpybmfmlncstxoezyhgtx3thhfmgbzvrp43o6bdnaspum.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'bafybeihnbn4zgm27jputfhxlbtlyain3k3kdfv6dnu37tb473zoowwdb6a.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'bafybeigntq74czaglmytesw5u5bgqiuhghuzwxpyn2igijqy5vbzanpqbm.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'bafybeid3pam53yhwk67lku4kwizslyxkzqhyd5ddie4hwknlfmflvcdb34.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'bafybeihrzkh3bnp2n53xr77csfyj6uyyud7cie43oworzvs55343aavdpy.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'bafybeifa35pzmciwbxy6oqsk2rjjyojk2xzkbew5shbs5a3pnqugx6zxm4.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'bafybeihnydqqpaeenlfvsntyy2y26ujpohrlmzqftksc5n7cqmdxysa2vi.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'bafybeigim6kdmzlme4ai6hzfrhn3uymzuzsg4osjs5lfltifwhpqbew4im.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname:
          'bafybeib5zumzk2tzxn3pbixrp622xsqxvkpxlo5uvrjlrectpicsac2qvy.ipfs.dweb.link',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "lisbon-labs",
project: "javascript-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});