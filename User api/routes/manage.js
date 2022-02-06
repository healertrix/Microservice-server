//jshint esversion:8
const express = require('express');

const routes = express.Router();
const {
  addUser,
  updateUserbyId,
  removeUserbyId,
  getUserbyId,
} = require('../queries');


routes.post("/", (req, res) => {
    console.log(req.body);
    const { fname, lname, email, phno
    } = req.body;
    addUser(fname, lname, email, phno);
    res.send("Data inserted into User db");
});
routes.get('/:id', (req, res) => {
    const _id = req.params.id;
    const user = getUserbyId(_id);
    console.log(user);
    res.send(user);
});
routes.put('/:id', (req, res) => {
    const _id = req.params.id;
    const { fname, lname, email, phno } = req.query;
    if (fname) { 
        updateUserbyId(_id,"fname",fname);
    }
    if (lname) {
      updateUserbyId(_id, "lname", lname);
    }
    if (email) {
      updateUserbyId(_id, "email", email);
    }
    if (phno) {
      updateUserbyId(_id, "phno", phno);
    }
    res.send("updated data");
});
routes.delete('/:id', (req, res) => {
    const _id = req.params.id;
    removeUserbyId(_id);
    res.send("user deleted");
});

module.exports = routes;