/* Title: trejo-user.js
Author: Professor Krasso
Date: 04 21 2022
Modified By: Allan Trejo
Description:  Schema for user login
 */

/* Imports */
const mongoose = require('mongoose');
/* globals */
const Schema = mongoose.Schema;
/* Schema model */
const userSchema = new Schema({
  userName: { type: String, required: true },
  Password: { type: String, required: true },
  emailAddress: { type: Array, required: true },
});

/* Export */
module.exports = mongoose.model('User', userSchema);
