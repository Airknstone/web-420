/*
 Title: app.js
 Author: Professor Krasso
 Date: 03/17/2022
 Modified By: Allan Trejo
 Description: Intro to RESTful api
 
*/

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const composerAPI = require('./routes/trejo-composer-routes.js');
const logger = require('morgan');
/************* 1
BEGIN DATABASE CON1NECTIONS 
***********************************/
// Store database connection as a string
const mongoDB = `mongodb+srv://web420_user:1234@ems.a7w7c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
//   Connect to url
mongoose.connect(mongoDB);

// wait for return response
mongoose.Promise = global.Promise;

// store connection as variable
var db = mongoose.connection;

// On Error event
db.on('error', console.error.bind(console, 'MongoDB connected error: '));

// once opened / sucsessful
db.once('open', function () {
  console.log('Application connected to MongoDB Atlas Cluster');
});

/* Initialize Express */
var app = express();
app.use(logger('short'));
/* set app port to connect to port 3000  */
app.set('port', process.env.PORT || 3000);

/* This is a built-in middleware function in Express. 
It parses incoming requests with JSON payloads and is 
based on body-parser. */
app.use(express.json());

/* The express.urlencoded() function is a built-in middleware function 
in Express. It parses incoming requests with urlencoded payloads and is 
based on body-parser */
app.use(express.urlencoded({ extended: true }));

/* object that defines  */
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WEB 420 RESTful APIs',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

/* This library reads your JSDoc-annotated source code and generates an OpenAPI (Swagger) specification. */
const openapiSpecification = swaggerJsdoc(options);

/* Configure express to use /api-docs route to serve swaggerJsdoc  */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', composerAPI);
/* Create server and serve application on port 3000 */
http.createServer(app).listen(app.get('port'), function () {
  console.log('Application started on port ' + app.get('port'));
});
