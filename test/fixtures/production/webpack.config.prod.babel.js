import path from 'path';
import webpack from 'webpack';
import BowerWebpackPlugin from 'bower-webpack-plugin';

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
          presets: ['es2015']
        }
      }
    ]
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    new BowerWebpackPlugin({
      modulesDirectories: ['src/lib'],
      manifestFiles: 'bower.json'
    }),
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
  ],
  devServer: {
    quiet: true,
    noInfo: true
  }
};