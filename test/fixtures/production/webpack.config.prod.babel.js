import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: path.resolve(__dirname, './src/assets/js/index.js'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist/assets/js'),
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /(node_modules|src\/lib|src\/assets\/js\/lib)/, 
        loader: 'babel',
        query: {
          presets: ['latest']
        }
      }
    ]
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]
};