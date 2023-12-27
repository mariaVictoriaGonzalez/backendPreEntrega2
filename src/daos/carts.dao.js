import { cartModel } from "./models/cart.model.js";

class CartDao {
  async getAllCarts() {
    try {
      return await cartModel.find();
    } catch (error) {
      throw new Error(`Error getting carts: ${error.message}`);
    }
  }

  async createCart(cart) {
    try {
      return await cartModel.create(cart);
    } catch (error) {
      throw new Error(`Error while creating cart: ${error.message}`);
    }
  }

  async getCartById(_id) {
    try {
      return await cartModel.findById(_id);
    } catch (error) {
      throw new Error(`Error getting cart by ID: ${error.message}`);
    }
  }

  async updateCart(cid, cart) {
    try {
      return await cartModel.findByIdAndUpdate(cid, cart);
    } catch (error) {
      throw new Error(`Error updating cart: ${error.message}`);
    }
  }

  async deleteCart(_id) {
    try {
      return await cartModel.findByIdAndDelete(_id);
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  }

  async deleteAllCarts() {
    try {
      return await cartModel.deleteMany();
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  }

  async getProductsFromCart(cid) {
    try {
      return await cartModel.findById(cid).populate("products.product").exec();
    } catch (error) {
      throw new Error(`Error getting products from cart: ${error.message}`);
    }
  }
}

export default new CartDao();
