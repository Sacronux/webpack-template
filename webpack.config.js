const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: './[name].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {sourceMap: true}
        }, {
          loader: 'postcss-loader',
          options: {sourceMap: true, config: {path: 'src/js/postcss.config.js'}}
        }, {
          loader: 'sass-loader',
          options: {sourceMap: true}
        }
      ]
      
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
      }, 
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {sourceMap: true}
        }, {
          loader: 'postcss-loader',
          options: {sourceMap: true, config: {path: 'src/js/postcss.config.js'}}
        }
      ]
      
    }]
  
  },
  devServer: {
    overlay: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin([
      { from: PATHS.src + '/img', to: `img` },
      { from: PATHS.src + '/static' },
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      template: './src/index.html',
      filename: 'index.html',
    })
  ]
}