var webpack = require('webpack');
var path = require("path");
var TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function resolve(dir){
  return path.join(__dirname, '..', dir);
}

module.exports = {
  entry: {
    app: './src/main.ts',
  },
  output: {
    filename: "crawler.js",
    path: path.resolve(__dirname, './dist')
  },
  target: 'node',
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [
      new TsConfigPathsPlugin(/* { configFileName, compiler } */)
    ]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
    ]
  }
}