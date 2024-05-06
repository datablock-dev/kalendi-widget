const path = require('path')
const { LoaderOptionsPlugin } = require('webpack')

module.exports = {
    mode: "production",
    entry: "./index.ts",
    output: {
        filename: "index.js",
        path: path.resolve('build'),
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)?$/,
                use: ['babel-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            src: path.resolve(__dirname, 'src/'), // Create alias for 'src' directory
        },
    },
    plugins: [
        new LoaderOptionsPlugin({
            options: {
                postcss: [
                    require('tailwindcss'),
                    require('autoprefixer')
                ]
            }
        })
    ]
}