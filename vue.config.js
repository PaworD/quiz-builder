module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/builder/scss/index.scss";`
      }
    }
  },
}