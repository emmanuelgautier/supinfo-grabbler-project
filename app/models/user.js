'use strict'

var bcrypt = require('bcryptjs'),

    SALT_WORK_FACTOR = 10;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set: function(password) {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) { throw err; }

          bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) { throw err; }

            this.setData('password', hash);
          });
        });
      }
    },
    email: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: true
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avatar: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cover: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'user',
    timestamps: true,
    paranoid: true,
    underscored: true,
    associate: function(models) {
      Client.belongsTo(models.Image, { as: 'avatar' });
      Client.belongsTo(models.Image, { as: 'cover' });
    }
  });

  return User;
};
