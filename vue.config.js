module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      symlinks: false
    }
  },
  pages: {
    index: {
      entry: 'client/main.js'
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
