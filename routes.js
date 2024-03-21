import express from "express";
import { v4 as uuidv4 } from "uuid";
import AuthController from "./controller/AuthController.js";
import UserController from "./controller/UserController.js";
import ProductController from "./controller/ProductController.js";
import CategoryController from "./controller/CategoryController.js";
const router = express.Router();

//CONTROLLER
const Auth = new AuthController();
const User = new UserController();
const Category = new CategoryController();
const Product = new ProductController();

/* 
* ------------------------
    Application Routes
* ------------------------
*/

// AUTH ROUTES
router.post("/login", Auth.login);
router.post("/register", Auth.register);

// ROUTES
router.get("/", (req, res) => {
  // res.header("uuid", uuidv4());
  res.status(200).send("Hello World");
});

//Users
router.get("/getUsers", User.getUsers);
router.post("/createUser", User.createUsers);
router.put("/updateUser/:id", User.updateUser);
router.delete("/deleteUser/:id", User.deleteUser);

//Categories
router.get("/getCategories", Category.getCategory);
router.post("/createCategory", Category.createCategory);
router.put("/updateCategory/:id", Category.updateCategory);

export default router;
