# SERIAL PORT PROTOTYPES #

This prototype contains three separate nodejs applications for use in reading serial port data and communicating it to a front end web application. It demonstrates two different methods of broadcasting the serial data, one using [ws](https://github.com/websockets/ws), and the other using [socket i/o](http://socket.io/).

###Dependencies###

*[node](https://nodejs.org/en/)
*[serialport](https://github.com/voodootikigod/node-serialport) - node module for reading and writing serialport data
*[ws](https://github.com/websockets/ws) - if using the ws library to broadcast serial data
*[express](http://expressjs.com/) and [socket.io](http://socket.io/) if using socket i/o to broadcast serial data

###Files###

*listports.js - this node application simply includes the serialport library, and loops through the ports, logging their pertinent info. It is useful in determining the port name for your specific usb port, which will be necessary in order to read and transmit data from the serial port to your web application.
*serial-ws.js - this node application uses serialport to establish a serial connection and ws to transmit that data to the front end web application (`wsReceiver.html`)
*io-send-serial.js - this node application uses serialport to establish a serial connection and socketio/express to transmit that data to the front end web application (`serialReceiver.html`)
*wsReceiver - receives serial data from `serial-ws.js`
*serialReceiver - receives serial data from `io-send-serial.js`

###Installation###

Install node according to the directions at the nodejs website
CD into this project folder in terminal / command prompt
Run `sudo npm install` to install all dependencies. If you would rather install all the modules globally, make sure to run `node [modulename] -g` for each module instead of the `sudo npm install`

###Running the examples###

*First, make sure you've followed the installation instructions above.
*Then, make sure your serial device is plugged in via USB to your computer and functioning properly.
*This application uses a barcode reader (DS457 Fixed Mount Imager from Zebra Technologies). The barcode reader must be configured with type "CDC COM Port Emulation" by scanning the barcode from the `DS457 Fixed Mount Imager` manual.
*List Ports: run `node listports.js` from this directory in terminal to list all of your ports. Look for something saying `usbmodem` in the `comName` object key to obtain your serial port's name. Uncomment the `//console.log(serialport);` line to get more serialport data, such as the methods available to you with this library, and the types of parsers available for serial data.

####Serial WS####
*run `node serial-ws.js` from this directory in terminal to begin listening for serial data.
*Make sure the name in the `portName` variable matches your port name from listPorts.js.
*If your serial device uses a delimiter between messages, make sure to uncomment the `parsers.readline` line in the code, and input the proper delimiter (\n for newline by default). Also comment out the parsers.raw line
*If you want to communicate on a port other than `8081`, change the `SERVER_PORT` variable
*Load up the `wsReceiver.html` in your web browser and make sure the web console is available. Scan a barcode, and its number should log to your browser console

###IO Send Serial###
*run `node io-send-serial.js` from this directory in terminal to begin listening for serial data.
*Make sure the name in the `portName` variable matches your port name from listPorts.js.
*If your serial device uses a delimiter between messages, make sure to uncomment the `parsers.readline` line in the code, and input the proper delimiter (\n for newline by default). Also comment out the parsers.raw line
*If you want to communicate on a port other than `3000`, change the `SERVER_PORT` variable
*Load up the `serialReceiver.html` in your web browser and make sure the web console is available. Scan a barcode, and its number should log to your browser console
*If you've changed the port in `io-send-serial.js` - you'll need to change the script tag that includes socket.io to read from that port (i.e., change `localhost:3000/socket.io...`) as well as the port in `io.connect('http://localhost:3000')

###Notes###
The serial data is sent as a string to the front end web application - if it is a number, it must be converted there.



