const { defineConfig } = require('@vue/cli-service')
const path = require('path');

// defineConfig({
//   transpileDependencies: true
// })

function resolve(dir) {
  return path.join(__dirname, dir)
}

const defaultSrc = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("api", resolve("src/api"))
  }
}

module.exports = defaultSrc

