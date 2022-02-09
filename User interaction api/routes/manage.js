//jshint esversion:8
const express = require('express');
const {
  addInteractionLike,
    updateInteraction,
  addInteractionRead,
  getInteractions,
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
 *         user_id: e3c057fee2824329ae75f88cb75e019bs
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
 *         user_id: e3c057fee2824329ae75f88cb75e019bs
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
 *       200:
 *         description: The interaction was successfully added
 *       500:
 *         description: Some server error
 */

routes.post('/like', async (req, res) => {
    console.log(req.body);
    const { title, story_id, user_id, like } = req.body;
    await addInteractionLike(title, story_id, user_id, like);
    res.send("Data inserted into Interaction db");
});



 /**
 * @swagger
 * /read:
 *   post:
 *     summary: Acknowledges read to particular content and inserts entries into db
 *     tags: [UserInteraction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRead'
 *     responses:
 *       200:
 *         description: The interaction was successfully added
 *       500:
 *         description: Some server error
 */
routes.post("/read", async (req, res) => {
  console.log(req.body);
  const { title, story_id, user_id, read } = req.body;
  await addInteractionRead(title, story_id, user_id, read);
  res.send("Data inserted into Interaction db");
});



/**
 * @swagger
 * /:
 *   get:
 *     summary: get all interaction data
 *     tags: [UserInteraction]
 *     responses:
 *       200:
 *         description: The interaction was successfully added
 *       500:
 *         description: Some server error
 */
routes.get('/',  (req, res) => {
    const data =  getInteractions();
    res.send(data);
});



 /**
 * @swagger
 * /read:
 *   post:
 *     summary: Acknowledges read to particular content and inserts entries into db
 *     tags: [UserInteraction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRead'
 *     responses:
 *       200:
 *         description: The interaction was successfully added
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /:
 *  put:
 *    summary: Update the content by the id
 *    tags: [UserInteraction]
 *    parameters:
 *      - in: query
 *        name: story_id
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
 *      200:
 *        description: The content was updated
 *      404:
 *        description: The content was not found
 *      500:
 *        description: Some error happened
 */

routes.put('/',async (req, res) => {
    const { story_id ,event, flag, user_id } = req.query;
    updateInteraction(story_id, event, flag, user_id);
    res.send("Data updated");
});

module.exports = routes;