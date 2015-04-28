'use strict';

module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    gab: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'gab',
    timestamps: true,
    paranoid: true,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Gab.belongsTo(models.Gab, { as: 'parent',  foreignKey: 'parent_id' });
        Gab.belongsTo(models.User, { foreignKey: 'user_id' });
      }
    }
  });

  return Gab;
};
