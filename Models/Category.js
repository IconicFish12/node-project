import { Model } from "sequelize";
import sequelize from "../config.js";

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(Model) {
      // Model Relation
    }
  }
  Category.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      category_name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
