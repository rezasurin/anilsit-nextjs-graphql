
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
      }),
    )

    config.module.rules.push(
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './src/assets/images/'
            }
          }
        ]
      }
    )
    
    return config
  },
  pwa: {
    dest: 'public',
    runtimeCaching
  },
  images: {
    disableStaticImages: true
  }
}

module.exports = process.env.NODE_ENV === 'development' ?  nextConfig : withPWA(nextConfig)
