/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false
  },
  webpack: config => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
      generator: {
        filename: 'static/wasm/[name].[hash].wasm'
      }
    })

    return config
  }
}
