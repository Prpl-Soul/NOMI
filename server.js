const http = require('http');
const app = require('./app');


const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

//for websocket
/*
const webSocketServer = require('websocket').server;
const wsServer = new webSocketServer({
  httpServer: server
});

// I'm maintaining all active connections in this object
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {

  console.log(request)

  var userID = getUniqueID();
  //console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  //console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))

  connection.on('message', function(message) {
    console.log(message)
 });

 // user disconnected
  connection.on('close', function(connection) {
    delete clients[userID];
  });
});
*/

/*
function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

const wss = new WebSocket.Server({ server:server });
CLIENTS=[];


wss.on('connection', function connection(ws,req) {
//  CLIENTS.push(ws);
  var cookies=parseCookies(req)
  if(typeof cookies.token !== 'undefined')
  {
    const decodedToken = jwt.verify(cookies.token, '1019833676a0024967e46901');
    var userId = decodedToken.userId;
    CLIENTS[userId]=ws
  }

  var i=0
  for (var key in CLIENTS) {
     if(CLIENTS[key].readyState !== WebSocket.OPEN)
        CLIENTS.splice(i, 1);
     i++
  }

  /*
  var filtered = CLIENTS.filter(function(value, index, arr){
        return CLIENTS[index].readyState === Websocket.OPEN;
    })
  CLIENTS=[...filtered]
  */
  //ws.on('message', function incoming(message) {
    //var cookies=parseCookies(req)
    //const decodedToken = jwt.verify(cookies.token, '1019833676a0024967e46901');
    //var userId = decodedToken.userId;

    //for (var i=0; i<CLIENTS.length; i++) {
        //CLIENTS[i].send("Message: " + message);
    //}

    //ws.send('something');
  //});

/*
});


//for WebSocket
module.exports = {wss:wss,clients:CLIENTS};
//
*/
