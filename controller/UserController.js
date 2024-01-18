import bcrypt from "bcrypt";
import { createUserValidation, updateValidation } from "../validation.js";
import { User } from "../Models/User.js";
import { where } from "sequelize";

export default class UserController {
  async getUsers(req, res) {
    try {
      const allUser = await User.findAll();

      if (allUser.length == 0) {
        return res.send("User Tidak Ada");
      }

      return res.status(200).send({
        message: "Data Ada",
        data: allUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async createUsers(req, res) {
    //VALIDATION
    const { error } = createUserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check User is Already Exist or not
    const checkEmail = await User.findOne({
      where: { email: req.body.email },
    });

    if (checkEmail)
      return res.send({
        message: "User Sudah ada",
      });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    try {
      const savedUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }).catch((error) => {
        res.send({
          message: "Data Gagal Dibuat",
          error: error.message,
        });
      });

      return res.status(201).send({
        message: "User Berhasil Dibuat",
        user: savedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, new_password, old_password } = req.body;

    //VALIDATION
    const { error } = updateValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //OPERATION
    try {
      const user = await User.findByPk(id);

      if (user == null)
        return res.send({
          message: "Data tidak ada",
        });

      if (new_password && old_password != null) {
        const compare = await bcrypt.compare(old_password, user.password);

        if (!compare)
          return res.send({
            message: "Password Tidak sama",
          });

        const hash = await bcrypt.hash(new_password, 10);

        const update = await User.update(
          {
            name: name,
            email: email,
            password: hash,
          },
          where({
            id: id,
          })
        ).catch((error) => {
          res.send({
            message: "Data Gagal Diupdate",
            error: error.message,
          });
        });

        return res.send({
          message: "Data Berhasil DiUpdate",
        });
      }

      const updateData = await User.update(
        {
          name: name,
          email: email,
        },{
          where : {
            id : id,
          },
          returning : true
        }
      ).catch((error) => {
        res.send({
          message: "Data Gagal Diupdate",
          error: error.message,
        });
      });
      return res.send({
        message: "Data Berhasil DiUpdate",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);

      const destroy = await Userser.destroy({
        where: {
          id: id,
        },
      })
        .then(() => {
          res.status(200).send({
            message: "Data Berhasil Dihapus",
          });
        })
        .catch((err) => {
          res.send({
            message: "Data Gagal DiHapus",
            error: err.message,
          });
        });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
}
