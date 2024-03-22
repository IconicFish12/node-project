'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Barangs', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.STRING(128),
        references: {
          model: 'User',
          key: "id",
        },
      },
      kategori_id: {
        allowNull: false,
        type: Sequelize.STRING(128),
        references: {
          model: 'Category',
          key: "id",
        },
      },
      nama_barang: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      harga_barang: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deskripsi_barang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      foto: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status_lelang: {
        allowNull: false,
        type: Sequelize.ENUM,
        defaultValue: "ditutup",
        values : ["dibuka", "ditutup"]
      },
      proses: {
        allowNull: false,
        type: Sequelize.ENUM,
        defaultValue: "ditutup",
        values : ["dibuka", "ditutup"]
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Barangs');
  }
};