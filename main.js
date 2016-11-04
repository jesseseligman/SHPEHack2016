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

app.post('/locations', function(req, res) {
  var user = req.body.user;
  var coords = req.body.coords;

  // fs.readFile('./location.json', 'utf8', function readFileCallback(err, data){
  //   if (err){
  //       console.log(err);
  //   }
  //   else {
  //     obj = JSON.parse(data); //now it an object
  //     obj.table.push({id: 2, square:3}); //add some data
  //     json = JSON.stringify(obj); //convert it back to json
  //     fs.writeFileSync('myjsonfile.json', json, 'utf8', callback); // write it back
  //   });
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
