

module.exports={
  "development": {
    "username": "postgres",
    "password": 1234,
    "database": "sqlnode",
    "host": "localhost",
    "dialect": "postgres",
    "defined": {
      "timestamps":true,
    "underscored":true
    }
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
}