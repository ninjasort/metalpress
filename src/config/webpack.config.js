import path from 'path';
import BowerWebpackPlugin from 'bower-webpack-plugin';

export default {
  entry: path.resolve(__dirname, './src/assets/js/index.js'),
  output: {
    path: path.resolve(__dirname, './dist/assets/js'),
    filename: 'bundle.js'
  },
  cache: false,
  debug: true,
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { 
        test: /\.js$/, 
        exclude: /(node_modules|src\/lib|src\/assets\/js\/lib)/,
        loader: 'babel'
      }
    ]
  },
  resolveLoader: {
    root: path.join(__dirname, '../../node_modules')
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    new BowerWebpackPlugin({
      modulesDirectories: ['src/lib'],
      manifestFiles: 'bower.json'
    })
  ]
}