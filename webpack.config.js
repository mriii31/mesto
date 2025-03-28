const path = require('path');                   //утилита - превращаем относительные пути в абсолютные
const HtmlWebpackPlugin = require('html-webpack-plugin');         //это класс
const { CleanWebpackPlugin } = require('clean-webpack-plugin');   //настройка не требуется
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: './src/pages/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),      //метод с двумя аргументами (ссылка на текущую папку и путь к точке выхода)
    filename: 'main.js',                        //где будет финальный код
    publicPath: '',                             //свойство для обновления путей внутри CSS и HTML
  },
  mode: 'development',                          //режим разработчика
  devtool: 'source-map',                        //подгружает файлик где мы можем увидеть что откуда взялось(исхоный код файлика)
  devServer: {
    static: path.resolve(__dirname, './dist'),  //путь куда смотрим режим разработчика
    compress: true,                             //ускоряет загрузку
    port: 8080,
    open: true                                  //откр. сайта
  },
  module: {                                     //настройка вебпак:
    rules: [{                                   //задаем правила сборки 
      test: /\.js$/,                            //ищет все файлы js       
      use: 'babel-loader',                      //пропускать код через бабель
      exclude: '/node_modules/'                 //исключить эту папку
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,  //ищет файлы с данными расширениями
        type: 'asset/resource'                              //переносит файлы в том же формате
      },
      {
        test: /\.css$/,                         //правило только для CSS
        use: [MiniCssExtractPlugin.loader, {    //используй эти loaders
            loader: 'css-loader',
            options: {
              importLoaders: 1                  //т.к. используется @import в CSS файлах (применить до CSS-loader)
            }
          },
          'postcss-loader'                      //чтобы подключить postcss к webpack
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({                     //html попадает в сборку
      template: './src/index.html'              //используем как класс
    }),
    new CleanWebpackPlugin(),                   //для отчист папки dist
    new MiniCssExtractPlugin()                  //собирает CSS в один файл
  ]
}