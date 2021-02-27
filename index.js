const WebSocket = require('ws')

const port = process.env.PORT || 3000
const wss = new WebSocket.Server({ port })

wss.getUniqueID = function () {
  function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4();
};

wss.on('connection', ws => {
  ws.id = wss.getUniqueID();

  ws.on('message', message => {
    const decoded = JSON.parse(message)
    console.log(`Received message => ${decoded.message}`)
    wss.clients.forEach(client => client.send(JSON.stringify({type: 'message', data: decoded.data, uuid: decoded.uuid})))
  })

  ws.on('close', function (client) {
    console.log(client)
  })

  // Sends back to client the client identifier
  ws.send(JSON.stringify({type: 'identifier', data: ws.id}))
})