// GET_PASSES_THIS_REPO_UDACITY_PLEASE
const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
// const StartServerPlugin = require('start-server-webpack-plugin')
const StartServerPlugin = require('start-server-nestjs-webpack-plugin');

module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        './src/server/index'
    ],
    watch: true,
    target: 'node',
    externals: [
        nodeExternals({
            allowlist: ['webpack/hot/poll?1000']
        })
    ],
    module: {
        rules: [{
            test: /\.js?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    optimization: {
        moduleIds: 'named',
    },
    plugins: [
        // new StartServerPlugin('server.js'),
        new StartServerPlugin({name: 'server.js'}),
        // new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('server')
            }
        }),
    ],
    output: {
        path: path.join(__dirname, 'prod/server'),
        filename: 'server.js'
    }
}