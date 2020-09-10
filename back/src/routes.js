const express = require('express');
const FieldController = require('./controllers/FieldController');
const FarmController = require('./controllers/FarmController');
const HarvestController = require('./controllers/HarvestController');
const MillController = require('./controllers/MillController');
const UserController = require('./controllers/UserController');
const { Router } = require('express');

routes = express.Router();

routes.post("/user", UserController.register);
routes.get("/user", UserController.show);

routes.get("/mill", MillController.show);
routes.get("/mill/:id", MillController.findById);
routes.post("/mill", MillController.register);

routes.get("/harvest", HarvestController.show)
routes.get("/harvest/:id",HarvestController.getHarvest)
routes.post("/harvest", HarvestController.register);

routes.post("/farm", FarmController.register);
routes.get("/farm/:id", FarmController.findById);

routes.post("/field", FieldController.register)
routes.get("/field", FieldController.show);
routes.get("/field/:id", FieldController.findById);

module.exports = routes;