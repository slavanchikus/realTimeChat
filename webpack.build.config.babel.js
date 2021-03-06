import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

export default () => ({
  entry: {
    app: ['babel-polyfill', './app/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'build/assets'),
    publicPath: '/assets/',
    filename: 'bundle.js',
    chunkFilename: '[id].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.module\.styl$/,
        exclude: /node_modules\/*/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[local]__[path][name]__[hash:base64:5]',
                modules: true,
                importLoaders: 2,
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'stylus-loader',
              options: { paths: 'apps' },
            },
          ],
        })
      },
      {
        test: /\.jsx$|\.js$/,
        exclude: /node_modules\/*/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              presets: [
                                    ['env', { modules: false }],
                'react',
                'stage-0'
              ],
              plugins: ['react-hot-loader/babel']
            }
          }
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.eot$|\.otf$|\.ttf$/,
        loader: 'file-loader?name=static/[hash].[ext]',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true,
      disable: false
    }),
    new UglifyJsPlugin({
      sourceMap: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: 'build/index.htm',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    })
  ],
});
