'use strict';

module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(2083),
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'image',
    timestamps: true,
    paranoid: false,
    underscored: true,
    classMethods: {
      associate: function(models) {
        Image.belongsTo(models.User, { foreignKey: 'user_id' });
      }
    }
  });

  return Image;
};
