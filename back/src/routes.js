const express = require('express');
const path = require("path");
const FieldController = require('./controllers/FieldController');
const FarmController = require('./controllers/FarmController');
const HarvestController = require('./controllers/HarvestController');
const MillController = require('./controllers/MillController');
const UserController = require('./controllers/UserController');

routes = express.Router();

routes.post("/:harvestCode/:farmCode/field", FieldController.register);
routes.get("/field", FieldController.show);

routes.post("/:millName/:harvestCode/farm", FarmController.register);
routes.get("/farm", FarmController.show);

routes.post("/:millName/harvest", HarvestController.register);
routes.get("/harvest", HarvestController.show);

routes.post("/:userCpf/mill", MillController.register);
routes.get("/mill", MillController.show);

routes.post("/user", UserController.register);
routes.get("/user", UserController.show);

routes.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

routes.get("/dist/bundle.js", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/dist/bundle.js'));
});



module.exports = routes;