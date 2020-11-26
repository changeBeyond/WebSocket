const WebSocket = require('ws');

function noop() {}
function heartbeat() {
  this.isAlive = true;
}
let port = 8080
const wss = new WebSocket.Server({ port: port });

wss.on('connection', function connection(ws) {
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    //ws.send(message);
    wss.clients.forEach(function each(iws) {
      if (iws.isAlive === true) iws.send(message);
    });
  });
  let count = 0;
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === true) count++;
  });
  console.log("现在有 ", count, " 台设备连接");
});
console.log("Running at http://localhost:", port);

