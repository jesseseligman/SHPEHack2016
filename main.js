'use strict';

const express = require('express');
const port = process.env.PORT || 8000;
const path = require('path');
var fs = require("fs");

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/locations', function(req, res) {
  var locations = fs.readFileSync("./location.json");
  console.log(JSON.parse(locations));
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
