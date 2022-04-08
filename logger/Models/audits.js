const { Model } = require("objection");
const Knex = require("knex");
const connection = require("../config/knexfile");
const knexConnection = Knex(connection);
Model.knex(knexConnection);

class audit extends Model {
  static get tableName() {
    return "audits";
  }
  static get idColumn() {
    return "ID";
  }

  $beforeInsert(){
    this.CreatedDateTime=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    this.ModifiedDateTime=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  }
  $beforeUpdate(){
    this.ModifiedDateTime=new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
  }
}

module.exports = audit;
