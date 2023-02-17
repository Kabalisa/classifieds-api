import { Request, Response } from "express";
import { Product } from "../models/product";

class ProductController {
  static async createProduct(req: Request, res: Response) {
    const product = Product.build({ ...req.body, userId: req.currentUser?.id });

    await product.save();
    return res.send({ product });
  }
  static async getProducts(req: Request, res: Response) {
    const products = await Product.find({}).collation({locale: "en"}).sort({ name: "asc" });
    const reducedProducts = products.slice(0, 10);
    return res.send({ products: reducedProducts });
  }
}

export default ProductController;
