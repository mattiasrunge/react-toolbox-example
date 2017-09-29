const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractTextStylesPlugin = new ExtractTextPlugin('style.css');

const settings = {
    entry: {
        bundle: [
            'babel-polyfill',
            './src/frontend/index.js'
        ]
    },
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: path.resolve('build')
    },
    resolve: {
        extensions: ['.js', '.json', '.css']
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [ 'es2015', { modules: false } ],
                        'stage-1',
                        'react'
                    ],
                    plugins: [
                        'jsx-control-statements',
                        [ 'babel-plugin-transform-async-to-module-method', {
                            module: 'bluebird',
                            method: 'coroutine'
                        } ]
                    ]
                }
            },
            {
                test: /\.css$/,
                use: extractTextStylesPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 1,
                                localIdentName: '[name]--[local]--[hash:base64:8]'
                            }
                        },
                        'postcss-loader'
                    ]
                })
            }
        ]
    },
    devServer: {
        contentBase: path.resolve('src/www'),
        publicPath: 'http://localhost:8080/', // full URL is necessary for Hot Module Replacement if additional path will be added.
        quiet: false,
        historyApiFallback: true,
        inline: true
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        extractTextStylesPlugin
    ]
};

module.exports = settings;
