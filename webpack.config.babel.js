import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
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
              options: { paths: 'app' },
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
      filename: '[name].css',
      allChunks: true,
      disable: true
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        console.log(message);
      },
      minify: false, // minify and uglify the script
      navigateFallback: 'build/index.html',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    })
  ],
  devServer: {
    port: 8081,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  }
});
