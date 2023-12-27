import { mongoose, Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [
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
  },
});

const cartModel = model("carts", cartSchema);

export { cartModel };
