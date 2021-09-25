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
    console.log("what socket", socket);
    console.log("Active");

    socket.on("chat", (payload) => {
        console.log("what payload", payload);
        io.emit("chat", payload);
    });
});

server.listen(5000, () => {
    console.log("Server  is connected in 5000");
});

const cors = require("cors");

const mongo = require("./Shared/mongo");
const loginRoute = require("./Routes/login.route");

app.listen(process.env.PORT, () => {
    console.log(`Connected to ${process.env.PORT} port`);
})

async function loadApp() {
    try {
        await mongo.connect();
        app.use(cors());
        app.use(express.json());
        app.use("/", loginRoute);
    }
    catch (err) {
        console.error(err);
        process.exit();
    }
}

loadApp();