// //
// // # SimpleServer
// //
// // A simple chat server using Socket.IO, Express, and Async.
// //
// var http = require('http');
// var path = require('path');

// var async = require('async');
// var socketio = require('socket.io');
// var express = require('express');

// //
// // ## SimpleServer `SimpleServer(obj)`
// //
// // Creates a new instance of SimpleServer with the following options:
// //  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
// //
// var router = express();
// var server = http.createServer(router);
// var io = socketio.listen(server);

// router.use(express.static(path.resolve(__dirname, 'client')));
// var messages = [];
// var sockets = [];

// io.on('connection', function (socket) {
//     messages.forEach(function (data) {
//       socket.emit('message', data);
//     });

//     sockets.push(socket);

//     socket.on('disconnect', function () {
//       sockets.splice(sockets.indexOf(socket), 1);
//       updateRoster();
//     });

//     socket.on('message', function (msg) {
//       var text = String(msg || '');

//       if (!text)
//         return;

//       socket.get('name', function (err, name) {
//         var data = {
//           name: name,
//           text: text
//         };

//         broadcast('message', data);
//         messages.push(data);
//       });
//     });

//     socket.on('identify', function (name) {
//       socket.set('name', String(name || 'Anonymous'), function (err) {
//         updateRoster();
//       });
//     });
//   });

// function updateRoster() {
//   async.map(
//     sockets,
//     function (socket, callback) {
//       socket.get('name', callback);
//     },
//     function (err, names) {
//       broadcast('roster', names);
//     }
//   );
// }

// function broadcast(event, data) {
//   sockets.forEach(function (socket) {
//     socket.emit(event, data);
//   });
// }

// server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
//   var addr = server.address();
//   console.log("Chat server listening at", addr.address + ":" + addr.port);
// });
'use strict'

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session')
var routes = require('./app/routes/index.js');



require('dotenv').load();
require('./app/config/passport')(passport);
mongoose.connect(process.env.MONGODB_URI);

app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/services', express.static(process.cwd() + '/app/services'));
app.use('/client', express.static(process.cwd() + '/client'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
    secret:'talkSweet',
    resave:false,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app,passport);

var port = process.env.PORT || 8080;

var io = require('socket.io').listen(app.listen(port));

//Whenever someone connects this gets executed
io.on('connection', function(socket){
    console.log('A user connected');
    //a stock is added by a user
    socket.on('stock added', function (data) {
		io.sockets.emit('send stock',data);
    });
    // a stock is deleted by a user
    socket.on('stock deleted', function (data) {
		io.sockets.emit('delete stock',data);
    });
    //a stock is updated by a user
    socket.on('stock updated', function (data) {
		io.sockets.emit('update stock',data);
    });
    
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

});