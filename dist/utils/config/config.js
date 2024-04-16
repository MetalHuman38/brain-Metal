"use strict";
require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.MARIADB_USER,
        "password": process.env.MARIADB_PASSWORD,
        "database": process.env.MARIADB_DATABASE,
        "host": process.env.DATABASE_HOST,
        "dialect": "mariadb",
    },
};
//# sourceMappingURL=config.js.map