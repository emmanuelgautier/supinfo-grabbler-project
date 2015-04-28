'use strict';

module.exports = function(sequelize, DataTypes) {
  var UserBackground = sequelize.define('UserBackground', {
    color: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'user_background',
    timestamps: false,
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        UserBackground.belongsTo(models.Image);
        UserBackground.belongsTo(models.User);
      }
    }
  });

  return UserBackground;
}
