const express = require('express');
const FieldController = require('./controllers/FieldController');
const FarmController = require('./controllers/FarmController');
const HarvestController = require('./controllers/HarvestController');
const MillController = require('./controllers/MillController');
const { Router } = require('express');

routes = express.Router();

module.exports = io => {
        
    routes.post("/mill",(req, res, next) =>  MillController.register(req,res,next,io));
    routes.get("/mill", MillController.show);
    routes.get("/mill/:id", MillController.findById);

    routes.post("/harvest",(req, res, next) =>HarvestController.register(req,res,next,io));
    routes.get("/harvest", HarvestController.show);
    routes.get("/harvest/:id",HarvestController.findByCode);

    routes.post("/farm", (req, res, next) => FarmController.register(req,res,next,io));
    routes.get("/farm", FarmController.show);
    routes.get("/farm/:id", FarmController.findByCode);

    routes.post("/field", (req, res, next)  => FieldController.register(req, res, next, io));
    routes.get("/field", FieldController.show);
    routes.get("/field/:id", FieldController.findByCode);

    return routes
};