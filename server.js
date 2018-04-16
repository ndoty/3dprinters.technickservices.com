//server.js
'use strict'

//first we import our dependencies...
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Printer = require('./model/printers');
var secrets = require('./secrets');

//and create our instances
var app = express();
var router = express.Router();

//set our port to either a predetermined port number if you have set it up, or 3001
var port = process.env.API_PORT || 3001;

//db config -- set your URI from mLab in secrets.js
var mongoDB = secrets.requestSecret('db_uri');
mongoose.connect(mongoDB, { useMongoClient: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//now we should configure the APi to use bodyParser and look for JSON data in the body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');

  //and remove cacheing so we get the most recent printers
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//now  we can set the route path & initialize the API
router.get('/', function (req, res) {
  res.json({ message: 'API Initialized!' });
});

//adding the /printers route to our /api router
router.route('/printers')
  //retrieve all printers from the database
  .get(function (req, res) {
    //looks at our Printer Schema
    Printer.find(function (err, printers) {
      if (err)
        res.send(err);
      //responds with a json object of our database printers.
      res.json(printers)
    });
  })
  //post new printer to the database
  .post(function (req, res) {
    var printer = new Printer();
    (req.body.cssId) ? printer.cssId = req.body.cssId : null;
    (req.body.printerName) ? printer.printerName = req.body.printerName : null;
    (req.body.url) ? printer.url = req.body.url : null;
    (req.body.apiKey) ? printer.apiKey = req.body.apiKey : null;

    printer.save(function (err) {
      if (err)
        res.send(err);
      res.json({ message: 'Printer successfully added!' });
    });
  });

//Adding a route to a specific printer based on the database ID
router.route('/printers/:printer_id')
  //The put method gives us the chance to update our printer based on the ID passed to the route
  .put(function (req, res) {
    Printer.findById(req.params.printer_id, function (err, printer) {
      if (err)
        res.send(err);
      //setting the new author and text to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.cssId) ? printer.cssId = req.body.cssId : null;
      (req.body.printerName) ? printer.printerName = req.body.printerName : null;
      (req.body.url) ? printer.url = req.body.url : null;
      (req.body.apiKey) ? printer.apiKey = req.body.apiKey : null;
      //save printer
      printer.save(function (err) {
        if (err)
          res.send(err);
        res.json({ message: 'Printer has been updated' });
      });
    });
  })
  //delete method for removing a printer from our database
  .delete(function (req, res) {
    //selects the printer by its ID, then removes it.
    Printer.remove({ _id: req.params.printer_id }, function (err, printer) {
      if (err)
        res.send(err);
      res.json({ message: 'Printer has been deleted' })
    })
  });

//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function () {
  console.log(`api running on port ${port}`);
});
