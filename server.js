var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const api = require('./routes.js')



const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/unicornsDB', function() {
  console.log("DB connection established!!!");
})


var app = express();
app.use('/unicorns', api)
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
