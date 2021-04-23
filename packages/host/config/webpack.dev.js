/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable unicorn/prevent-abbreviations */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const { paths } = require("../../../configs/webpack")(__dirname);

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    historyApiFallback: true,
    contentBase: paths.public,
    open: true,
    compress: true,
    hot: true,
    watchContentBase: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [],
});
