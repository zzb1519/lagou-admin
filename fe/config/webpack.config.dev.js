const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    // 模式为开发模式
    mode: 'development',

    // 配置入口出口
    entry: "./src/app.js",
    output:{
        path: path.resolve(__dirname , '../dev'),
        filename:'app.js'
    },

    //启动一个服务
    // 做webpack-dev-serve的配置
    devServer: {
        contentBase: path.resolve(__dirname , '../dev'), 
        compress: true,
        port: 8000
      },


    //   loader们
    module:{
        rules:[
            {
                test:/\.art$/,
                loader:'art-template-loader'
            }
        ]
    },

    //   启动插件
      plugins:[

        //打包html—+css+js
          new htmlWebpackPlugin({
              template:"./index.html",                    //表示要把哪个文件打包到文件夹里去
              filename:"index.html",
              title:"lagou admin"
          }),
          //k拷贝公共资源
          new copyWebpackPlugin([{
              from:'./public',
              to:'./public'
          }])

      ]



}