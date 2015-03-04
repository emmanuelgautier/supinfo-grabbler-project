'use strict';

module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
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
