'use strict';

module.exports = function(sequelize, DataTypes) {
  var Follower = sequelize.define('Follower', {
    follower_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'follower',
    timestamps: false,
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Follower.belongsTo(models.User, {  foreignKey: 'follower_id' });
        Follower.belongsTo(models.User, {  foreignKey: 'user_id' });
      }
    }
  });

  return Follower;
};
