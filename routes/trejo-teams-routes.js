/*
 Title: trejo-teams-routes.js
Author: Professor Krasso
Date: 05 13 2022
Modified By: Allan Trejo
Description:  Capstone Project
Define 4 APIS endpoints for TEAM Model
*/

/* Imports */
const express = require('express');
const router = express.Router();
const Teams = require('../models/trejo-teams');

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Teams
 *     description: Returns array of all teams
 *     summary: finds all teams and returns an array of team documents
 *     responses:
 *       '200':
 *         description: Array of team documents.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */

router.get('/teams', function (req, res) {
  try {
    Teams.find({}, function (err, teams) {
      if (err) {
        res.status(501).send({ error: `MongoDB Exception! ${error}` });
        return;
      } else {
        res.status(200).json({
          message: 'Array of team Documents',
          team: teams,
        });
      }
    });
  } catch (error) {
    res.status(500).send({ error: `Server Exception! ${error}` });
    console.log(error);
  }
});

/** assignPlayerToTeam
 * @openapi
 * /api/teams/{id}/players:
 *   post:
 *     tags:
 *       - Teams
 *     description: Creats a player and adds it to a team
 *     summary: Post player object to Team document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of team
 *         schema:
 *           type: string
 *     requestBody:
 *       description: 3 parameters of player schema
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - salary
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: first name of player
 *               lastName:
 *                 type: string
 *                 description: last name of player
 *               salary:
 *                 type: number
 *                 description: salary of player
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB User
 *       '401':
 *         description: Invalid TeamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 *   */

router.post('/teams/:id/players', function (req, res) {
  try {
    const id = req.params.id;
    Teams.findOne({ _id: id }, function (err, team) {
      if (team) {
        const player = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          salary: req.body.salary,
        };
        team.players.push(player);
        team.save();
        res.status(200).json({
          message: 'Player Added Document',
          player: player,
        });
      } else if (!team) {
        res.status(401).send('Invalid teamId');
      } else {
        res.status(501).send({ error: `MongoDB Exception! ${error}` });
      }
    });
  } catch (error) {
    res.status(500).send({ error: `Server Exception! ${error}` });
  }
});

/**findAllPlayersByTeamId
 * @openapi
 * /api/teams/{id}/players:
 *   get:
 *     tags:
 *       - Teams
 *     summary: returns all players of a team
 *     description: finds a team by id and returns its players
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of team
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *          description: Array of player documents
 *       '401':
 *          description: Invalid teamID
 *       '500':
 *          description: Server Exception
 *       '501':
 *          description: MongoDB Exception
 *  */

router.get('/teams/:id/players', function (req, res) {
  try {
    const id = req.params.id;
    Teams.findOne({ _id: id }, function (err, team) {
      if (team) {
        res.status(200).json({
          message: 'Array of player Documents',
          players: team.players,
        });
      } else if (!team) {
        res.status(401).send('Invalid teamId');
      } else {
        res.status(501).send({ error: `MongoDB Exception! ${error}` });
      }
    });
  } catch (error) {
    res.status(500).send({ error: `Server Exception! ${error}` });
  }
});

/** deleteTeamById
 * @openapi
 * /api/teams/{id}:
 *   delete:
 *     tags:
 *       - Teams
 *     summary: Deletes Team from Collection
 *     description: Deletes team by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id of team
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *          description:  Team document
 *       '401':
 *          description: Invalid teamID
 *       '500':
 *          description: Server Exception
 *       '501':
 *          description: MongoDB Exception
 */

router.delete('/teams/:id', function (req, res) {
  try {
    const id = req.params.id;
    Teams.findByIdAndDelete({ _id: id }, function (err, team) {
      if (team) {
        res.status(200).json({
          message: 'Team Document',
          Deleted: team,
        });
      } else if (!team) {
        res.status(401).send('Invalid teamId');
      } else {
        res.status(501).send({ error: `MongoDB Exception! ${error}` });
      }
    });
  } catch (error) {
    res.status(500).send({ error: `Server Exception! ${error}` });
  }
});

/** addTeam
 * @openapi
 * /api/teams:
 *   post:
 *     tags:
 *       - Teams
 *     summary: Add a Team to collection
 *     description: adds a team with 2 parameters
 *     requestBody:
 *       description: 2 params  name, mascot required to post
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               mascot:
 *                 type: string
 *     responses:
 *       '200':
 *          description: add team
 *       '500':
 *          description: Server Exception
 *       '501':
 *          description: MongoDB Exception
 */
router.post('/teams', function (req, res) {
  try {
    let newTeam = new Teams({
      name: req.body.name,
      mascot: req.body.mascot,
    });
    Teams.create(newTeam, function (err, addTeam) {
      if (err) {
        res.status(501).send('MongoDB Exception');
      } else {
        res.json(addTeam);
      }
    });
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});
module.exports = router;
