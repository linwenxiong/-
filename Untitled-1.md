# vite-plugin-eslint

vite-plugin-eslint 是一个用于在vite构建过程中，集成ESlint检查的插件。它可以用来检查开发者的代码是否符合ESlint的规则，并且在控制台中输出错误或警告信息。
如何使用：

在**vite.config.js**文件中引入插件：

```javascript
import eslintPlugin from 'vite-plugin-eslint';
export default defineConfig({
    plugins: [
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
    })
  ]
})
 
```
此时的vite-plugin-eslint就已经成功集成到你的vite项目中了；
