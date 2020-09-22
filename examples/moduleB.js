define("moduleB", ["moduleA"], function (moduleA) {
  var store = {
    apple: 12,
    banana: 32,
    melon: 22,
    bean: 44,
  };

  function getStoreInfo() {
    var info = [];
    for (var key in store) {
      info.push({
        key: key,
        name: moduleA.getProductName(key),
        num: store[key],
      });
    }
    return info;
  }

  return { getStoreInfo: getStoreInfo };
});
