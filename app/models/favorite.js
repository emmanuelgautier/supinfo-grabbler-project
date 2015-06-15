'use strict';

module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define('Favorite', {}, {
    tableName: 'favorites',
    timestamps: false,
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Favorite.belongsTo(models.Gab, { as: 'gab', foreignKey: 'gab_id', constraints: false });
        Favorite.belongsTo(models.User, { as: 'user', foreignKey: 'user_id',constraints: false });
      }
    }
  });

  return Favorite;
};
