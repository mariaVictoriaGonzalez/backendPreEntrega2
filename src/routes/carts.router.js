import { Router } from "express";
import cartsDao from "../daos/carts.dao.js";
import productsDao from "../daos/products.dao.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const newCart = await cartsDao.createCart();
    res.json({ newCartId: newCart._id });
  } catch (error) {
    console.error("Error creating a new cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cartWithProducts = await cartsDao.getProductsFromCart(cid);

     res.json(cartWithProducts);
    console.log(cartWithProducts)
  } catch (error) {
    console.error("Error getting cart with products:", error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const productId = pid;
      const quantity = req.body.quantity;
      const cartId = cid;
  
      const cart = await cartsDao.getCartById(cartId); // Busco el carrito
  
      if (cart) {
        const product = await productsDao.getProductById(productId); // Si existe el carrito busco el producto
        if (product) {
          const index = cart.products.findIndex((item) => item._id.toString() === productId); // Veo si ya existe el prod en el carrito
          if (index !== -1) {
            cart.products[index].quantity += 1; // Si ya existe, le sumo a quantity
          } else {
            cart.products.push({ _id: productId, quantity: quantity }); // Si no existe, lo pusheo
          }
          const respuesta = await cartsDao.updateCart(cartId, cart); // Updateo el carrito
          res.status(200).json({ respuesta: "OK", mensaje: respuesta });
        } else {
          res.status(404).json({ error: "Product not found." });
        }
      } else {
        res.status(404).json({ error: "Cart not found." });
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ error: "Internal Server Error." });
    }
  });
  
  export default router;