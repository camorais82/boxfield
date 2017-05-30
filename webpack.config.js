const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./src/scripts/boxfield.js",
  output: {
    path: path.join(__dirname),
    filename: "bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devtool: "source-maps",
};
