const socket = io()
const chat = document.querySelector('.chat-form')
const input = document.querySelector('.chat-input')
const chatWindow = document.querySelector('.chat-window')

chat.addEventListener('submit', event => {
  event.preventDefault()
  socket.emit('chat', input.value)
  input.value = ''
})

const renderMessage = message => {
  const div = document.createElement('div')
  div.classList.add('render-message')
  div.innerText = message
  chatWindow.appendChild(div)
}

socket.on('chat', message => {
  console.log('MESSAGE SERVER', message)
  renderMessage(message)
})

