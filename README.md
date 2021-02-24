## 前端基本都是先运行在node.js的，基于common.js

了解配置文件
invalid，无效的
configuration，配置


# webpack

cnpm install webpack -g 
cnpm install webpack -D
cnpm install webpack-cli -S
cnpm install webpack-cli -D

遇到问题的思路：
1、看是否丢包
2、看npm官方文档
3、翻英文文档


webpack-cli 提供webpack编译命令
例如：webpack --config react.config.js
（默认可为webpack.config.js，直接webpack）

导入node的path包，resolve

## entry 入口
任何程序都是单一入口，写法多样，形式可对象，可赋值
入口可写相对路径、绝对路径

## output 出口
bundle: 一束一捆，将零零散散的代码打包成一个文件
出口只能写绝对路径，不能写相对路径

## loader 转换器
loader有先后顺序，style先写再写css

## plugin 插件
形式为数组[]
HtmlWebpackPlugin:将打包好的静态资源的index.html，JS关联起来
使用方法，new HtmlWebpackPlugin({})

# webpack-dev-server 开发一个本地的服务
cnpm install webpack-dev-server -D

起本地服务的命令：
webpack serve --config react.config.js
若想要运行并自动打开浏览器
webpack serve --open 'Goole Ghrome' --config react.config.js

# Babel JavaScript的 编译 器
@babel/core就是babel的核心库，将es6代码进行一个转换处理
@babel/preset-env 专门编译大多数es6的代码
@babel/preset-react 专门编译jsx的代码

## 还需要在项目根目录中添加 babel.config.js 文件
在这个文件中，有两个重要的理解
 preset 代表对不同js版本的一种支持
 plugin preset对于有些语法不能解析，这个时候就需要plugin安装相关插件进行小修小补

# ESLint 用来 检测 js和jsx代码规范的（JSLint也可以，但是很少人用了）
需下载两个包：
1、eslint-loader 加载js文件的
2、eslint 检测代码是否规范的标准

不检测node_modules是因为第三方包写的都很规范，自己写的才需要检测

// eslint-loader用于加载.js文件，交给 eslint 这个库来进行检查
// enforce:'pre'，当代码变化时，先检测代码规范，只有当代码满足规范时，才执行其它的 后置loader的处理

## 还需要在项目根目录中加入配置文件 .eslintrc.json
在这个文件中有
parserOptions：解析选项的配置
rules：eslint的检测规则
0：加不加条件都可以
1：会有黄色报错  警告 
2：报错

eslint-loader即将被淘汰，可通过plugin插件中的ESLintPlugin插件来解决
或者通过eslint-webpack-plugin
fix：true //为自动修复

### 两种关闭eslint的方式
/* eslint disable */
console.log('disable eslint')  // eslint-disable-line
/* eslint disable */

# 区分生产环境(production)和开发环境(development)
通过 Node.js 的环境变量  例如 NODE_ENV = 'production'进行区分
主要通过cross-env包，在package.json中通过设定script进行编译build或者start
并使用Node.js的内置对象process.env.NODE_ENV进行判断
if (isDev) {
    // 在这里写 开发环境的配置
} else {
    // 在这里写 生产环境的配置
}

```javaScript
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

# resolve 解析
可用到alias、extensions