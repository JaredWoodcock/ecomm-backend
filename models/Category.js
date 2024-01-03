const { Model, DataTypes } = require('sequelize');
// Importing DB connection from connection.js
const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // Define columns for Category model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;