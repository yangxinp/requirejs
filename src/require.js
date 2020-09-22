// define require
(function (window) {
  var store = {};
  window.store = store;

  function Module(name) {
    // 名称
    this.name = name;
    // 路径
    this.src = "./" + name + ".js";
    // 依赖
    this.deps = [];
    // 主体函数
    this.main = null;
    // 开始
    this.start = false;
    // 模块是否完成
    this.finish = false;
    // 导出内容
    this.exports = {};
    // 模块完成后进行回调
    this.callbacks = [];

    this.register(function () {});
  }

  // 依赖写入
  Module.prototype.setDeps = function (deps) {
    var _this = this;
    this.deps = deps;

    // 主体函数包装
    function _main() {
      // 如果已经完成
      if (_this.finish) return;
      var arg = [];
      for (var i = 0; i < deps.length; i++) {
        var dm = _getModule(deps[i]);
        if (!dm.finish) return;
        arg.push(dm.exports);
      }
      var exports = _this.main.apply(_this.main, arg);
      _this.init(exports);
    }

    if (deps.length > 0) {
      // 向依赖模块注入回调函数
      deps.forEach(function (dep) {
        _getModule(dep).addListener(_main);
      });
    } else {
      _main();
    }
  };

  // 填充主体函数
  Module.prototype.setMain = function (main) {
    this.main = main;
  };

  // 初始化模块内容
  Module.prototype.init = function (exports) {
    if (this.finish) throw new Error("该模块已初始化");
    this.exports = exports;
    this.finish = true;
    this.callbacks.forEach(function (fn) {
      fn();
    });
  };

  // 添加监听函数
  Module.prototype.addListener = function (fn) {
    this.finish ? fn() : this.callbacks.push(fn);
  };

  // 启动注册服务
  Module.prototype.register = function (callback) {
    if (this.start) return;
    var node = _createScript(this.src, callback);
    this.start = true;
    return node;
  };

  // 创建script标签
  function _createScript(src, callback) {
    var node = document.createElement("script");
    node.src = src;
    node.addEventListener("load", callback);
    document.body.appendChild(node);
    return node;
  }

  // 获取模块
  function _getModule(name) {
    return name in store ? store[name] : (store[name] = new Module(name));
  }

  // 引入模块
  function require(name, callback) {
    // 需要提前完成模块加载
    if (typeof name === "string") {
      if (arguments.length !== 1) {
        name = [name];
      } else {
        return _getModule(name).exports;
      }
    }

    if (name.length === 0) return callback();

    var deps = [];
    name.forEach(function (n) {
      deps.push(_getModule(n));
    });

    let finish = false;
    function _main() {
      if (finish) return;
      var arg = [];
      for (var i = 0; i < deps.length; i++) {
        arg.push(deps[i].exports);
      }
      callback.apply(callback, arg);
      finish = true;
    }

    deps.forEach(function (dep) {
      dep.addListener(_main);
    })
  }

  // 模块定义
  function define(name, deps, callback) {
    var module = _getModule(name);
    module.setMain(callback);
    module.setDeps(deps);
  }

  // data-main="scripts/app.js"
  // 启动入口函数
  var scripts = document.getElementsByTagName("script");
  var reqScript = scripts[0];
  var entry = reqScript.getAttribute("data-main");
  _createScript(entry, function () {});

  window.require = require;
  window.define = define;
})(window);
