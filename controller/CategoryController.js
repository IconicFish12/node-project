import { where } from "sequelize";
import { Category } from "../Models/Category.js";

export default class CategoryController {
  async getCategory(req, res) {
    try {
      const allData = await Category.findAll();

      if (allData.length == 0) {
        res.send({
          message: "Data Tidak Ada",
        });
      } else {
        res.send({
          message: "Data Ada",
          data: allData,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async createCategory(req, res) {
    try {
      const createData = await Category.create({
        category_name: req.body.category_name,
      }).catch((error) => {
        res.send({
          message: "Data Gagal dibuat",
          error: error.message,
        });
      });

      return res.send({
        massage: "Category telah ditambah",
        category: createData,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    const { category_name } =  req.body
    try {
      // const data = await Category.findByPk(id);

      const updateData = await Category.update(
        {
          category_name: category_name,
        },
        {
          where: {
            id: id,
          },
        }
      ).catch((error) => {
        res.send({
          message: "Data gagal diubah",
          error: error,
        });
      });

      return res.send({
        message: "Data Category Berhasil diubah",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal server error",
        error: error.message,
      });
    }
  }

  async 
}
