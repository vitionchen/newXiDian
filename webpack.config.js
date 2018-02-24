/**
 * Created by chenwcheng on 2017/2/16.
 */
var webpack=require('webpack');
var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var glob = require('glob');
var files = glob.sync('./initProject/img/*.png');
var HtmlWebpackPlugin = require('html-webpack-plugin')
// var entryJson = {
//     main:["babel-polyfill",__dirname + "/initProject/index.js"]
// }
// console.log(files);
// for(var i = 0 ; i < files.length;i++){
//     entryJson[files[i].substring(files[i].lastIndexOf('/'),files[i].lastIndexOf('.'))]=files[i]
// }

console.log(process.env.XD_ENV);
var myEnv = process.env.XD_ENV;
var outPutJson;
if(myEnv=='production'){
    outPutJson={
        publicPath:"./",
        path: __dirname+"/projectOutput/",
        filename: "[name].js"
    }
}else{
    outPutJson={
        path: __dirname+"/initProject/",
        filename: "[name].js"
    }
}
module.exports= {
    entry: [
        "babel-polyfill",
        __dirname + "/initProject/index.js"
    ],
    // 输出文件路径
    output: outPutJson,
    // 输入文件路径
    // entry: [
    //     "babel-polyfill",
    //     __dirname + "/initProject/index.js"
    // ],
    // output: {
    //     path: __dirname+"/projectOutput",
    //     filename: "[name].js"
    // },
    //存放本地服务器,自动刷新
    devServer:{
        disableHostCheck: true,
        contentBase:'./initProject/',
        historyApiFallback:false,
        inline:true,
        hot:true,
        port:8760,
        host:'0.0.0.0'
    },
    // 模块，处理器
    module:{
      rules:[
          {
              test: /\.less$/,
              use:[
                  "style-loader",
                  "css-loader",
                  "less-loader",
                  "postcss-loader"
              ]
          },
          {
              test: /\.css$/,
              use:[
                  "style-loader",
                  "css-loader",
                  "postcss-loader"
              ]
          },
          {
              test: /\.vue$/,
              use:[
                  {loader: "vue-loader"}
              ],
              exclude: /node_modules/
          },
          {
              test: /\.(js|jsx)$/,
              use:[
                  {loader: "babel-loader"}
              ],
              exclude: /node_modules/
          },
          {
              test:/\.(jpg|png|gif)$/,
            //   use:['url-loader'],
              use:['url-loader?limit=1111&name=images/[name].[ext]'],
              exclude: /node_modules/
          }
      ]
    },
    resolve:{
        extensions:[".js",".vue",".less"]
    },
    // 插件选项
    plugins:[
        new webpack.LoaderOptionsPlugin({
            options: {
                babel: {
                    presets: ['es2015',"stage-0"],
                    plugins: ['transform-runtime']
                },
                postcss: [ autoprefixer({
                            browsers: ['ie>=8','>1% in CN']
                        })]
            }
        }),
        // 压缩
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false,
                drop_debugger: false,
                drop_console: false
            },
            mangle:{warnings:false},
            except:['exports','require'],
        }),
        new CleanWebpackPlugin(
            ['*.js','*.html'],　 //匹配删除的文件
            {
                root: __dirname+"/projectOutput",       　　　　　　　　　　//根目录
                verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                dry:      false        　　　　　　　　　　//启用删除文件
            }
        ),
        new HtmlWebpackPlugin({
            template: __dirname + "/initProject/index.html"
       })
    ]
};