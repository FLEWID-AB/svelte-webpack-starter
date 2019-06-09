const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BabelMultiTargetPlugin = require('webpack-babel-multi-target-plugin').BabelMultiTargetPlugin
const NamedLazyChunksPlugin =  require('webpack-babel-multi-target-plugin').NamedLazyChunksPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
      publicPath: '/'
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
        }
      ]    
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new BabelMultiTargetPlugin(),
      new NamedLazyChunksPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve('./public/index.html')
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css'
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