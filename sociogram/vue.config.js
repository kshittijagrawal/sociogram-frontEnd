const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "^/oauth/api/auth": {
        target: "http://10.20.5.52:8080",
        changeOrigin: true,
        // pathRewrite: { "^/api": "" },
      },
      "^/instaUser": {
        target: "http://10.20.5.52:8080",
        changeOrigin: true,
        // pathRewrite: { "^/api": "" },
      },
      "^/instaPosts": {
        target: "http://10.20.5.52:8080",
        changeOrigin: true,
        // pathRewrite: { "^/api": "" },
      },
      "^/instaStory": {
        target: "http://10.20.5.52:8080",
        changeOrigin: true,
        // pathRewrite: { "^/api": "" },
      },
      "^/instaSearch": {
        target: "http://10.20.5.52:8080",
        changeOrigin: true,
        // pathRewrite: { "^/api": "" },
      },
      // "^/api/follower": {
      //   target: "http://10.20.5.52:8080",
      //   changeOrigin: true,
      //   pathRewrite: { "^/api": "" },
      // },
      // "^/api/following": {
      //   target: "http://10.20.5.52:8080",
      //   changeOrigin: true,
      //   pathRewrite: { "^/api": "" },
      // },
      // "^/api/post": {
      //   target: "http://10.20.5.52:8080",
      //   changeOrigin: true,
      //   pathRewrite: { "^/api": "" },
      // },
    },
  },
});
