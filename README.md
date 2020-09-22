# 简易的模块加载器

## 定义模块

```js
// [name] 当前模块名
// [deps] 依赖的模块数组
// [callback] 依赖模块完成后回调
// 返回值作为当前模块导出值
define(name, deps, callback);

// 例如
define("module", ["module1", "module2"], function (m1, m2) {
  return {
    method: function () {
      m1.methodA();
      m2.methodB();
    },
  };
});
```

## 调用模块

```js
// [deps] 依赖的模块数组
// [callback] 依赖模块完成后回调
require(deps, callback);

// 例如
require(["module1", "module2"], function (m1, m2) {
  m1.methodA();
  m2.methodB();
});
```

## 例子

运行以下

```bash
npm install

npm run examples
```
