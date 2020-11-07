module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  publicPath: process.env
    .NODE_ENV === 'production' ?
    '/psicolab-demo/' :
    '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/_variables.scss"; @import "@/styles/_mixins.scss";  @import "@/styles/_main.scss";',
      },
    },
  },
};
