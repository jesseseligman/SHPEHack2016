'use strict';

const express = require('express');
const port = process.env.PORT || 8000;
const path = require('path');
const fs = require("fs");
const geolib = require('geolib');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/locations', function(req, res) {
  fs.readFile("./location.json", function(err, data) {
    const locations = JSON.parse(data).user1;
    const distance = () => geolib.getDistance({latitude: locations[locations.length - 1].lat, longitude: locations[locations.length - 1].lng}, {latitude: locations[locations.length - 3].lat, longitude: locations[locations.length - 3].lng});
    res.send({ distance: distance(), location: locations[locations.length - 1]});
  });
});


app.post('/locations', function(req, res) {
  var lat = Number.parseFloat(req.body.latitude);
  var lng = Number.parseFloat(req.body.longitude);

  var coords = { lat: lat, lng: lng };
  fs.readFile('./location.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    }
    else {
      var obj = JSON.parse(data); //now it an object
      obj.user1.push(coords); //add some data
      var json = JSON.stringify(obj); //convert it back to json
      fs.writeFile('./location.json', json, 'utf8', function() {
        res.send('success')
      }); // write it back

    }
  });

});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
