/* Title: trejo-teams.js
Author: Professor Krasso
Date: 05 13 2022
Modified By: Allan Trejo
Description:  Capstone Project
Define Teams schema using ORD specification
 */

/* Imports */
const mongoose = require('mongoose');
/* globals */
const Schema = mongoose.Schema;

/* Player  model */
const playerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salary: { type: Number, required: true },
});
/* Team model */
const teamSchema = new Schema({
  name: { type: String, required: true },
  mascot: { type: String, required: true },
  players: [playerSchema],
});

/* Export */
module.exports = mongoose.model('Teams', teamSchema);
