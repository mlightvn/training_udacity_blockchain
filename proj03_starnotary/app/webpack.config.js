const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    // entry: "./src/index.js",
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new CopyWebpackPlugin([{ from: "./src/favicon.ico", to: "favicon.ico" }]),
        new CopyWebpackPlugin([{ from: "./src/snackbar.min.css", to: "snackbar.min.css" }]),
        new CopyWebpackPlugin([{ from: "./src/index.html", to: "index.html" }]),
        new CopyWebpackPlugin([{ from: "./src/jIndex.js", to: "jIndex.js" }]),
    ],
    devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
