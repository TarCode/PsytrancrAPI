var express = require('express');
var routes = require('./routes/index'),
    path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;
