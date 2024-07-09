const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public/assets/js'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
            watch: true,
        },
        port: 3000,
        hot: true,
        open: true,
        watchFiles: ['public/**/*', 'src/**/*'],
    },
    plugins: [
        new BrowserSyncPlugin(
            {
                host: 'localhost',
                port: 3001,
                proxy: 'http://localhost:3000',
                files: [
                    'public/**/*.html',
                    'public/assets/css/**/*.css',
                    'public/assets/js/**/*.js'
                ],
                injectChanges: true,
                reloadDelay: 0,
                reloadDebounce: 500,
                reloadOnRestart: true,
            },
            {
                reload: false,
            }
        ),
    ],
};
