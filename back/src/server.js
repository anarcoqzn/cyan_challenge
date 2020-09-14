const express = require('express');
const initRoutes = require("./routes");
const path = require("path");
const dotenv = require('dotenv')
dotenv.config()

const db = require("./models/index")

const app = express();
const PORT = process.env.PORT | 3333;

//Socket configs
const socketIo = require("socket.io");
const server = require('http').createServer(app)
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("new connection ")
})

///////////

app.use(express.json());
app.use("/api", initRoutes(io));

app.get("/dist/bundle.js", function(req, res) {
    res.sendFile(path.join(__dirname + '/../front/dist/bundle.js'));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + '/../front/index.html'));
});

server.listen(PORT, () => {console.log(`listening at: http://localhost:${PORT}`)});