const path = require('path');
const pkg = require('./package.json');

const externals = new Set([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
]);

const config = {
    entry: {
        main: './src/index.js',
        Bootstrap: './src/components/styled/Bootstrap.js',
        Separate: './src/components/separate/index.js',
        AutocompleteField: './src/components/AutocompleteField.jsx',
        FormController: './src/components/FormController.js',
    },
    output: {
        path: path.join(__dirname, ''),
        filename: '[name].js',
        libraryTarget: 'umd',
    },
    externals(context, request, callback) {
        if (externals.has(request)) {
            return callback(null, `${config.output.libraryTarget} ${request}`);
        }
        return callback();
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader:
                    'style-loader!css-loader?modules=true&localIdentName=[name]__[local]___[hash:base64:5]',
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'es2017', 'react'],
                },
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
};

module.exports = config;
