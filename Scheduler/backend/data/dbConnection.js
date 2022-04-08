const Sequelize = require('sequelize');
var node_env = require("../../config/dbConfig/dbConfig.json")[process.env.NODE_ENV];
const Connection = function () { };

Connection.prototype.getSequelize = function () {
    let host = process.env.RDS_HOSTNAME || node_env.host;
    let port = process.env.RDS_PORT || node_env.port;
    let database = process.env.RDS_DATABASE || node_env.database;
    let username = process.env.RDS_USERNAME || node_env.username;
    let password = process.env.RDS_PASSWORD || node_env.password;
    let dialect = process.env.RDS_DIALECT || node_env.dialect;
    const sequelize = new Sequelize(database, username, password, {
        host: host,
        port: port,
        dialect: dialect,
        define: {
            freezeTableName: true, //prevent sequelize from pluralizing table names
            timestamps: false // true by default. false because bydefault sequelize adds createdAt, modifiedAt columns with timestamps.if you want those columns make ths true.
        },
        pool: {
            max: 5,
            min: 0,
            idle: 20000,
            acquire: 20000,
        }
    });
    return sequelize;
};

exports.Connection = Connection;