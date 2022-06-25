
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
  }
}

module.exports = nextConfig
