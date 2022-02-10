//jshint esversion:8
const express = require("express");
// const proxy = require("simple-http-proxy");
const proxy = require("express-http-proxy");
const app = (module.exports = express());

/**
 * Mount the proxy middleware
 */
app.get('/', (req, res) => {
  res.send("Hello here!");
});

app.use("/content", proxy("http://content:4002/"));
app.use("/interaction", proxy("http://interaction:4001/"));
app.use("/user", proxy("http://user:4000/"));

app.listen(8080, () => {
  console.log(`Gateway running on port 8080 `);
});
