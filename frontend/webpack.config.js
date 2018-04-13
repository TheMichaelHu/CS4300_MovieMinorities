const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './src/app.js',
    output: {
      path: path.resolve(__dirname, '../app/static'),
      publicPath: '/static/',
      filename: 'js/bundle.js'
    },
    devServer: {
      historyApiFallback: true,
      proxy: {
        '*': 'http://localhost:5000'
      }
    },
    module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader"
            }, {
              loader: "css-loader"
            }, {
              loader: "sass-loader"
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    }
};
module.exports = config;
