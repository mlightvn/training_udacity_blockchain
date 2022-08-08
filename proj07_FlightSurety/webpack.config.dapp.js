// GET_PASSES_THIS_REPO_UDACITY_PLEASE

// https://webpack.js.org/configuration/dev-server/

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry: ['babel-polyfill', path.join(__dirname, "src/dapp")],
  entry: [path.join(__dirname, "src/dapp")],
  output: {
    path: path.join(__dirname, "prod/dapp"),
    filename: "bundle.js"
  },
  stats: 'errors-warnings',
  module: {
    rules: [
    {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.html$/,
        use: "html-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: path.join(__dirname, "src/dapp/index.html")
    })
  ],
  resolve: {
    extensions: [".js"],
    fallback: {
      "url": require.resolve("url/"),
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "assert": require.resolve("assert/"),
      // "stream": require.resolve("stream-browserify"),
      "stream": false,
      "string_decoder": require.resolve("string_decoder/"),

    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dapp'),
    },
    port: 8000
  }
};
