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

        var self = this;

        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) { throw err; }

          bcrypt.hash(password, salt, function(err, hash) {
            if (err) { throw err; }

            self.setData('password', hash);
          });
        });
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gender: {
      type: DataTypes.ENUM,
      values: ['m', 'f'],
      allowNull: true
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    displayname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      get: function() {
        var displayName = this.getData('displayname');

        if(!displayName) {
          displayName = this.getData('firstname') + " " + this.getData('lastname');
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
    avatar: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    cover: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    }
  }, {
    tableName: 'user',
    timestamps: true,
    paranoid: true,
    underscored: true,
    associate: function(models) {
      Client.belongsTo(models.Image, { as: 'avatar' });
      Client.belongsTo(models.Image, { as: 'cover' });
    },
    instanceMethods: {
      checkPassword: function(password) {
        
      }
    }
  });

  return User;
};
