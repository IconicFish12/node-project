import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../Models/User.js";
import { createUserValidation, loginValidation } from "../validation.js";

export default class AuthController {
  async register(req, res) {
    const { name, email, password } = req.body;

    //VALIDATION
    const { error } = createUserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check User is Already Exist or not
    const checkEmail = await User.findOne({
      where: { email: email },
    });

    if (checkEmail)
      return res.send({
        message: "User Sudah ada, Silahkan Login",
      });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    try {
      const savedUser = await User.create({
        name: name,
        email: email,
        password: hash,
      });

      res.status(201).send({
        message: "User Berhasil Dibuat",
        data: savedUser,
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Internal Server Error",
        error: error.message
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const { error } = loginValidation(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ user_id: user.id, email }, process.env.TOKEN, {
          expiresIn: "2h",
        });

        res.status(200).header("Access-Token", token).send({
          message: "Login Success",
        });
      }
    } catch (error) {
      console.log(error.message);
      // res.status(500).send({
      //   message: "Internal Server Error",
      //   error: error.message
      // });
    }
  }
}
