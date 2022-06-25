const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const people = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on('person', (msg)=>{
    people[socket.id]=msg;
  })

  socket.on('chat message', (msg)=>{
    console.log('chat message: ' +  msg);
    io.emit('chat message', msg, people[socket.id]);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected.");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
