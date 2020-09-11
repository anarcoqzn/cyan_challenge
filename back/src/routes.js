const express = require('express');
const FieldController = require('./controllers/FieldController');
const FarmController = require('./controllers/FarmController');
const HarvestController = require('./controllers/HarvestController');
const MillController = require('./controllers/MillController');
const UserController = require('./controllers/UserController');
const { Router } = require('express');

routes = express.Router();

module.exports = io => {
    routes.post("/user", UserController.register);
    routes.get("/user", UserController.show);

    routes.get("/mill",(req, res, next) =>  MillController.show(req,res,next,io));
    routes.get("/mill/:id", MillController.findById);
    routes.post("/mill", MillController.register);

    routes.get("/harvest", (req, res, next) => HarvestController.show(req,res,next,io))
    routes.get("/harvest/:id",HarvestController.getHarvest)
    routes.post("/harvest", HarvestController.register);

    routes.post("/farm",  (req, res, next) => FarmController.register(req,res,next,io));
    routes.get("/farm/:id", FarmController.findById);

    routes.post("/field", (req, res, next)  => FieldController.register(req, res, next, io))
    routes.get("/field", FieldController.show);
    routes.get("/field/:id", FieldController.findById);

    return routes
};