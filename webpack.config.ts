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

const isProd = (env === 'build');

let plugins: Array<webpack.Plugin> = [
                                      new CleanWebpackPlugin(['dist']), 
                                      new CopyWebpackPlugin([{from: 'src/assets/**/*.png', to:'assets/[name].[ext]'}]),
                                      new CopyWebpackPlugin([{from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to:'[name].[ext]'}]),
                                      new CopyWebpackPlugin([{from: 'node_modules/bootstrap/fonts', to:'fonts/[name].[ext]'}]),
                                      new HtmlWebpackPlugin({ template: './src/index.html',
                                                            production: isProd, 
                                                            minify: {
                                                                collapseWhitespace: true,
                                                                collapseInlineTagWhitespace: true,
                                                                removeComments: true,
                                                                removeRedundantAttributes: true
                                                            }}), 
                                      new ExtractTextPlugin({filename: "bundle.css", disable: false, allChunks: true}),
                                      new CommonsChunkPlugin({names:["common", "runtime"]}),
                                      new ProvidePlugin({jQuery: 'jquery',$: 'jquery', jquery: 'jquery', ko: 'knockout'}),
                                    ];
if(isProd){
    plugins.push( new UglifyJSPlugin({
        parallel: true, 
        sourceMap: true,
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
          },
          output: {
            comments: false
          },
    }));
} else {
    const hot = require('webpack/lib/HotModuleReplacementPlugin');
    const nmp = require('webpack/lib/NamedModulesPlugin');
    plugins.push(
         new hot(),
         new nmp()
    );
}

const config : Config = {
    entry: {
        common: ["jquery", "bootstrap", "knockout"], // vendor libraries bundle
        main: "./src/main.ts",
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: isProd ? '[name].[chunkhash].js' : '[name].[hash].js'
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: isProd ? false: "cheap-module-source-map",

    //  will be passed to webpack-dev-server (only if dev server is used)
    devServer: {
        contentBase: './client',
        historyApiFallback: true,
        port: 3000,
        hot: true,
        compress: isProd,
        stats: { colors: true },
      },

    resolve: {
        extensions: [".ts", ".js", ".css", ".sccs"]
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
                test:  /\.scss$/,
                //exclude: /node_modules/,
                // use: [ 
                //     {loader: "style-loader"}, 
                //     {loader: 'css-loader', options: {sourceMap: true}}, 
                //     {loader: 'sass-loader', options: {sourceMap: true}},
                // ]
                use: isProd ?   ExtractTextPlugin.extract({
                                    fallback: "style-loader",
                                    use: ['css-loader', 'sass-loader']
                                })
                                : ['style-loader', 'css-loader', 'sass-loader']
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