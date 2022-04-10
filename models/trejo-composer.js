/* Title: trejo-composer.js
Author: Professor Krasso
Date: 04 09 2022
Modified By: Allan Trejo
Description: Composer Schema for mongodb
 */

/* Imports */
const mongoose = require('mongoose');
/* globals */
const Schema = mongoose.Schema;
/* Schema model */
const composerSchmea = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
/* Export */
module.exports = mongoose.model('Composer', composerSchmea);
