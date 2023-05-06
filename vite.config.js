const path = require("path");
const { defineConfig } = require("vite");
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

module.exports = defineConfig({
  // 将css文件打包进js
  plugins: [cssInjectedByJsPlugin()],
  // 无需代码中环境变量判断（均为production）
  define: { "process.env.NODE_ENV": JSON.stringify('production') },
  build: {
    minify: false,
    lib: {
      formats: ["umd"],
      entry: path.resolve(__dirname, "index2.jsx"),
      name: "Demo",
      fileName: (name) => `${name}.js`,
    },
    rollupOptions: {
      // 无需打包的内容，工作台中有
      external: ["react", "antd"],
      output: {
        // umd下提供一个全局变量名
        globals: {
          react: "React",
          antd: "Antd",
          'react-dom': "ReactDOM"
        },
      },
    },
  },
});
