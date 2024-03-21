'use strict';
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
  Barang.init({
    user_id: DataTypes.INTEGER,
    kategori_id: DataTypes.INTEGER,
    nama_barang: DataTypes.STRING,
    harga_barang: DataTypes.INTEGER,
    deskripsi_barang: DataTypes.STRING,
    foto: DataTypes.STRING,
    status_lelang: DataTypes.STRING,
    proses: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Barang',
  });
  return Barang;
};