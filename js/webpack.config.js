const path = require('path');
const version = require('./package.json').version;

const rules = [
    { test: /\.css$/, use: ['style-loader', 'css-loader']},
    { test: /\.(map|ts)$/, loader: 'ignore-loader' },
];

module.exports = [
    {
        entry: './lib/extension.js',
        output: {
            filename: 'extension.js',
            path: path.resolve(__dirname, '..', 'ipygraphql', 'static'),
            libraryTarget: 'amd'
        },
        mode: 'production',
    },
    {
        entry: './lib/index.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '..', 'ipygraphql', 'static'),
            libraryTarget: 'amd'
        },
        devtool: 'source-map',
        externals: ['@jupyter-widgets/base', 'lodash'],
        module: {
            rules: rules
        },
        mode: 'production',
        performance: {
            maxEntrypointSize: 1400000,
            maxAssetSize: 1400000
        },
    },
    {
        entry: './lib/embed.js',
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'amd',
            publicPath: 'https://unpkg.com/jupyter-graphql@' + version + '/dist/'
        },
        devtool: 'source-map',
        externals: ['@jupyter-widgets/base', 'lodash'],
        module: {
            rules: rules
        },
        mode: 'production',
        performance: {
            maxEntrypointSize: 1400000,
            maxAssetSize: 1400000
        },
    },
];
