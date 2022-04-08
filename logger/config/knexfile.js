// Update with your config settings.
var env = {
  username: "root",
  password: "awais",
  database: "micro-scheduler",
  host: "db",
  dialect: "mysql",
  port: 3306,
  pool_min: 2,
  pool_max: 10,
};
//require("./dbConfig/dbConfig.json")[process.env.NODE_ENV];

module.exports = {
  client: env.dialect,
  connection: {
    port: env.dbport || "3306",
    host: env.host || "localhost",
    database: env.database,

    user: env.username || "",
    password: env.password,
    // timezone: "UTC",
  },
  pool: {
    min: parseInt(env.pool_min),
    max: parseInt(env.pool_max),
  },
};
