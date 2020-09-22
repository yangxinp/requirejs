define("moduleA", [], function () {
  var product = {
    apple: "苹果",
    banana: "香蕉",
    melon: "甜瓜",
    bean: "豆子",
  };

  function getProductName(key) {
    return product[key] || "未知";
  }

  return { getProductName: getProductName };
});
