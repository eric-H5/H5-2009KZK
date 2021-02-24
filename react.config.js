const path = require('path')

// 用于把打包后的js/css等资源，自动插入到public/index.html中
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 在每次执行npm run build时，自动帮我们清理掉dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// Webpack最新的ESLint的使用方式，eslint-loader已经被弃用
const ESLintPlugin = require('eslint-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

console.log("--------------", isDev, process.env.NODE_ENV);

const config = {
    mode: 'production',
    // 入口
    // entry: path.resolve(__dirname,'./src/main.js'),
    entry: {
        // 给入口文件一个名字，叫app
        // app: path.resolve(__dirname,"./src/main.js"),
        // 也可以使用相对路径
        app: './src/main.js'
    },
    plugins: [
        // 打包时，用于把js/css等文件，自动插入到index.html中去
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            title: 'fuxifuxi'
        }),
        // 每次打包完，自动清理掉 dist 目录中残留文件
        new CleanWebpackPlugin(),
    ],
    // loaders
    // 在webpack眼中，一切皆模块
    module: {
        // Webpack要根据你定义的规则，来编译各种不同后缀的模块
        rules:[
        // sass是Sass的编译器，它的作用是把sass-loader加载进来的scss文件编译成css文件
            { test: /\.(css|scss)$/, use: ['style-loader', 'css-loader','sass-loader'] },
        // 加载图片
            { test: /\.(png|svg|jpg|jpeg|gif)$/i,type: 'asset/resource', },
        // babel-loader用于加载.js文件，并交给 @babel/* 编译器
        // 在处理js模块时，为了让编译速度更快，一定要忽略掉 node_modules
            {
                test: /\.(js|jsx)$/,
                // exclude 不包含
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
    // eslint-loader用于加载.js文件，交给 eslint 这个库来进行检查
    // enforce:'pre'，当代码变化时，先检测代码规范，只有当代码满足规范时，才执行其它的 后置loader的处理
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'eslint-loader',
            //     enforce: 'pre',
            //     options: {
            //         fix: true
            //     }
            // }

        ] 
    },
    // 出口
    output: {
        filename: 'fuxi-[name].[hash].js', // 一捆、一束
        path: path.resolve(__dirname, './dist'), // 只能写绝对路径
        // publicPath: 'fuxi-',// 静态资源的前缀  这块有问题
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.jsx', '.tx', '.json', '.css', '.vue'],
    },
}
// 开发环境的特殊配置
if (isDev) {
    config.mode = 'development',
    config.devtool = 'source-map'
    config.plugins.push(new ESLintPlugin({
            exclude: ['node_modules']
        })
    ),
    config.devServer = {
        // 本地服务
        // 要配合webpack-dev-server一起使用
        port: 8888,
        open: true,
        hot: true,    // 启用本地node服务中的socket长连接来实时通信
        contentBase: './public',    // 指定本地服务的静态资源目录
        // 当本地项目运行时，发生errors错误，以覆盖层的方式遮住视图
        overlay: {
            errors: true
        }
    }
}
    

module.exports = config