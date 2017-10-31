import * as webpack from 'webpack';

interface Config extends webpack.Configuration {
    module: {
        rules: webpack.NewUseRule[]
    }
}

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const ProvidePlugin = require("webpack/lib/ProvidePlugin");
const env = require('yargs').argv.env;

let plugins: Array<webpack.Plugin> = [
                                      new CleanWebpackPlugin(['dist']), 
                                      new CopyWebpackPlugin([{from: 'src/assets/**/*.png', to:'assets/[name].[ext]'}]),
                                      new CopyWebpackPlugin([{from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to:'[name].[ext]'}]),
                                      new CopyWebpackPlugin([{from: 'node_modules/bootstrap/fonts', to:'fonts/[name].[ext]'}]),
                                      new HtmlWebpackPlugin({ template: './src/index.html'}), 
                                      new ExtractTextPlugin('style.css'),
                                      new CommonsChunkPlugin({names:["common", "wp_stuff"]}),
                                      new ProvidePlugin({jQuery: 'jquery',$: 'jquery', jquery: 'jquery', ko: 'knockout'}),
                                    ];
if(env==='build'){
    plugins.push( new UglifyJSPlugin({ parallel: true, sourceMap: true }))
}

const config : Config = {
    entry: {
        common: ["jquery", "bootstrap", "knockout"], // vendor libraries bundle
        main: "./src/main.ts",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].[hash:6].js",
		chunkFilename: "[hash:6].js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".css", ".sccs"]
    },
    plugins: plugins,
    module: {
        rules: [            
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.js$/,
                use: "source-map-loader"
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$/,
                use: "file-loader"
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                use: "file-loader?name=assets/[hash:6].[ext]"
            },
            {
                test: /\.(scss|css)$/i,
                exclude: /node_modules/,
                // use: [ 
                //     {loader: "style-loader"}, 
                //     {loader: 'css-loader', options: {sourceMap: true}}, 
                //     {loader: 'sass-loader', options: {sourceMap: true}},
                // ]
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {   //  for ko html templates
                test: /\.html$/,
                use: 'raw-loader'
              }
        ]
    }
}

module.exports = config;