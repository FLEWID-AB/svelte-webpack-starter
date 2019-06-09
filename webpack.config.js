const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
      path: __dirname + '/dist',
      filename: '[name]'.js,
      chunkFilename: '[name].[id].js',
      publicPath: '/'
    },
    module: {    
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.svelte$/,
          exclude: /node_modules/,
          use: 'svelte-loader'
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
      extensions: [ '.mjs', '.js', '.svelte', '.html'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  }
}