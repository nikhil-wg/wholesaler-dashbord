import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const useMiddlewares = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_PASS);
      req.body.customerId = decoded.customerId;
      next();
    } else {
      res.status(401).json({
        message: "Please login to access this route",
      });
    }
  } catch (e) {
    console.log(e);
    res.json({
      e,
    });
  }
};
