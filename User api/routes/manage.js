//jshint esversion:8
const express = require('express');

const routes = express.Router();
const {
  addUser,
  updateUserbyId,
  removeUserbyId,
  getUserbyId,
} = require('../queries');




/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - fname
 *         - lname
 *         - email
 *         - phno
 *       properties:
 *         fname:
 *           type: string
 *           description: first name
 *         lname:
 *           type: string
 *           description: The book title
 *         email:
 *           type: string
 *           description: The book author
 *         phno:
 *           type: string
 *           description: The book
 *       example:
 *         fname: Alex
 *         lname: Dudley
 *         email: abc@gmail.com
 *         phno : 1111111
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     UserId:
 *       type: object
 *       required:
 *         - _id
 *         - fname
 *         - lname
 *         - email
 *         - phno
 *       properties:
 *         fname:
 *           type: string
 *           description: first name
 *         lname:
 *           type: string
 *           description: last name
 *         email:
 *           type: string
 *           description: user email
 *         phno:
 *           type: string
 *           description: The phone number
 *         _id:
 *           type: string
 *           description: id of user     
 *       example:
 *         fname: Alex
 *         lname: Dudley
 *         email: abc@gmail.com
 *         phno : 1111111
 *         _id  : e3c057fee2824329ae75f88cb75e019b
 */



 /**
  * @swagger
  * tags:
  *   name: User
  *   description: The User service API
  */



 /**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The content was successfully added
 *       500:
 *         description: Some server error
 */
routes.post("/", (req, res) => {
    console.log(req.body);
    const { fname, lname, email, phno
    } = req.body;
    addUser(fname, lname, email, phno);
    res.send("Data inserted into User db");
});





/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The content was not found
 */

routes.get('/:id', (req, res) => {
    const _id = req.params.id;
    const user = getUserbyId(_id);
    console.log(user);
    res.send(user);
});


/**
 * @swagger
 * /{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *      - in: query
 *        name: fname
 *        schema:
 *          type: string
 *        description: first name
 *      - in: query
 *        name: lname
 *        schema:
 *          type: string
 *        description: last name
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *        description: email
 *      - in: query
 *        name: phno
 *        schema:
 *          type: string
 *        description: phone number 
 *    responses:
 *      200:
 *        description: The user was updated
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */


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


/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove the content by id
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 * 
 *     responses:
 *       200:
 *         description: The user was deleted
 *       404:
 *         description: The user was not found
 */
routes.delete('/:id', (req, res) => {
    const _id = req.params.id;
    removeUserbyId(_id);
    res.send("user deleted");
});

module.exports = routes;