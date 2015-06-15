'use strict';

module.exports = function(sequelize, DataTypes) {
  var Follower = sequelize.define('Follower', {}, {
    tableName: 'followers',
    primaryKey: false,
    timestamps: false,
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Follower.belongsTo(models.User, { as: 'user', foreignKey: 'user_id', constraints: false });
        Follower.belongsTo(models.User, { as: 'follower', foreignKey: 'follower_id', constraints: false });
      }
    }
  });

  return Follower;
};
