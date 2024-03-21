import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import router from "./routes.js";
import passport from "passport";
import sequelize from "./config.js";

//basic setup
const env = dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// app setup
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);

app.use(bodyParser.json({ limit: 1000 }));
app.use(router);
app.use(passport.initialize());
app.use(passport.session())

app.use((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(req.body));
});

app.listen(PORT, () => {
  console.log(`Server Running in port ${PORT}`);
});
