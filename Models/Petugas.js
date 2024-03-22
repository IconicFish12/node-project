"use strict";
import { Model } from "sequelize";
import sequelize from "../config.js";

export default (sequelize, DataTypes) => {
  class Petugas extends Model {
    static asociate(Model) {
      // Model Relation
    }
  }
  Petugas.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nama_petugas: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tgl_lahir: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      alamat: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      foto: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      telp: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["admin", "petugas"],
        defaultValue: "admin",
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
      modelName: "Petugas",
    }
  );
  return Petugas
};
