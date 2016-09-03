import path from 'path';

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
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.js$/, 
        exclude: /(node_modules|src\/lib|src\/assets\/js\/lib)/,
        loader: 'babel'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
    ]
  },

  resolveLoader: {
    root: path.join(__dirname, '../../node_modules')
  }
}