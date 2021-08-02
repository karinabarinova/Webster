'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserProject.init({
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProject',
  });
  return UserProject;
};