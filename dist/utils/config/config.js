"use strict";
require('dotenv').config();
module.exports = {
    "development": {
        "username": process.env.MYSQL_USER,
        "password": process.env.MYSQL_PASSWORD,
        "database": process.env.MYSQL_DATABASE,
        "host": process.env.MYSQL_DATABASE_HOST,
        "dialect": "mysql",
    },
};
//# sourceMappingURL=config.js.map