const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = [
    {
        entry: {
            "client": "./dot_field.ts"
        },
        devtool: "inline-source-map",
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                filename: path.resolve(__dirname, 'client/index.html'),
                template: path.resolve(__dirname, 'index.html')
            })
        ],
        resolve: {
            extensions: ['.ts', '.js']
        },
        output: {
            filename: '[name]/index.js',
            path: path.resolve(__dirname, '')
        }
    }
];