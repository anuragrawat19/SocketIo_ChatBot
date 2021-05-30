// Node server that handle Socket Io connections
const fs = require('fs')
const express = require('express');

const app = express();
const server = require('http').Server(app);
app.use(express.static('static'))



app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});


const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });




const users = {};

io.on('connection',socket=>{ // When connection is made
    socket.on('newuser-joined',name=>{   // If new user joins the chat newuser-joined event will be called
        console.log("New User ",name)
        users[socket.id] = name;

        socket.broadcast.emit('user-joined',name); // Other users get the Notification ki new user join huwa hai
    });

    // event for sending the message
    socket.on("send",message=>{
        socket.broadcast.emit("recieve",{message:message,name:users[socket.id]})
        
    })

    // Event for any user leaving the chat
    socket.on("disconnect",message=>{
        socket.broadcast.emit("left",users[socket.id])
        delete users[socket.id]
        
    })

})




port = 7000
server.listen(port, function() {
    console.log(`listening on *:${port}`);
 });
