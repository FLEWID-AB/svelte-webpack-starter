const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BabelMultiTargetPlugin = require('webpack-babel-multi-target-plugin').BabelMultiTargetPlugin
const NamedLazyChunksPlugin =  require('webpack-babel-multi-target-plugin').NamedLazyChunksPlugin
const WebpackPwaManifest = require('webpack-pwa-manifest')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// Register Workbox service worker
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = (env, argv) => {
  const mode = argv.mode
  const dev = mode == 'development'
  return {
    mode: mode,
    devServer: {
      port: 3001,
      historyApiFallback: true
    },
    entry: {
      app: ['./src/main.js']
    },
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'dist'),
      filename: dev ? '[name].js' : '[name].[chunkhash].js'
    },
    module: {    
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: BabelMultiTargetPlugin.loader()
        },
        {
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: [
            BabelMultiTargetPlugin.loader(),
            {
              loader: 'svelte-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader'
          }
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            dev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: dev ? 'images/[name].[ext]' : 'images/[name][hash].[ext]'
              }
            }
          ]
        }
      ]    
    },
    plugins: [
      new CleanWebpackPlugin(),
      new BabelMultiTargetPlugin(),
      new NamedLazyChunksPlugin(), 
         
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve('./public/index.html'),
        favicon: path.resolve('./public/favicon.ico'),
        meta: {
          'theme-color': '#fc401d'
        }
      }),
      new WebpackPwaManifest({
        name: 'Svelte Starter',
        description: 'Starter Package for Svelte applications',
        background_color: '#ffffff',
        start_url: '/',
        theme_color: '#fc401d',
        inject: true,
        icons: [
          {
            src: path.resolve('./src/assets/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: 'icons'
          }
        ]
      }),  
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
      }),
      
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true
      })
    ],
    resolve: {
      mainFields: [
        'es2015',
        'module',
        'main',
      ],
      extensions: [ '.mjs', '.js', '.svelte', '.html'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
}