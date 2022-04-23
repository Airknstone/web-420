/* Title: trejo-person.js
Author: Professor Krasso
Date: 04 16 2022
Modified By: Allan Trejo
Description:  Schema for personSchema
 */

/* Imports */
const mongoose = require('mongoose');
/* globals */
const Schema = mongoose.Schema;
/* Schema model */
const roleSchema = new Schema({
  text: { type: String, required: true },
});

const dependantSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  roles: { type: Array, roleSchema, required: true },
  dependents: { type: Array, dependantSchema, required: true },
  birthDate: { type: String, required: true },
});

/* Export */
module.exports = mongoose.model('Person', personSchema);
