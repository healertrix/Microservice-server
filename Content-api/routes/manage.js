//jshint esversion:8
const express = require('express');
const routes = express.Router();
const csv = require("csvtojson");
 const db = require("diskdb");
db.connect("db", ["content"]);
const fs =require("fs");
const {
  addContent,
  updateContent,
  getContentbyId,
  deleteContentbyId,
  sortedByNew,
} = require("../controllers/queries");
const { getInteractions } = require('../controllers/interaction');

/**
 * @swagger
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       required:
 *         - title
 *         - story
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the content
 *         title:
 *           type: string
 *           description: The content title
 *         story:
 *           type: string
 *           description: The content
 *         last_modified:
 *           type: string
 *           description: The book author
 *       example:
 *         title: The New Turing Omnibus
 *         story: Scientific articles
 *         last_modified: 1644040240349
 *         _id: 2e5d6f969dd940f485565e048b790a55
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PutContent:
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
 * components:
 *   schemas:
 *     PostContent:
 *       type: object
 *       required:
 *         - title
 *         - story
 *       properties:
 *         title:
 *           type: string
 *           description: The content title
 *         story:
 *           type: string
 *           description: The content
 *       example:
 *         title: Charlotte's Web 
 *         story: children's literature by American author E. B. White and illustrated by Garth Williams
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InteractionResponse:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The content title
 *         story:
 *           type: string
 *           description: The content
 *         last_modified:
 *            type: string
 *            description: The content last_modified tag
 *         _id: 
 *            type: string
 *            description: The content id
 *         totalInteractions: 
 *            type: string
 *            description: The content's total interaction
 *       example:
 *         title: Charlotte's Web 
 *         story: children's literature by American author E. B. White and illustrated by Garth Williams
 *         last_modified: 1644044448832,
 *         _id: 9f42d719cbc14680b0d6976d9c61d0e5,
 *         totalInteractions: 1
 * 
 */



 /**
  * @swagger
  * tags:
  *   name: Content
  *   description: The content service API
  */








/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new content
 *     tags: [Content]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostContent'
 *     responses:
 *       201:
 *         description: The content has been added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       500:
 *         description: Some server error
 */


routes.post('/', async (req, res) => {
    const { title, story } = req.body;
  const last_modified = Date.now();
      const response = await addContent(title, story, last_modified);
  if (Object.keys(response).length != 0) {
    res.status(201).send(response);
  } else {
    res.status(500).send("Data was not added . Error ! ");
  }
});


/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get the content by id
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The content id
 *     responses:
 *      200:
 *       description: The content has been added
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Content'   
 *      404:
 *        description: The content was not found
 */
routes.get('/:id', async (req, res) => {
    const id = req.params.id;
    const content = await getContentbyId(id);
  if (content == 404) {
    res.status(404).send("Content not found");
  }
  else {
    res.status(200).send(content);
   }
});





/**
 * @swagger
 * /{id}:
 *  put:
 *    summary: Update the content by the id
 *    tags: [Content]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The content id
 *      - in: query
 *        name: title
 *        schema:
 *          type: string
 *        description: The title of content
 *      - in: query
 *        name: story
 *        schema:
 *          type: string
 *        description: The content of story
 *    responses:
 *      201:
 *        description: The content has been added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PutContent'             
 *      404:
 *        description: The content was not found
 *      500:
 *        description: Some error happened
 */



routes.put('/:id', async (req, res) => {
    const { title, story } = req.query;
    const id = req.params.id;
    const last_modified = Date.now();
  const result = await updateContent(id, title, story, last_modified);
  console.log(result);
  if (result == 404) {
    res.status(404).send("Content was not found! Error");
  }
  else if (result == 500) {
    res.status(500).send("Server Error!!");
  }
  else {
    res.status(201).send(result);
  }
});




/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Remove the content by id
 *     tags: [Content]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The content id
 * 
 *     responses:
 *       200:
 *         description: The content was deleted
 *       404:
 *         description: The content was not found
 */





routes.delete('/:id', async (req, res) => {
    const id = req.params.id;
  
  const content = await deleteContentbyId(id);
  console.log(content);
  if (content == 404) {
    res.status(404).send("Content not found");
  }
  else {
    res.status(200).send("Content has been deleted");
   }

});







/**
 * @swagger
 * /upload:
 *  post:
 *    summary: Upload csv file to server
 *    tags: [Content]
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              csv:
 *                type: file
 *    responses:
 *      200:
 *        description: The csv file content added in database
 *      500:
 *        description: Some error happened
 */
routes.post("/upload", async (req, res)=> {
  let sampleFile;
  let uploadPath;

  console.log(req);
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.csv;
    console.log(sampleFile.name);
    uploadPath = __dirname +"/files/" +sampleFile.name;
    console.log(uploadPath);

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);
      
    csv()
      .fromFile(uploadPath)
      .then((jsonObj) => {
          jsonObj.map(object => {
              const last_modified = Date.now();
              object.last_modified=last_modified;
              db.content.save([object]);
          });
      });

      // fs.unlink(uploadPath);
      res.send("File uploaded!");
      
  });
});

/**
 * @swagger
 * /sort/new:
 *   get:
 *     summary: Get the content sorted on date
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: The content sorted on date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Content'
 *       404:
 *         description: The content was not found
 */
routes.get("/sort/new", (req, res) => {
    const data = sortedByNew();
    console.log(data);
    res.send(data);
    // res.send("fuck");
});


/**
 * @swagger
 * /sort/interaction:
 *   get:
 *     summary: Get the content sorted on interaction
 *     tags: [Content]
 *     responses:
 *       200:
 *         description: The content sorted on interaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InteractionResponse'
 *       404:
 *         description: The content was not found
 */
routes.get("/sort/interaction", async (req, res) => {
    const interaction = await getInteractions();
    res.send(interaction);
});

module.exports = routes;