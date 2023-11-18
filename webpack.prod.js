const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  output: {
    clean: true,
  },
  mode: "production",
  // devtool: 'source-map',
});
