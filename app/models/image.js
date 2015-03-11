'use strict';

module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 2,
        max: 100
      }
    },
    url: {
      type: DataTypes.STRING(2083),
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 2,
        max: 2083,
        isUrl: true
      }
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        min: 2,
        max: 255
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'image',
    timestamps: true,
    paranoid: false,
    underscored: true,
    associate: function(models) {
      Image.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  });

  return Image;
};
