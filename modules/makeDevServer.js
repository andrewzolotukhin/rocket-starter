let path = require('path');

const makeDevServer = (conf, root) => {
    return {
        contentBase: path.resolve(root, conf.dist),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        },
        disableHostCheck: true,
        port: conf.server.port || 3000,
        noInfo: true,
        quiet: false,
        lazy: false,
        hot: true,
        inline: true,
        stats: 'minimal',
        overlay: {
            errors: true
        },
        watchOptions: {
            poll: true,
            aggregateTimeout: 50,
            ignored: /node_modules/
        },
        historyApiFallback: true,
        host: conf.server.host || 'localhost'
    }
};

module.exports = makeDevServer;