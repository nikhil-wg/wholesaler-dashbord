import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CustomerModel } from "./db/db.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
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
        customerId: customerDetails.customerId,
      },
      JWT_PASS
    );

    res.json({
      token: token,
    });
  } catch (e) {
    res.json({
      e,
    });
    return;
  }
});

app.post("/api/get-orders", async (req, res) => {
  try {
    const customerEmail = req.body.email;

    // getting customer detail fromm customer collection
    const customerDetail = await CustomerModel.findOne({
      email: customerEmail,
    });

    if (customerDetail) {
      res.send(customerDetail);
    }
    console.log(customerDetail);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
