/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "scheduler",
    {
      Id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      Name: {
        type: DataTypes.STRING(200),
        allowNull: false
      },
      ScheduledDateTime: {
        type: DataTypes.STRING(300),
        allowNull: true
      },
      Active: {
        type: DataTypes.INTEGER(4),
        allowNull: true
      },
      Execute: {
        type: DataTypes.STRING(1000),
        allowNull: false
      },
      LastExecution: {
        type: DataTypes.DATE,
        allowNull: true
      },
      EndpointId: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      },
      NextRun: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    },
    {
      tableName: "scheduler"
    }
  );
};
