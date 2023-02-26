const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'docs',
  assetsDir: './',
  publicPath: './'
})
module.exports = {
  devServer: {
    host: 'localhost',
    port: 5500,
  },
};