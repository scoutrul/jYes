const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      '~': path.resolve(__dirname, '.')
    }
  },
  configureWebpack: {
    resolve: {
      symlinks: false
    }
  }
}
