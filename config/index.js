const path = require('path')
const aliasFn = () => {
    const aliasObj = {};
    [
        ['', ''],
        ['utils', 'utils'],
        ['src_config', 'src_config'],
        ['src_types', 'src_types'],
        ['p_c', 'pages/components'],
    ].forEach((item, idx) => aliasObj[`@${item[0]}`] = path.resolve(__dirname, '..', idx === 0 ? 'src' : `src/${item[1]}`))
    return aliasObj
}
const config = {
    projectName: 'myApp',
    date: '2021-12-17',
    designWidth: 750,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: `dist/${process.env.TARO_ENV}`,
    plugins: [],
    defineConstants: {},
    copy: {
        patterns: [
            // {
            //   from: 'src/assets/',
            //   to: 'dist/assets/'
            // }
        ],
        options: {},
    },
    framework: 'react',
    mini: {
        webpackChain(chain, webpack) {
            // linaria/loader 选项详见 https://github.com/callstack/linaria/blob/master/docs/BUNDLERS_INTEGRATION.md#webpack
            chain.module
                .rule('script')
                .use('linariaLoader')
                .loader('linaria/loader')
                .options({
                    sourceMap: process.env.NODE_ENV !== 'production',
                })
        },
        postcss: {
            pxtransform: {
                enable: true,
                config: {},
            },
            url: {
                enable: true,
                config: {
                    limit: 1024, // 设定转换尺寸上限
                },
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
    },
    h5: {
        webpackChain(chain, webpack) {
            chain.module
                .rule('script')
                .use('linariaLoader')
                .loader('linaria/loader')
                .options({
                    sourceMap: process.env.NODE_ENV !== 'production',
                })
        },
        esnextModules: ['taro-ui'],
        publicPath: '/',
        staticDirectory: 'static',
        postcss: {
            autoprefixer: {
                enable: true,
                config: {},
            },
            cssModules: {
                enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[name]__[local]___[hash:base64:5]',
                },
            },
        },
    },
    rn: {
        name: 'myApp'
    },
    alias: aliasFn(),
};

module.exports = function(merge) {
    if (process.env.NODE_ENV === 'development') {
        return merge({}, config, require('./dev'));
    }
    return merge({}, config, require('./prod'));
};