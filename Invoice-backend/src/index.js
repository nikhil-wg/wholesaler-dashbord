import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { CustomerModel } from "./db/db.js";
import mongoose from "mongoose";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);
const PORT = process.env.PORT || 5000;

app.post("/api/get-orders", async (req, res) => {
  try {
    const customerEmail = req.body.email;

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
