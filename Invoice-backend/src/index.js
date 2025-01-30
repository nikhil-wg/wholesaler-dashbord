import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CustomerModel, OrderModel, ProductModel } from "./db/db.js";
import mongoose, { mongo } from "mongoose";
import jwt from "jsonwebtoken";
import { useMiddlewares } from "./middlewares/middleware.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

const JWT_PASS = process.env.JWT_PASS;

mongoose.connect(process.env.DATABASE_URL);
const PORT = process.env.PORT || 5000;

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking if user is present or not
    const customerDetails = await CustomerModel.findOne({
      email,
      password,
    });

    //  if user is not present then it will return the 404 code
    if (!customerDetails) {
      res.status(404).json({
        message: " User Not Found !",
      });
      return;
    }
    //  if user is present then it will create a token and then send it
    const token = jwt.sign(
      {
        customerId: customerDetails._id,
      },
      JWT_PASS
    );

    res.json({
      token: token,
    });

    const allCustomer = await CustomerModel.find();
    console.log(allCustomer);
  } catch (e) {
    res.json({
      e,
    });
    return;
  }
});

app.post("/api/get-orders", useMiddlewares, async (req, res) => {
  try {
    const customerId = req.body.customerId;
    // getting customer detail fromm customer collection
    const customerDetail = await CustomerModel.findOne({
      _id: customerId,
    });

    // if user is not exits
    if (!customerDetail) {
      res.status(404).json({
        message: " User Not Found !",
      });
      return;
    }
    //  getting orders' from database
    const orders = await OrderModel.find({
      customerId,
    });

    if (!orders) {
      res.status(200).json({
        message: "there is no order's ",
      });
      return;
    }

    res.json({
      customerDetail,
      orders,
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/api/v1/get-products", useMiddlewares, async (req, res) => {
  try {
    const productIds = req.body.productId;
    const productsInfo = await ProductModel.find({
      _id: { $in: productIds },
    });

    if (!productsInfo) {
      res.status(404).json({
        message: "Product Not Found",
      });
      return;
    }

    //  sending productinfo the the frontend
    res.json({
      productsInfo,
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
