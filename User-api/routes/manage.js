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
 *     PostRes:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: string
 *           description: the id of inserted user
 *       example:
 *         _id: "5bb74e3eea474bf3ab09ac427bf2cb05"
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
 * components:
 *   schemas:
 *     PutUser:
 *       type: object
 *       required:
 *         - _id
 *         - updated
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the content
 *         updated:
 *           type: boolean
 *           description: status of update operation
 *       example:
 *         _id: 94c7f94a8bae46f290ad5312ad2d07f5
 *         updated: true
 * 
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
 *       201:
 *         description: The User was successfully added
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostRes'
 *       500:
 *         description: Some server error
 */
routes.post("/", async (req, res) => {
    console.log(req.body);
    const { fname, lname, email, phno
    } = req.body;
  const id = await addUser(fname, lname, email, phno);
  const result = {
    _id: id
  };
    res.status(201).send(result);
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
 *               $ref: '#/components/schemas/UserId'
 *       404:
 *         description: The content was not found
 */

routes.get('/:id', async (req, res) => {
    const _id = req.params.id;
    const result = await getUserbyId(_id);
  if (result == 404) {
    res.status(404).send("User not found");
  } else {
    
    res.status(200).send(result);
  }
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
 *      201:
 *        description: The content has been added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PutUser'             
 *      404:
 *        description: The content was not found
 *      500:
 *        description: Some error happened
 */


routes.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { fname, lname, email, phno } = req.query;
    const result = await updateUserbyId(id, fname, lname, email, phno);
    if (result == 404) {
      res.status(404).send("User was not found! Error");
    } else if (result == 500) {
      res.status(500).send("Server Error!!");
    } else {
      res.status(201).send(result);
    }
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
routes.delete('/:id', async (req, res) => {
    const _id = req.params.id;
  const user = await removeUserbyId(_id);
   if (user == 404) {
     res.status(404).send("User not found");
   } else {
     res.status(200).send("User has been deleted");
   }

});

module.exports = routes;