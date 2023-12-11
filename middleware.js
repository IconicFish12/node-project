import jwt from "jsonwebtoken";

const config = process.env;

export const loggedIn = async (req, res, next) => {
  const token = req.header("Access-Token");

  if (!token) {
    return res.status(403).send("Token is Required for Authentication");
  }
  try {
    const decode = jwt.verify(token, config.TOKEN);
    req.user = decode;
    return next();
  } catch (error) {
    res.status(401).send({
      message: "invalid token",
      error: error.message
    });
    // console.log(error);
  }
};
