const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/assets/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist/')
    },
    module: {
        rules: [
          { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ],
      },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        })
    ]
}