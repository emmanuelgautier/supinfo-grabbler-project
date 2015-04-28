'use strict'

var bcrypt = require('bcryptjs'),

    SALT_WORK_FACTOR = 10;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING(50), 
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      set: function(password) {

        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR),
            hash = bcrypt.hashSync(password, salt);

        this.setDataValue('password', hash);
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['m', 'f'],
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    displayname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      get: function() {
        var displayName = this.getDataValue('displayname');

        if(!displayName) {
          displayName = this.getDataValue('firstname') + " " + this.getDataValue('lastname');
        }

        return displayName;
      }
    },
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    avatar_id: {
      type: DataTypes.INTEGER
    },
    cover_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'user',
    timestamps: true,
    paranoid: true,
    underscored: true,
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Image, { as: 'avatar' });
        User.belongsTo(models.Image, { as: 'cover' });
      }
    },
    instanceMethods: {
      checkPassword: function(password) {

        var hash = this.getDataValue('password');

        return bcrypt.compareSync(password, hash);
      }
    }
  });

  return User;
};
