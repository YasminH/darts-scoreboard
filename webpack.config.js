//http://jmfurlott.com/tutorial-setting-up-a-single-page-react-web-app-with-react-router-and-webpack/

var webpack = require('webpack');
module.exports = {
    entry: [
      'webpack/hot/dev-server',
      "./app/js/entry.js"
    ],
    output: {
        path: __dirname + '/app/js',
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            { test: /\.css$/, loader: "style!css" },
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['react']} }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]

};
