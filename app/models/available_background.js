'use strict';

module.exports = function(sequelize, DataTypes) {
  var AvailableBackground = sequelize.define('Available Background', {
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'available_background',
    timestamps: false,
    paranoid: false,
    underscored: true,
    associate: function(models) {
      AvailableBackground.belongsTo(models.Image, { foreignKey: 'image_id' });
    }
  });

  return AvailableBackground;
};
