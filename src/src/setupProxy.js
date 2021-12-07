const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:9790',
            changeOrigin: true
        })
    );

    app.use(
        '/no-auth-api',
        createProxyMiddleware({
            target: 'http://localhost:9790',
            changeOrigin: true
        })
    );
};
