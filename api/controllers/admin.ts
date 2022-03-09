import express, { Request, Response } from "express";
import { IProducts } from "../interfaces/products";
import Products from "../models/products";
import Users from "../models/user";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    res.status(200).send("works");
  } catch (error) {
    console.log(error);
  }
});

router.get("/shop", async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).send("No user Id");
    }
    const shopData = await Users.find({ _id: userId });

    res.status(200).send(shopData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await Products.find({});

    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
});

router.post("/products", async (req: Request, res: Response) => {
  try {
    const { products, userId } = req.body;
    if (!userId || products.length < 1) {
      return res.status(400).send("No userId or no products");
    }
    const newProducts = await Products.create(products);
    const newIds = newProducts.map((item: IProducts) => {
      return item._id;
    });

    const updateShop = await Users.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: { products: newIds },
      },
      {
        new: true,
      }
    );
    res.status(200).send(updateShop);
  } catch (error) {
    console.log(error);
  }
});

router.put("/products", async (req: Request, res: Response) => {
  try {
    const { productId, payload } = req.body;
    if (!productId || !payload.title || !payload.SKU) {
      return res.status(400).send("Insufficient parameters");
    }

    const updatedProduct = await Products.findOneAndUpdate(productId, payload, {
      new: true,
    });
    res.status(200).send(updatedProduct);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/products", async (req: Request, res: Response) => {
  try {
    const { productId, userId } = req.query;
    if (!productId) {
      return res.status(400).send("No products selected");
    }

    await Products.findOneAndDelete({ _id: productId });
    const updatedInventory = await Users.findOneAndUpdate(
      { _id: userId },
      {
        $pull: {
          products: productId,
        },
      },
      {
        new: true,
      }
    );
    console.log(updatedInventory);

    res.status(200).send("Product deleted: " + productId);
  } catch (error) {
    console.log(error);
  }
});

export default router;
