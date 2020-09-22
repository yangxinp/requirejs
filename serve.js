const express = require("express");
const app = express();
const port = process.env.port || 8181;

// 延迟加载
app.use(function (req, res, next) {
  setTimeout(() => next(), 2000);
});

app.use(express.static("./examples"));
app.get("/require.js", function (req, res, next) {
  res.sendFile(__dirname + "/src/require.js");
});

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log("listening at http://localhost:" + port + "\n");
});
