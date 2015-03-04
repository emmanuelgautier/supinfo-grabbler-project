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
    associate: function(models) {
      UserBackground.belongsTo(models.Gab, { foreignKey: 'gab_id' });
      UserBackground.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  });

  return GabLike;
};
