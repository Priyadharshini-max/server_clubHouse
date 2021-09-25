const express = require("express");
const app = express();
require("dotenv").config();

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
})

io.on("connection", (socket) => {
    socket.on("chat", (payload) => {
        io.emit("chat", payload);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Connected to ${process.env.PORT} port`);
});
