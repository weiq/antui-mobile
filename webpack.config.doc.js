let webpack = require('webpack');
let path = require('path');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let pxtorem = require('postcss-pxtorem');

const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, ''),  // 1. 属于 antd-mobile 内置 svg 文件
  path.resolve(__dirname, 'src/style/icon/svg'),  // 2. 自己私人的 svg 存放目录
];

module.exports = {
  context: path.join(__dirname, 'docs'),
  entry: {
    js: ['babel-polyfill', './app.js'],
    vendor: ['react', 'classnames', 'react-router', 'react-dom', 'react-addons-css-transition-group']
  },
  output: {
    path: path.resolve(__dirname, 'dist/docs'),
    filename: './bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    disableHostCheck: true,
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, exclude: /node_modules/, loader: 'babel', query: { cacheDirectory: true } }, 
      { test: /\.less$/, loader: 'style!css!postcss!less' }, 
      { test: /\.css/, loader: 'style!css!postcss' }, 
      { test: /\.(png|jpg|svg)$/, loader: 'url?limit=25000', exclude: /node_modules/ }, 
      { test: /\.json$/, loader: 'json' },
      { test: /\.woff(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
      { test: /\.ttf(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml', include: path.join(__dirname, 'src/style/fonts') },
      { test: /\.(svg)$/i, loader: 'svg-sprite', include: svgDirs }
    ]
  },
  postcss: () => [autoprefixer, pxtorem({
    rootValue: 100,
    propWhiteList: [],
    selectorBlackList: ['antui']
  })],
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: process.env.NODE_ENV !== 'production'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'docs/index.html'),
      favicon: path.join(__dirname, 'docs/favicon.ico'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    }),
  ]
};