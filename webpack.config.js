const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: [['es2016'], ['react']]
      }
    }, {
      test: /\.less$/,
      loaders: [
        'style-loader',
        'css-loader',
        'less-loader'
       ],
      include: path.join(__dirname, 'src')
    }]
  },
  devServer: {
    contentBase: './dist',
    proxy: {
      '/nhttp-bind/': {
        target: 'http://collab.reutest.com'
      }
    }
  },
  devtool: 'eval-source-map'
};
