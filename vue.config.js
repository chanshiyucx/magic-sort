module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/treasure/magicsort' : '/',
  chainWebpack: config => {
    config.module
      .rule('raw')
      .test(/\.md$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
