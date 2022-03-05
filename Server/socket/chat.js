// chat.js
  module.exports = (io, socket) => {
    //Future socket listeners will be here
    socket.on('new user', (username) => {
      console.log(`${username} has joined the chat! ✋`);
      io.emit("new user", username);
    })
  }