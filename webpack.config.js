const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  var config = {
    mode: "development",
    entry: {
      bundle: path.resolve(__dirname, "src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name][contenthash].js",
      clean: true,
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, "dist"),
      },
      port: 3000,
      open: true,
      hot: true,
      compress: true,
      historyApiFallback: true,
      watchFiles: ["index.html"],
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          use: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [
            argv.mode === "production"
              ? MiniCssExtractPlugin.loader
              : "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            minimize: true,
          },
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
      }),
    ],
  };

  if (argv.mode === "production") {
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: "[name][contenthash].css",
      })
    );
  }

  return config;
};
