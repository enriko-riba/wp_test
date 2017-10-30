
import * as webpack from 'webpack';

interface Config extends webpack.Configuration {
    module: {
        rules: webpack.NewUseRule[]
    }
}
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const env = require('yargs').argv.env;

let plugins: Array<webpack.Plugin> = [
                                      new CleanWebpackPlugin(['dist']), 
                                      new HtmlWebpackPlugin({ template: './src/index.html', inject: true }), 
                                      new ExtractTextPlugin('style.css'),
                                      new CommonsChunkPlugin({names:["common", "wp_stuff"]})
                                    ];
if(env==='build'){
    plugins.push( new UglifyJSPlugin({ parallel: true, sourceMap: true }))
}

const config : Config = {
    entry: {
        common: ["jquery"], // vendor libraries bundle
        main: "./src/main.ts",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: '[name].js'
        filename: "[name].[id].js",
		chunkFilename: "[id].js"
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
                test: /\.css$/,
                use: 'style-loader'
            },
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
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    }
}

module.exports = config;