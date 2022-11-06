module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/scss/index.scss";`
      }
    }
  },
}