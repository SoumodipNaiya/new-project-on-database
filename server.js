const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const user = require('./controller/users');
const geojson = require('./controller/geojson');
const mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());
app.use(function(req, res, next) {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
   next();
});

// mongoose.connect('mongodb://localhost/db6',()=>{
// console.log('Database connected for db6');
// });




mongoose.connect('mongodb://localhost/database',{useNewUrlParser: true}, ()=>{
    
    console.log('Database Connected for database');
    });
var db = mongoose.connection;
db.once('open',function(){
   console.log('connect to mongodb');
})
db.on('error',function(err){
   console.log(err +'err in create db');
})

const PORT = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.set('useCreateIndex', true);


app.get('/checking', function(req, res){
   res.json({
      "message": " JWT "
   });
});

app.use('/', user);
app.use('/',geojson);


//const PORT = 3001;


app.listen(PORT, function(){
   console.log('Server is running on Port',PORT);
});

// var app = require('../app');
// var debug = require('debug')('tsj-server:server');
// var http = require('http');

// /**
//  * Get port from environment and store in Express.
//  */

// var port = normalizePort(process.env.PORT || '3001');
// app.set('port', port);
// console.log('server is runnng on '+port);

// /**
//  * Create HTTP server.
//  */

// var server = http.createServer(app);

// /**
//  * Listen on provided port, on all network interfaces.
//  */

// server.listen(port);
// server.on('error', onError);
// server.on('listening', onListening);

// /**
//  * Normalize a port into a number, string, or false.
//  */

// function normalizePort(val) {
//   var port = parseInt(val, 10);

//   if (isNaN(port)) {
//     // named pipe
//     return val;
//   }

//   if (port >= 0) {
//     // port number
//     return port;
//   }

//   return false;
// }

// /**
//  * Event listener for HTTP server "error" event.
//  */

// function onError(error) {
//   if (error.syscall !== 'listen') {
//     throw error;
//   }

//   var bind = typeof port === 'string'
//     ? 'Pipe ' + port
//     : 'Port ' + port;

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(bind + ' requires elevated privileges');
//       process.exit(1);
//       break;
//     case 'EADDRINUSE':
//       console.error(bind + ' is already in use');
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

// /**
//  * Event listener for HTTP server "listening" event.
//  */

// function onListening() {
//   var addr = server.address();
//   var bind = typeof addr === 'string'
//     ? 'pipe ' + addr
//     : 'port ' + addr.port;
//   debug('Listening on ' + bind);
// }

 module.exports = app;