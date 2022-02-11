//jshint esversion:8
const express = require('express');
const {
  addInteractionLike,
  updateInteraction,
  addInteractionRead,
  getInteractions,
  removeInteractionbyId,
} = require("../queries");
const routes = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLike:
 *       type: object
 *       required:
 *         - story_id
 *         - user_id
 *         - like
 *       properties:
 *         story_id:
 *           type: string
 *           description: The id of content
 *         user_id:
 *           type: string
 *           description: the user id used for auth
 *         like:
 *           type: number
 *           description: The number of like events
 *       example:
 *         story_id: a335c79a626b42fc8fad35b97d11ec71
 *         user_id: 8178eea98d9543a5ae115c94adbc0c4a
 *         like: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRead:
 *       type: object
 *       required:
 *         - story_id
 *         - user_id
 *         - read
 *       properties:
 *         story_id:
 *           type: string
 *           description: The id of content
 *         user_id:
 *           type: string
 *           description: the user id used for auth
 *         read:
 *           type: number
 *           description: The number of read events
 *       example:
 *         story_id: a335c79a626b42fc8fad35b97d11ec71
 *         user_id: 8178eea98d9543a5ae115c94adbc0c4a
 *         read: 1
 */



 /**
  * @swagger
  * tags:
  *   name: UserInteraction
  *   description: The UserInteraction service API
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
 * /like:
 *   post:
 *     summary: Acknowledges like to particular content and inserts entry into db
 *     tags: [UserInteraction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLike'
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

routes.post('/like', async (req, res) => {
    console.log(req.body);
    const {story_id, user_id, like } = req.body;
    const result =await addInteractionLike(story_id, user_id, like);
  if (result===401) {
    res.status(401).send("User not found Error!!!");
  }
  else {
    const sender = { _id: result };
    res.status(201).send(sender);
  }
});



 /**
 * @swagger
 * /read:
 *   post:
 *     summary: Acknowledges read to particular content and inserts entry into db
 *     tags: [UserInteraction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRead'
 *     responses:
 *       201:
 *         description: The Interaction was successfully added
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostRes'
 *       401:
 *         description: 
 *       500:
 *         description: Some server error
 */

routes.post("/read", async (req, res) => {
  console.log(req.body);
  const { story_id, user_id, read } = req.body;
  const result = await addInteractionRead(story_id, user_id, read);
  if (result === 401) {
    res.status(401).send("User not found Error!!!");
  }
 else {
    const sender = { _id: result };
    res.status(201).send(sender);
  }
});



/**
 * @swagger
 * /:
 *   get:
 *     summary: get all interaction data
 *     tags: [UserInteraction]
 *     responses:
 *       200:
 *         description: The interaction was successfully sent
 *       500:
 *         description: Some server error
 */

routes.get('/',  (req, res) => {
    const data =  getInteractions();
    res.status(200).send(data);
});






/**
 * @swagger
 * /:
 *  put:
 *    summary: Update the interaction by the id
 *    tags: [UserInteraction]
 *    parameters:
 *      - in: query
 *        name: _id
 *        schema:
 *          type: string
 *        required: true
 *        description: The story id
 *      - in: query
 *        name: event
 *        schema:
 *          type: string
 *        description: either like or read event
 *      - in: query
 *        name: flag
 *        schema:
 *          type: boolean
 *        description: decides whether to increase or decrease the event(true to increase) 
 *      - in: query
 *        name: user_id
 *        schema:
 *          type: string
 *        description: user_id for verification 
 *    responses:
 *      201:
 *        description: The Interaction was successfully added
 *        content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PutUser'
 *      404:
 *        description: The interaction was not found
 *      500:
 *        description: Some error happened
 */

routes.put('/',async (req, res) => {
    const { _id ,event, flag, user_id } = req.query;
  const result = await updateInteraction(_id, event, flag, user_id);
  if (result == 404) {
    res.status(404).send("Interaction was not found! Error");
  } else if (result == 500) {
    res.status(500).send("Server Error!!");
  } else if (result == 401) {
    res.status(401).send("User not found !! Unauthorized access");
  } else {
    res.status(201).send(result);
  }

});

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove the interaction by id
 *     tags: [UserInteraction]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The UserInteraction id
 * 
 *     responses:
 *       200:
 *         description: The Interaction was deleted
 *       404:
 *         description: The Interaction was not found
 */
routes.delete('/:id', async (req, res) => {
    const _id = req.params.id;
  const user = await removeInteractionbyId(_id);
   if (user == 404) {
     res.status(404).send("UserInteraction not found");
   } else {
     res.status(200).send("UserInteraction has been deleted");
   }

});
module.exports = routes;