var SequelizeAuto = require('sequelize-auto');
var node_env = require("../config/config.json")[process.env.NODE_ENV];
let host = process.env.RDS_HOSTNAME || node_env.host;
let username = process.env.RDS_USERNAME || node_env.username;
let password = process.env.RDS_PASSWORD || node_env.password;
let port = process.env.RDS_PORT || node_env.port;
let database = process.env.RDS_PORT || node_env.database;



let auto = new SequelizeAuto(database, username, password,{
  host: host,
  port:port
});


auto.run(function (err) {
  //if (err) throw err;
  if (err) console.log(err);

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});

module.exports=auto;

//if you want to use with specified options
// var auto = new SequelizeAuto(database, username, password, {
//     host: host,
//     dialect:  'mysql', //'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql', but install perticular dialect
//     directory: false, // prevents the program from writing to disk
//     port: port,
//     additional: {
//         timestamps: false
//         //...
//     },
//     tables:['messagequeue']
//     //...
// });

