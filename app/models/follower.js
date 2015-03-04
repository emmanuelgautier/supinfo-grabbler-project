'use strict';

module.exports = function(sequelize, DataTypes) {
  var Follower = sequelize.define('Follower', {
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'follower',
    timestamps: false,
    paranoid: false,
    underscored: true,
    associate: function(models) {
      Follower.belongsTo(models.User, {  foreignKey: 'follower_id' });
      Follower.belongsTo(models.User, {  foreignKey: 'user_id' });
    }
  });

  return Follower;
};
