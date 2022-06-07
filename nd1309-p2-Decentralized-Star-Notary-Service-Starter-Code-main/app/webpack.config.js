const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    mode: 'development',
    resolve:{
        extensions:['.js','.jsx'],
        symlinks: false,
    },
    entry: './src/index.js',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        // Ref: https://webpack.js.org/plugins/copy-webpack-plugin/
        new CopyPlugin({
            patterns: [
                { from: "./src/index.html", to: "index.html" }
            ]
        }),
        // https://www.npmjs.com/package/node-polyfill-webpack-plugin
        // new NodePolyfillPlugin(),
    ],

    // Ref: https://webpack.js.org/configuration/dev-server/
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
    },

    // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    //     config.resolve.alias.https = "https-browserify";
    //     config.resolve.alias.http = "http-browserify";
    //     return config;
    // },
};
