var express = require('express');
var router = express.Router(),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    DataService = require('../dataServices/dataService'),
    mysql = require('mysql'),
    ConnectionProvider = require('./connectionProvider'),
    path = require('path');
    router.use(express.static(path.join(__dirname, 'public')));
var dbOptions = {
     host: 'localhost',
      user: 'root',
      password: 'coder123',
      port: 3306,
      database: 'psytrancr'
};
var serviceSetupCallback = function(connection){
	return {
		dataService : new DataService(connection)
	}
};

var myConnectionProvider = new ConnectionProvider(dbOptions, serviceSetupCallback);
router.use(myConnectionProvider.setupProvider);
router.use(myConnection(mysql, dbOptions, 'pool'));
router.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

/* GET events list */
router.get('/api/eventList', function(req, res, next) {
  req.services(function(err, services){
          var dataService = services.dataService;
          dataService.getEvents(function(err, events){
            res.send(events);
          });
    });
});

router.get('/api/event/:id', function(req, res, next) {
  req.services(function(err, services){
          var dataService = services.dataService;
          var data = req.params.id;
          dataService.getEventById(data, function(err, event){
            dataService.getArtistsByEventId(data, function(err, artists){
              res.send([event, artists]);
            });
          });
    });
});

module.exports = router;
