var path = require('path')


module.exports = {

  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module:{
    loaders: [
      { test: /\.html$/, loader: 'html-loader'},
      { test: /\.(jpg|png)$/, loader: 'image-webpack-loader!url-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.js$/, loader: 'babel-loader', query: {"presets": ["es2015"]} }
    ]
  }





}
