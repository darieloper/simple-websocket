const WebSocket = require('ws')

const port = process.env.PORT || 3000
const wss = new WebSocket.Server({ port })

var clients = [];

wss.on('connection', ws => {
  clients.push(ws)
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
    clients.forEach(client => client.send('Sent: ' + message))
  })
  ws.send('ho!')
})