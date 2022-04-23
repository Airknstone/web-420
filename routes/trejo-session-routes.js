/*
 Title: trejo-session-routes.js
 Author: Professor Krasso
 Date: 04-21-2022
 Modified By: Allan Trejo
 Description: openapi documentation and restful endpoints for User Login
*/
/* Imports */
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/trejo-user');
/* Globals */
const router = express.Router();

const saltRounds = 10;
/**
 * Signup
 * @swagger
 * /api/signup:
 *   post:
 *     tags:
 *       - User Login
 *     description: Registers a new User
 *     requestBody:
 *       description: 3 parameters required to post a new user
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - Password
 *               - emailAddress
 *             properties:
 *               userName:
 *                 description: name of new user, must be unique
 *                 type: string
 *               Password:
 *                 description: Password of new user
 *                 type: string
 *               emailAddress:
 *                 description: email address of new user
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Registered User
 *       '401':
 *         description: Username is Already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/signup', function (req, res) {
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      /* Checks if user exist. If do not exist, create an new user
        else user must exist
        */
      if (!user) {
        let hashPassword = bcrypt.hashSync(req.body.Password, saltRounds);
        let newRegisteredUser = {
          userName: req.body.userName,
          Password: hashPassword,
          emailAddress: req.body.emailAddress,
        };
        User.create(newRegisteredUser, function (err, user) {
          if (err) {
            res.status(501).send('MongoDB Exception');
          } else {
            res.json(user);
          }
        });
      }
      if (user) {
        res.status(401).send('Username is Already in use.');
      }
    });
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});

/*****
 * login
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - User Login
 *     description: User login
 *     requestBody:
 *       description: 2 properties required for login
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - Password
 *             properties:
 *               userName:
 *                 description: Users username
 *                 type: string
 *               Password:
 *                 description: Users Password
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *
 */
router.post('/login', function (req, res) {
  /* Try catch if fail  */
  try {
    User.findOne({ userName: req.body.userName }, function (err, user) {
      if (err) {
        res.status(501).send('MongoDB Exception');
      } else if (user) {
        /* Compares password to registerd password */
        let passwordIsValid = bcrypt.compareSync(
          req.body.Password,
          user.Password
        );
        if (passwordIsValid) {
          res.status(200).send('User logged in');
        } else {
          res.status(401).send('Invalid username and/or Password');
        }
      } else if (!user) {
        res.status(401).send('Invalid username and/or Password');
      }
    });
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});

/* Exports */
module.exports = router;
