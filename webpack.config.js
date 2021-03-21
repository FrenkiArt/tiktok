const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
// const webpack = require('webpack');
const fs = require('fs');
const isDev = process.env.NODE_ENV !== 'production';

console.log('isDev', isDev);

// Для Pug-а
const PAGES_DIR = path.resolve(__dirname, `src/views/pages/`);
/* const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith('.pug')); */
const PAGES = fs.readdirSync(PAGES_DIR).filter(filtrPugFiles);

/**
 * Функция для сортировки всех файлов с окончанием .pug
 * @param {string} fileName Имя файла
 * @return {string} Возвращает файл с окончанием .pug
 */
function filtrPugFiles(fileName) {
  return fileName.endsWith('.pug');
}

/**
 * Эта функция возвращает новую страницу
 * @param {string} page - Итерируемая страница
 * @return {string} Новая станица
 */
function returnNewPage(page) {
  return new HtmlWebpackPlugin({
    template: `${PAGES_DIR}/${page}`,
    filename: `./${page.replace(/\.pug/, '.html')}`,
    // favicon: './assets/static/favicon.ico',
    scriptLoading: 'defer',
    inject: 'body',
    minify: false,
  });
}

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: './assets/js/main.js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: '[name].[ext]',
  },
  devtool: isDev ? 'inline-source-map' : 'source-map',
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    overlay: true,
    port: 5000,
  },
  plugins: [
    ...PAGES.map(returnNewPage),
    new MiniCssExtractPlugin({
      // filename: '[name].css',
      filename: 'assets/styles/main.css',
    }),
    new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
    // new CleanWebpackPlugin(),
    /* new HtmlWebpackPlugin({
      inject: 'body',
      minify: false,
      scriptLoading: 'defer',
      template: 'src/index.html',
      title: 'Где заголовок?',
    }), */
    new CopyPlugin({
      patterns: [
        {
          from: 'src/assets/static/**/*',
          to: path.resolve(__dirname, 'dist/assets/static/[name].[ext]'),
        },
        {
          from: 'src/assets/images/**/*',
          to: path.resolve(__dirname, 'dist/assets/images/[name].[ext]'),
        },
        {
          from: 'src/assets/svg/**/*',
          to: path.resolve(__dirname, 'dist/assets/svg/[name].[ext]'),
        },
        {
          from: 'src/assets/js/custom-js.js',
          to: path.resolve(__dirname, 'dist/assets/js/custom-js.js'),
        },
      ],
    }),
    /* new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }), */
  ],
  /* optimization: {
    splitChunks: {
      chunks: 'all',
    },
  }, */
  module: {
    rules: [
      /* {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
              // publicPath: isDev ? '/' : '/subdomen/',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }, */
      /* {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: isDev ? '/' : '/',
              // publicPath: isDev ? '/' : '/ondas/',
              // publicPath: '/',
              // publicPath: publicPathForMainCss,
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }, */
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[ext]',
        },
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[ext]',
        },
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
        type: 'asset/resource',
        generator: {
          filename: 'assets/data/[name].[ext]',
        },
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
        type: 'asset/resource',
        generator: {
          filename: 'assets/data/[name].[ext]',
        },
      },
      {
        test: /\.txt/,
        type: 'asset/source',
        generator: {
          filename: 'assets/data/[name].[ext]',
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
    ],
  },
};

if (isDev) {
  module.exports.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
  });
} else {
  module.exports.module.rules.push({
    test: /\.(sa|sc|c)ss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: './../../',
        },
      },
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  });
}
