'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.belongsToMany(models.Project, { through: 'UserProjects' });

      // define association here
    }
  };
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false
    },
    validation_str: {
      type: DataTypes.STRING,
    },
    resetToken: {
      type: DataTypes.STRING,
    },
    resetTokenExpires: {
      type: DataTypes.DATE
    },
    passwordReset: {
      type: DataTypes.DATE
    },
    email_validated: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};