'use strict';

module.exports = function(sequelize, DataTypes) {
  var AvailableBackground = sequelize.define('AvailableBackground', {}, {
    tableName: 'available_backgrounds',
    timestamps: false,
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        AvailableBackground.belongsTo(models.Image, { as: 'image', foreignKey: 'image_id' });
      }
    }
  });

  return AvailableBackground;
};
