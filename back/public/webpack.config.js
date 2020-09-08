
module.exports = {
    entry: './view/index.js',

    output: {
      filename: 'bundle.js',
    },
    module: {
      rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ]
    },
    devtool: 'eval-source-map',
    performance: { hints: false },
    mode: "development"
  }