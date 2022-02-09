//jshint esversion:8
const express = require('express');
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const cors = require('cors');
const fileUpload = require("express-fileupload");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Contents Service API",
      version: "1.0.0",
      description: "Content Microservice API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT||4002}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsdoc(options);

const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));


const routes = require('./routes/manage');
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();

app.use('/content', routes);

const listener = app.listen(process.env.PORT || 4002, () => {
    console.log("Content service is listening on port "+listener.address().port);
});