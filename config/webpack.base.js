const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../src/core/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist/')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html')
        })
    ]
}