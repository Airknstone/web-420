/*
 Title: trejo-composer-routes.js
 Author: Professor Krasso
 Date: 04/10/2022
 Modified By: Allan Trejo
 Description: openapi documentation and restful endpoints
*/

const express = require('express');
const router = express.Router();
const Composer = require('../models/trejo-composer.js');

/**
 * findAllComposers
 * @swagger
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: Reads, Retrieves all composers within database
 *     responses:
 *       '200':
 *         description: Array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/composers', (req, res) => {
  try {
    /* Mongoose find one function */
    Composer.find({}, function (err, composers) {
      if (err) {
        res.status(501).send('MongoDB Exception');
      } else {
        res.json(composers);
      }
    });
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});

/**
 * createComposer
 * @swagger
 * /api/composers/{id}:
 *   get:
 *      tags:
 *        - Composers
 *      description: Reads, Retrieves composers within database
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          description: The ID of the composer to return
 *          schema:
 *            type: string
 *      responses:
 *           '200':
 *               description: Returns  Composer with corresponding Id
 *           '500':
 *               description: Server Exception
 *           '501':
 *               description: MongoDB Exception
 */
router.get('/composers/:id', function (req, res) {
  try {
    var id = req.params.id;
    Composer.findOne({ _id: id }, function (err, composer) {
      if (err) {
        res.status(501).send('MongoDB Exception');
      } else {
        res.json(composer);
      }
    });
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});

/**
 * createComposer
 * @swagger
 * /api/composers:
 *  post:
 *     tags:
 *       - Composers
 *     description: Adds new Composer Object to Databse
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: composer object
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 description: first name of composer
 *                 type: string
 *               lastName:
 *                 description: last name of composer
 *                 type: string
 *     responses:
 *       '200':
 *         description: Created new composer Object
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *
 */

router.post('/composers', function (req, res) {
  try {
    console.log(req.body);
    let composer = new Composer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    Composer.create(composer, function (err, addCompser) {
      if (err) {
        res.status(501).send('MongoDB Exception');
      } else {
        res.json(addCompser);
      }
    });
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});
/* The module.exports is a special object which is included in every 
JavaScript file in the Node.js application by default. The module is a 
variable that represents the current module, and exports is an object that 
will be exposed as a module. So, whatever you assign to module.exports will be 
exposed as a module. */
module.exports = router;
