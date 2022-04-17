/*
 Title: trejo-composer-routes.js
 Author: Professor Krasso
 Date: 04/10/2022
 Modified By: Allan Trejo
 Description: openapi documentation and restful endpoints
*/
/* Imports */
const express = require('express');
const Person = require('../models/trejo-person.js');
/* Globals */
const router = express.Router();
/**
 * findAllPersons
 * @swagger
 * /api/persons:
 *   get:
 *     tags:
 *       - Persons
 *     description: Reads, Retrieves all persons within database
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/persons', (req, res) => {
  try {
    /* Mongoose find one function */
    Person.find({}, function (err, persons) {
      if (err) {
        res.status(501).send('MongoDB Exception');
      } else {
        res.json(persons);
      }
    });
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});

/**
 * createPerson
 * @swagger
 * /api/persons:
 *   post:
 *     tags:
 *       - Persons
 *     description: Adds new person object to database
 *     requestBody:
 *       description: Person information
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *               firstName:
 *                 description: first name of person
 *                 type: string
 *               lastName:
 *                 description: last name of person
 *                 type: string
 *               roles:
 *                 description: Roles
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               dependents:
 *                 description: array of dependantSchema
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *               birthDate:
 *                 description: Birthdate of person
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Array of person documents
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/persons', function (req, res) {
  try {
    /* create new Person object and initialize with req body properties */
    let addPerson = new Person({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate,
    });

    /* Attempt to add object to mongodb */
    Person.create(addPerson, function (err, person) {
      if (err) {
        res.status(501).send('MongoDB Exception');
      } else {
        /* Success */
        console.log(person);
        res.json(person);
      }
    });
  } catch (e) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});

module.exports = router;
