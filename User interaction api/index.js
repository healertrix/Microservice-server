//jshint esversion:8
const express = require('express');
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User interaction Service API",
      version: "1.0.0",
      description: "User Interaction Microservice API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 4001}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);

const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
const cors = require("cors");
const routes = require("./routes/manage");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

app.use('/', routes);

const listener = app.listen(process.env.PORT || 4001, () => {
  console.log("User service is listening on port " + listener.address().port);
});