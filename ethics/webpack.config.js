const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const es3ifyPlugin = require('es3ify-webpack-plugin');

module.exports = {
  // devtool: 'source-map',
  entry: ['./src/index.js'],

  output: {
    path: __dirname + '/public/common',
    filename: 'script.js',
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   options: {
      //     presets: ['env'],
      //     plugins:  [
      //       'transform-es3-property-literals',
      //       'transform-es3-member-expression-literals'
      //     ]
      //   }
      // },
      {
        test: [/\.css$/, /\.scss$/],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                // If you are having trouble with urls not resolving add this setting.
                // See https://github.com/webpack-contrib/css-loader#url
                url: false,
                minimize: true,
                //sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                //sourceMap: true
              }
            }
          ]
        })
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new UglifyJsPlugin({
      //sourceMap: true,
      uglifyOptions: {
        mangle: {
          toplevel: true
        },
        // ie8: true,
        // output: {
        //   keep_quoted_props: true
        // },
        // compress: {
        //   warnings: false,
        //   properties: false
        // },
      }
    })
  ]
}
