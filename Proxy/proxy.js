//jshint esversion:8
const express = require("express");
// const proxy = require("simple-http-proxy");
const proxy = require("express-http-proxy");
const app = (module.exports = express());

/**
 * Mount the proxy middleware
 */
app.use("/content", proxy("http://localhost:4002/"));
app.use("/interaction", proxy("http://localhost:4001/"));
app.use("/user", proxy("http://localhost:4000/"));

app.listen(8080, () => {
  console.log(`Gateway running on port 8080 `);
});
