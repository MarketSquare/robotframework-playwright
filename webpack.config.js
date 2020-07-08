const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sharedAll = {
    mode: 'development',
    devtool: 'inline-source-map',
    performance: { hints: false } ,
    stats: 'minimal',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
}

const testappFrontend = {
    entry: './atest/dynamic-test-app/src/index.tsx',
    target: 'web',

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: './atest/dynamic-test-app/static/index.html',
        }),
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './atest/dynamic-test-app/dist')
    },
    ...sharedAll
};

const sharedNode = {
    target: 'node',
    node: {
        __filename: true,
        __dirname: true
    },
}

const testappBackend = {
    entry: './atest/dynamic-test-app/src/server.ts',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'atest/dynamic-test-app/dist')
    },
    ...sharedNode,
    ...sharedAll,
}

const playwrightWrapper = {
    entry: './Browser/wrapper/index.ts',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'Browser/wrapper')
    },
    externals: {
        grpc: 'commonjs grpc',
    },
    ...sharedNode,
    ...sharedAll,
}

module.exports = [testappFrontend, testappBackend, playwrightWrapper]
