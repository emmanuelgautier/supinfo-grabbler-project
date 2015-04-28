'use strict';

module.exports = function(sequelize, DataTypes) {
  var GabLike = sequelize.define('GabLike', {
    gab_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'gab_like',
    timestamps: false,
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        GabLike.belongsTo(models.Gab, { foreignKey: 'gab_id' });
        GabLike.belongsTo(models.User, { foreignKey: 'user_id' });
      }
    }
  });

  return GabLike;
};
