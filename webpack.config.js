const path = require("path");

module.exports = {
  entry: {
    client: "./src/client.js",
    admin: "./src/panel.js"
  },
  output: {
    path: path.resolve(__dirname, "public/assets/js"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};
