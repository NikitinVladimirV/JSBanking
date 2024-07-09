const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
  const isDev = env.mode === "development";

  return {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.js"),
    output: {
      path: path.resolve(__dirname, "build"),
      filename: isDev ? "bundle.js" : "bundle.[contenthash:8].js",
      clean: true,
    },
    devServer: isDev && {
      port: env.port ?? 4000,
      open: true,
    },
    devtool: isDev && "inline-source-map",
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      !isDev &&
        new MiniCssExtractPlugin({
          filename: "styles/[name].[contenthash:8].css",
        }),
    ],
    module: {
      rules: [
        {
          test: /\.(s[ac]ss|css)$/i,
          use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "fonts/[name].[contenthash:8].[ext]",
          },
        },
      ],
    },
  };
};
