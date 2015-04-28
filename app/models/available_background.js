'use strict';

module.exports = function(sequelize, DataTypes) {
  var AvailableBackground = sequelize.define('Available Background', {
    image_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'available_background',
    timestamps: false,
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        AvailableBackground.belongsTo(models.Image, { foreignKey: 'image_id' });
      }
    }
  });

  return AvailableBackground;
};
