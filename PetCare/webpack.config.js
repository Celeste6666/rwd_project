const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    home: './src/js/index.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'js/[name]_[contenthash:5].js',
    clean: true,
  },
  plugins: [
    // 處理 HTML
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'home.html',
    }),
    // 單獨輸出 CSS
    new MiniCssExtractPlugin({
      linkType: 'text/css',
      filename: 'css/[name]_[contenthash:5].css',
    }),
    // ESLint
    new ESLintWebpackPlugin({
      fix: true,
    }),
  ],
  module: {
    rules: [
      // 處理 CSS
      {
        test: /\.s?css$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env',
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      // 處理圖片
      {
        test: /\.(ico|png|jpg|gif)$/,
        type: 'asset',
        generator: {
          filename: 'asset/[hash:5][ext]',
        },
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      // 處理 font awesome
      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash:5][ext][query]',
        },
      },
      // 處理 JS
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          type: 'css/mini-extract',
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              'imagemin-gifsicle',
              'imagemin-mozjpeg',
              'imagemin-pngquant',
              'imagemin-svgo',
            ],
          },
        },
      }),
    ],
  },
  devtool: devMode ? 'eval-cheap-module-source-map' : 'nosources-source-map',
  devServer: {
    static: './dist',
    compress: true,
    open: true,
    port: 5000,
    client: {
      logging: 'none',
      overlay: false,
    },
    hot: true,
  },
  resolve: {
    alias: {
      '@': `${__dirname}/src`,
      '~': resolve(__dirname, '../node_modules/'),
    },
    extensions: ['.js', '.json', '.scss'],
    modules: [
      resolve(__dirname, '../node_modules'),
      'node_modules',
    ],
  },
};
