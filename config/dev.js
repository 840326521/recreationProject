import path from 'path';
module.exports = {
    less: {
        resource: [
            path.resolve(__dirname, '..', 'src/styles/global/global.less')
        ],
        projectDirectory: path.resolve(__dirname, '..')
    },
    env: {
        NODE_ENV: '"development"',
    },
    defineConstants: {},
    mini: {},
    h5: {
        devServer: {
            host: 'localhost',
            port: 10086,
            proxy: [{
                context: ['/book'],
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/book': '/book'
                },
                changeOrigin: true,
                secure: false
            }]
        }
    },
};