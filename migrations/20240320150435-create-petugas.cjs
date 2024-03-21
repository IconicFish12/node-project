"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("petugas", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      nama_petugas: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tgl_lahir: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      alamat: {
        allowNull: true,
        type: Sequelize.TEXT,
      },
      foto: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      telp: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      role: {
        allowNull: false,
        defaultValue: "admin",
        values: ["petugas", "admin"],
        type: Sequelize.ENUM,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("petugas");
  },
};
