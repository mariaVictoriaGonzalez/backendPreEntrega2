import { mongoose, Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
      quantity: {
        type: Number,
        min: 1,
      },
    },
  ],
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});

const cartModel = model("carts", cartSchema);

export { cartModel };
