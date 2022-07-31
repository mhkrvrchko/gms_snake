const path = require('path'), 
      { merge } = require('webpack-merge');

const base = require('./webpack.base');

module.exports = merge(base, {
    mode: "development",
    output: {
        filename: "game.bundle.js"
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        hot: true
    },
});