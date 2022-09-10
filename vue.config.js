module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/builder/scss/index.scss";`
      },
      less: {
        modifyVars: {
          'primary-color': '#1890ff',
          'processing-color': '#C8EFFF',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
        math: 'always'
      },
    },
  },
}
