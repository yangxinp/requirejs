require(["moduleB"], function (moduleB) {
  var contentDOM = document.getElementById('content')
  contentDOM.textContent = JSON.stringify(moduleB.getStoreInfo())
});
