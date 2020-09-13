const express = require('express');
const initRoutes = require("./routes");
const path = require("path");

require('./database/config/index')

const app = express();
const PORT = 3333;

//Socket configs
const socketIo = require("socket.io");
const server = require('http').createServer(app)
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("new connection ")
})

server.listen(PORT, () => {console.log(`listening at: http://localhost:${PORT}`)});
///////////

app.use(express.json());
app.use("/api", initRoutes(io));

app.get("/dist/bundle.js", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/dist/bundle.js'));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
