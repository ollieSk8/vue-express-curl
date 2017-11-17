const webpack = require('webpack');
const path = require('path');
module.exports ={
    entry:{
        curl:'./src/js/curl.js'
    },
    resolve:{
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.vue','.js','.scss','.css']
    },
    output: {
        path: path.join(__dirname,'public/js'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/,loader: "style-loader!css-loader" },
            { test: /\.scss$/,loader: "style-loader!css-loader!sass-loader" },
            {test: /\.vue$/,loader: 'vue-loader'},
            { test: /\.(png|jpg|gif)$/,loader: 'file-loader?limit=8192&name=[name].[ext]?[hash]'}
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    devtool: "source-map",
    watch:true
};