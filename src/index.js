import express from 'express'
import path from 'path'
import routes from './routes/index'

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))
app.use(routes)

io.on('connection', (socket) =>  {
  console.log('NEW USER CONNECTED!!!!')

  socket.on('chat', message => {
    io.emit('chat', message)
  })

  socket.on('disconnect', (data) => {
    console.log('USER DISCONNECT')
  })

})

http.listen(PORT, () => {
  console.log('Server on port ', PORT)
})
