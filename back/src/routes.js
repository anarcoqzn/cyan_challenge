const express = require('express');
const FieldController = require('./controllers/FieldController');
const FarmController = require('./controllers/FarmController');
const HarvestController = require('./controllers/HarvestController');
const MillController = require('./controllers/MillController');
const UserController = require('./controllers/UserController');

routes = express.Router();

routes.post("/user", UserController.register);
routes.get("/user", UserController.show);

routes.get("/mill", MillController.show);
routes.get("/mill/:id", MillController.findById);
routes.get("/mill/:millName", MillController.findMillByName);
routes.post("/mill", MillController.register);

//routes.get("/harvest", HarvestController.getHarvestsFromMill);
routes.get("/harvest", HarvestController.show)
routes.get("/farm/:harvest",FarmController.getFarmsFromHarvest)
routes.post("/harvest", HarvestController.register);

routes.get("/:harvestCode/farm", FarmController.show);
routes.post("/:harvestCode/farm", FarmController.register);

routes.post("/:farmCode/field", FieldController.register);
routes.get("/:farmCode/field", FieldController.show);

module.exports = routes;