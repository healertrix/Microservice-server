//jshint esversion:8
const express = require('express'); 
const app = express();
const routes = require("./routes/manage");
const cors = require('cors');
app.use(cors());
app.use(express.json()); // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parses incoming requests with URL encoded payloads
require("dotenv").config();
app.use("/user", routes);


const listener = app.listen(process.env.PORT || 4000, () => {
  console.log(
    "User service is listening on port " + listener.address().port
  );
});

