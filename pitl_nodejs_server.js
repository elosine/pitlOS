var express = require('express');
var app = require('express')();
var path = require('path');



var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var  ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';





server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port )
});

//Set Up Static File Serving
app.use(express.static(path.join(__dirname, '/public')));
//Launch 'index.html'
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//start http server
app.listen(4321, function() {
  console.log('listening on *:4321');
});
