import mongoose, { model, Schema, Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.DATABASE_URL);

// in the below all schema's id will be generated automatically !
const customerSchema = new Schema({
  customerId: { type: mongoose.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

const productSChema = new Schema({
  productId: { type: mongoose.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
});

const productVariantSchema = new Schema({
  serialNumber: { type: String, required: true, unique: true },
  productId: { type: mongoose.Types.ObjectId, ref: "Products", required: true },
  color: String,
  size: String,
  price: { type: String, required: true },
});

const orderSchema = new Schema({
  // id will generate
  orderId: { type: mongoose.Types.ObjectId, auto: true },
  customerId: { type: mongoose.Types.ObjectId, ref: "Customers" },
  orderDetail: [
    {
      productId: { type: mongoose.Types.ObjectId, ref: "Products" },
      totalQuantity: { type: Number, required: true },
      deliverdQuantity: { type: Number, default: 0 },
      pendingQuantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
});

const invoiceSchema = new Schema({
  invoiceId: { type: mongoose.Types.ObjectId, auto: true },
  orderId: { type: mongoose.Types.ObjectId, ref: "Orders", require: true },
  customerId: {
    type: mongoose.Types.ObjectId,
    ref: "Customers",
    require: true,
  },
  products: [
    {
      productId: {
        type: mongoose.Types.ObjectId,
        ref: "Products",
        require: true,
      },
      quantity: { type: String, require: true },
      price: { type: Number, require: true },
      total: { type: Number, require: true },
    },
  ],
  invoiceDate: { type: Date, default: Date.now },
  totalAmount: { type: Number, require: true },
  status: { type: String, enum: ["pending", "paid"], default: "pending" },
});

// exporting all schema's
module.exports = new model("Customers", customerSchema);
module.exports = new model("Products", productSChema);
module.exports = new model("ProductVariant", productVariantSchema);
module.exports = new model("Orders", orderSchema);
module.exports = new model("Invoice", invoiceSchema);
