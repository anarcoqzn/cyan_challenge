
const Sequelize = require("sequelize");
const dbConfig = require('./dbconfig');
const Field = require('../../models/Field');
const Farm = require('../../models/Farm');
const Harvest = require('../../models/Harvest');
const Mill = require('../../models/Mill');

const connection = new Sequelize(dbConfig);

Field.init(connection);
Farm.init(connection);
Harvest.init(connection);
Mill.init(connection);

Field.associate(connection.models);
Farm.associate(connection.models);
Harvest.associate(connection.models);
Mill.associate(connection.models);

module.exports = connection;