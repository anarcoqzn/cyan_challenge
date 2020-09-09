const express = require('express');
const routes = require("./routes");
const path = require("path");

require('./database/config/index')

const app = express();
const PORT = 3333;

app.use(express.json());

app.use("/api", routes);

app.get("/dist/bundle.js", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/dist/bundle.js'));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

app.listen(PORT, () => {console.log(`listening at: http://localhost:${PORT}`)})
