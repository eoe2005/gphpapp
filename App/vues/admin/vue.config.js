const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "http://127.0.0.1:7000/admin",
  },
  outputDir: "../../public/admin",
  publicPath: "/admin",
});
