var serialport = require("serialport");
var WebSocketServer = require('ws').Server;

var SERVER_PORT = 8081;               // port number for the webSocket server
var wss = new WebSocketServer({port: SERVER_PORT}); // the webSocket server
var connections = new Array;          // list of connections to the server

var SerialPort = serialport.SerialPort; // localize object constructor
var portName = "/dev/cu.usbmodem1421";

var sp = new SerialPort(portName, { //parsers are 'raw','readline','byteLength','byteDelimiter'
  //parser: serialport.parsers.readline("\n")
  parser: serialport.parsers.raw
  //parser: serialport.parsers.byteLength(13)
});

sp.open(function (error) {
  if ( error ) {
    console.log('failed to open: '+error);
  } else {
    console.log('open');
    sp.on('data', sendSerialData);
  }
});

function sendSerialData(data) {
  // if there are webSocket connections, send the serial data
  // to all of them:
  console.log('ssd',String(data));
  if (connections.length > 0) {
    broadcast(String(data));
  }
}

function showPortClose() {
   console.log('port closed.');
}
// this is called when the serial port has an error:
function showError(error) {
  console.log('Serial port error: ' + error);
}

function sendToSerial(data) {
  console.log("sending to serial: " + data);
  myPort.write(data);
}

wss.on('connection', handleConnection);

function handleConnection(client) {
 console.log("New Connection"); // you have a new client
 connections.push(client); // add this client to the connections array

 client.on('close', function() { // when a client closes its connection
 console.log("connection closed"); // print it out
 var position = connections.indexOf(client); // get the client's position in the array
 connections.splice(position, 1); // and delete it from the array
 });
}

function broadcast(data) {
 for (myConnection in connections) {   // iterate over the array of connections
  connections[myConnection].send(data); // send the data to each connection
 }
}
