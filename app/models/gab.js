'use strict';

module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    gab: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'gabs',
    timestamps: true,
    paranoid: true,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Gab.belongsTo(models.Gab, { as: 'parent',  foreignKey: 'parent_id' });
        Gab.belongsTo(models.User, { foreignKey: 'user_id' });

        Gab.hasOne(models.Gab, { as: 'gab_child', foreignKey: 'parent_id', constraints: false });
        Gab.belongsToMany(models.User, { as: 'favorite', through: 'favorites', constraints: false });
      }
    }
  });

  return Gab;
};
