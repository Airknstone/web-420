/* Title: trejo-customer.js
Author: Professor Krasso
Date: 05 01 2022
Modified By: Allan Trejo
Description: Customer API Schema Using Mongoose
 */

/* Imports */
const mongoose = require('mongoose');
/* globals */
const Schema = mongoose.Schema;
/* Schema models for customer API*/
const lineItemSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const invoiceSchema = new Schema({
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  dateCreated: { type: String, required: true },
  dateShipped: { type: String, required: true },
  lineItems: [lineItemSchema],
});

const customerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  invoices: [invoiceSchema],
});
/* Export */
module.exports = mongoose.model('Customer', customerSchema);
