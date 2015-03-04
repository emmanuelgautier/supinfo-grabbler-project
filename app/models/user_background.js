'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserBackground = sequelize.define('UserBackground', {
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'user_background',
    timestamps: false,
    paranoid: false,
    underscored: true,
    associate: function(models) {
      UserBackground.belongsTo(models.Image, { foreignKey: 'image_id' });
      UserBackground.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  });

  return UserBackground;
}
