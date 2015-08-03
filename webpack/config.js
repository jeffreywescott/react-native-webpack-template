var
  fs = require('fs'),
  os = require('os'),
  path = require('path'),
  webpack = require('webpack')

var config = {
  debug: true,

  devtool: 'source-map',

  entry: {
    'index.ios': [path.resolve(__dirname, '..', 'src', 'app.js')]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '..', 'src'),
          // ordinarily, we'd exclude node_modules, but react-native-side-menu
          // is written with ES6-isms ...
          path.resolve(__dirname, '..', 'node_modules/react-native'),
          path.resolve(__dirname, '..', 'node_modules/react-native-side-menu'),
          path.resolve(__dirname, '..', 'node_modules/react-native-icons')
        ],
        loaders: ['babel']
      },
    ],
  },

  plugins: [],

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}

// Hot loader
if (process.env.HOT) {

  var hostname = 'localhost'  // or use os.hostname() and edit the npm scripts in package.json
  config.devtool = 'eval'; // Speed up incremental builds
  config.entry['index.ios'].unshift(path.resolve(__dirname, '..', 'webpack', 'hot', 'entry'))
  config.entry['index.ios'].unshift('webpack/hot/only-dev-server')
  config.entry['index.ios'].unshift('webpack-dev-server/client?http://'+hostname+':8082')
  config.output.publicPath = 'http://'+hostname+':8082/'
  config.module.loaders[0].loaders.unshift('react-hot')
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
}

// Production config
if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin())
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config
