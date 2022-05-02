/*
 Title: trejo-node-shopper-routes.js
 Author: Professor Krasso
 Date: 04 30 2022
 Modified By: Allan Trejo
 Description: openapi/swagger documentation and restful endpoints
              3 Customer API endpoints, 
              Creates a new Customer with a userName
              Finds customer by userName then adds invoices of items to purchase
              finds invoices by username
*/

/* Imports */
const express = require('express');
const router = express.Router();
const Customer = require('../models/trejo-customer.js');

/**
 * createCustomer
 * @swagger
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     description: Creates a new customer with post
 *     requestBody:
 *       description: 3 params required
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: first name of new customer
 *               lastName:
 *                 type: string
 *                 description: last name of new customer
 *               userName:
 *                 type: string
 *                 description: user name of new customer
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB User
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers', function (req, res) {
  try {
    const newCustomer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
    });

    Customer.create(newCustomer, function (err, customer) {
      if (err) {
        res.status(501).send('MongoDB Exception');
      } else {
        res.json(customer);
      }
    });
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});

/**
 * createInvoiceByUserName
 *  @swagger
 *  /api/customers/{userName}/invoices:
 *    post:
 *      tags:
 *        - Customers
 *      description: first finds customer and if exists attaches invoices
 *      parameters:
 *        - name: userName
 *          in: path
 *          required: true
 *          description: 1 parameter, username
 *          schema:
 *            type: string
 *      requestBody:
 *        description: 5 params required
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - subtotal
 *                - tax
 *                - dateCreated
 *                - dateShipped
 *                - lineItems
 *              properties:
 *                subtotal:
 *                  type: string
 *                  description: subtotal of items
 *                tax:
 *                  type: string
 *                  description: taxes
 *                dateCreated:
 *                  type: string
 *                  description: Date invoice was created
 *                dateShipped:
 *                  type: string
 *                  description: Date item was shipped
 *                lineItems:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      name:
 *                        type: string
 *                      price:
 *                        type: number
 *                      quantity:
 *                        type: number
 *      responses:
 *        '200':
 *          description: Customer added to MongoDB User
 *        '500':
 *          description: Server Exception
 *        '501':
 *          description: MongoDB Exception
 *  */

router.post('/customers/:userName/invoices', function (req, res) {
  try {
    const username = req.params.userName;
    Customer.findOne({ userName: username }, function (err, customer) {
      if (err) {
        res.status(501).send('MongoDB Exception');
      } else {
        res.status(200).send('Customer added to MongoDB');

        const newInvoice = {
          subtotal: req.body.subtotal,
          tax: req.body.tax,
          dateCreated: req.body.dateCreated,
          dateShipped: req.body.dateShipped,
          lineItems: req.body.lineItems,
        };

        customer.invoices.push(newInvoice);
        customer.save();
      }
    });
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});

// findAllInvoicesByUserName

/**
 * findAllInvoicesByUserName
 * @swagger
 * /api/customers/{userName}/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description: API to find all invoices by userName
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/customers/:userName/invoices', function (req, res) {
  try {
    Customer.findOne(
      { userName: req.params.userName },
      function (err, customer) {
        if (err) {
          console.log(err);
          res.status(501).send('MongoDB Exception');
        } else {
          res.json(customer.invoices);
        }
      }
    );
  } catch (error) {
    res.status(500).send('Server Exception');
    console.log(error);
  }
});

/* Exports */
module.exports = router;
