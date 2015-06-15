'use strict';

module.exports = function(sequelize, DataTypes) {
  var Gab = sequelize.define('Gab', {
    gab: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'gabs',
    timestamps: true,
    paranoid: true,
    underscored: true,
    indexes: [{
      fields: ['created_at']
    }],
    classMethods: {
      associate: function(models) {
        Gab.belongsTo(models.Gab, { as: 'parent',  foreignKey: 'parent_id' });
        Gab.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });

        Gab.hasOne(models.Gab, { as: 'gab_child', foreignKey: 'parent_id', constraints: true });
        Gab.belongsToMany(models.User, { as: 'favorite', through: models.Favorite, constraints: true });
      }
    },
    instanceMethods: {
      isFavorited: function(userId) {
        var id = this.dataValues.id;

        this.dataValues.favorited = false;

        for(var favorite in this.dataValues.favorite) {
          if(this.dataValues.favorite[favorite].id === userId) {
            this.dataValues.favorited = true;
            return;
          }
        }
      }
    }
  });

  return Gab;
};
