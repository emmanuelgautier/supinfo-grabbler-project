'use strict';

module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    gab: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 2,
        max: 255
      }
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'gab',
    timestamps: true,
    paranoid: true,
    underscored: true,
    associate: function(models) {
      Gab.belongsTo(models.Gab, { as: 'parent',  foreignKey: 'parent_id' });
      Gab.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  });

  return Gab;
};
