const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', (socket) =>  {
  console.log('NEW USER CONNECTED!!!!')

  socket.on('chat', message => {
    io.emit('chat', message)
  })

  socket.on('disconnect', data => {
    console.log('USER DISCONNECT')
  })

})

http.listen(PORT, () => {
  console.log('Server on port ', PORT)
})
