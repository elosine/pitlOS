var express = require('express');
var app = require('express')();
var path = require('path');


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

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
