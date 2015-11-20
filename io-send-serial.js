var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('connect');
  socket.on('scanData', function(data){ //scenario has been created
    console.log('scanDataReceived',data);
    io.emit('forwardScanData', data); //add the scenario to the world map
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
var portName = "/dev/cu.usbmodem1421";

var sp = new SerialPort(portName, {
  //parser: serialport.parsers.readline("\n")
  parser: serialport.parsers.raw
});


sp.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    sp.on('data', function(data) {
      console.log('data received: ' + String(data));
      io.emit('scanData',String(data));
    });
  }
});
