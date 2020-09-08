const express = require('express');
const path = require("path");
const FieldController = require('./controllers/FieldController');
const FarmController = require('./controllers/FarmController');
const HarvestController = require('./controllers/HarvestController');
const MillController = require('./controllers/MillController');
const UserController = require('./controllers/UserController');

routes = express.Router();

routes.post("/user", UserController.register);
routes.get("/user", UserController.show);

routes.get("/mill", MillController.show);
routes.post("/mill", MillController.register);

routes.get("/:millName/harvest", HarvestController.show);
routes.post("/:millName/harvest", HarvestController.register);

routes.get("/:harvestCode/farm", FarmController.show);
routes.post("/:harvestCode/farm", FarmController.register);

routes.post("/:farmCode/field", FieldController.register);
routes.get("/:farmCode/field", FieldController.show);

routes.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

routes.get("/dist/bundle.js", function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/dist/bundle.js'));
});

module.exports = routes;