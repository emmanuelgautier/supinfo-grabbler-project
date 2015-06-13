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
      },
      get: function() {
        return null;
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
    color: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    classMethods: {
      associate: function(models) {
        User.belongsTo(models.Image, { as: 'avatar', foreignKey: 'avatar_id', constraints: false });
        User.belongsTo(models.Image, { as: 'cover', foreignKey: 'cover_id', constraints: false });
        User.belongsTo(models.Image, { as: 'background', foreignKey: 'background_id', constraints: false });

        User.hasMany(models.Gab, { as: 'gabs', foreignKey: 'user_id', constraints: false });
        User.belongsToMany(models.User, { as: 'followers', through: 'followers', constraints: false });
      }
    },
    instanceMethods: {
      toJson: function() {
        delete this.dataValues.password;

        return JSON.stringify(this.dataValues);
      },
      checkPassword: function(password) {

        var hash = this.getDataValue('password');

        return bcrypt.compareSync(password, hash);
      }
    }
  });

  return User;
};
