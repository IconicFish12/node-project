"use strict";
import { Model } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  class Barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Barang.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.STRING(128),
        references: {
          model: 'User',
          key: "id",
        },
      },
      kategori_id: {
        allowNull: false,
        type: DataTypes.STRING(128),
        references: {
          model: 'Category',
          key: "id",
        },
      },
      nama_barang: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      harga_barang: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      deskripsi_barang: {
        allowNull: false,
        type: DataTypes.STRING
      },
      foto: {
        allowNull: true,
        type: DataTypes.STRING
      },
      status_lelang: {
        allowNull: false,
        type: DataTypes.ENUM,
        defaultValue: "ditutup",
        values : ["dibuka", "ditutup"]
      },
      proses: {
        allowNull: false,
        type: DataTypes.ENUM,
        defaultValue: "ditutup",
        values : ["dibuka", "ditutup"]
      },
    },
    {
      sequelize,
      modelName: "Barang",
    }
  );
  return Barang;
};
