
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const nextConfig = {
  webpack: (config, {buildId, dev, isServer, defaultLoaders, nextRuntime, webpack}) => {
    // console.log(defaultLoaders, isServer, nextRuntime, "<< DEFAULT LOADER")
    
    
    config.optimization.minimize = true
    config.optimization.minimizer.push(
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cleanCssMinify,
        // Uncomment this line for options
        // minimizerOptions: { compatibility: 'ie11,-properties.merging' },
      }),
    )
    
    return config
  },
  pwa: {
    dest: 'public',
    runtimeCaching
  }
}

module.exports = process.env.NODE_ENV === 'development' ?  nextConfig : withPWA(nextConfig)
