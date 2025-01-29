import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Customers } from "./db/db.js";
// it is body parser
app.use(express.json());
// configuring the env file
dotenv.config();
app.use(cors());
const app = express();
const PORT = process.env.PORT || 5000;

app.post("/api/get-orders", async (req, res) => {
  try {
    const customerId = req.body.customerId;

    const customer = await Customers.findOne({
      customerId,
    });
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log("Server is listening on port: ", PORT);
});
