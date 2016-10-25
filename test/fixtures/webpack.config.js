var path = require('path');

module.exports = {
  entry: './entry',
  output: {
    path: path.resolve(__dirname, './dist/assets/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: []
  }
};