import mongoose from "mongoose";

export enum Category {
  home = "home",
  clothing = "clothing",
  health = "health",
  electronics = "electronics",
  sports = "sports",
  agriculture = "agriculture",
  appliances = "appliances",
}

interface ProductAttrs {
  name: string;
  price: number;
  description: string;
  image: string;
  manufactureDate: string;
  category: Category;
}

export interface ProductDoc extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  image: string;
  manufactureDate: string;
  category: Category;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    manufactureDate: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(Category),
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export { Product };
