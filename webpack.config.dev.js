const webpack = require('webpack')
const pass = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
//this is important for buble plugin so it will knows we are running in development model
process.env.NODE_ENV = 'development'

module.exports = {
  mode:'development',
    //target node or web
  target:'web',
  //source maps let us see our original code when debugging in the browser
  devtool:'cheap-module-source-map',
  entry:'./src/index',
  // webpack doesn't output code in development mode. it serves our app from memory
  output:{
    path: path.resolve(__dirname, 'build'),
    //this setting specify the public url of the output directory when it referenced in the browser
    publicPath:'/',
    filename: 'bundle.js'
  },
  devServer: {
    //this reduce the information that writes to the command line so we don't get a lot noise when it running
    stats:'minimal',
    //overlay the error that occure in the browser
    overlay: true,
   //all request will be send to index.html, this way we can load deep links all be handle by react router
    historyApiFallback: true,
     //this three line is necessary due to an open issue in webpack when use the latest version of chrome
    //once it resolved we should be able to remove it
    disableHostCheck: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    https:false
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3001')
    }),
    //The new code takes effect, the web page is not refreshed, and the status is not lost
    new HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        // test will be a regex to match the file path
        // use will be the name of loader that we want to use
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        //They’re also able to run transformations on files before
        //they get added to the final output bundle the most popular is
        //transforming next generation javascript to the javascript up
        //today that browsers can understand using bable
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /(\.css)$/,
        //webpack will also bunlder our css into a single file
        use: ["style-loader", "css-loader"]
      }
    ]
  }

}
