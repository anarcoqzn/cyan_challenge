const express = require('express');
const routes = require("./routes");
const { urlencoded } = require('express');
require('./database/config/index')

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {console.log(`listening at: http://localhost:${PORT}`)})
