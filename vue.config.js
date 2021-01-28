
var px2rem = require('postcss-px2rem');

// 第一种
// module.exports = {
//     module: {
//         loaders: [
//             {
//                 test: /\.css$/,
//                 loader: "style-loader!css-loader!postcss-loader"
//             }
//         ]
//     },
//     postcss: function () {
//         return [px2rem({ remUnit: 37.5 })];
//     }
// }


module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
    css: {
      extract: false,
      loaderOptions: {
        postcss: {
          plugins: [
            // 设计稿宽度的1/10，根据原型图给出的尺寸标注来。我这里的原型图总宽度是375
            px2rem({ remUnit: 37.5 }),
          ],
        },
      },
    },
  }