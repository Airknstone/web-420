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
 * getComposerById
 * @swagger
 * /api/composers/{id}:
 *   get:
 *      tags:
 *        - Composers
 *      description: reads and returns a composer document
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

/** updateComposerById
 * @swagger
 * /api/composers/{id}:
 *   put:
 *     tags:
 *       - Composers
 *     summary: Updates composer object by selecting Id
 *     description: Updates first name and last name of a composer
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the composer to return
 *         schema:
 *           type: string
 *     requestBody:
 *       description: 2 params first name, last name required to post
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *          description: Array of composer documents
 *       '401':
 *          description: Invalid composerId
 *       '500':
 *          description: Server Exception
 *       '501':
 *          description: MongoDB Exception
 */
router.put('/composers/:id', function (req, res) {
  try {
    const id = req.params.id;
    Composer.findOne({ _id: id }, function (err, composerById) {
      if (composerById) {
        res.status(200).send('Array of composer documents');
        composerById.set({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        composerById.save();
      } else if (!composerById) {
        res.status(401).send('Invalid composerId');
      } else {
        res.status(501).send({ error: `MongoDB Exception! ${error}` });
      }
    });
  } catch (error) {
    res.status(500).send({ error: `Server Exception! ${error}` });
  }
});

/**
 * deleteComposerById
 * @swagger
 * /api/composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     summary: Finds composer by Id and deletes entry
 *     description: Deletes Composer Document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id parameter
 *         schema:
 *           type: string
 *
 *     responses:
 *       '200':
 *          description: Composer Document
 *       '500':
 *          description: Server Exception
 *       '501':
 *          description: MongoDB Exception
 */
router.delete('/composers/:id', function (req, res) {
  try {
    const id = req.params.id;
    Composer.findByIdAndDelete({ _id: id }, function (err, composer) {
      if (composer) {
        res.status(200).send(`Deleted: ${composer}`);
      } else {
        res.status(501).send({ error: `MongoDB Exception! ${err}` });
      }
    });
  } catch (error) {
    res.status(500).send({ error: `Server Exception! ${error}` });
  }
});

/* The module.exports is a special object which is included in every 
JavaScript file in the Node.js application by default. The module is a 
variable that represents the current module, and exports is an object that 
will be exposed as a module. So, whatever you assign to module.exports will be 
exposed as a module. */
module.exports = router;
