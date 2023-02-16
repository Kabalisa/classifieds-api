import mongoose from "mongoose";

import { Password } from "../services/password";

interface SellerAttrs {
  phoneNumber: number;
  password: string;
}

export interface SellerDoc extends mongoose.Document {
  phoneNumber: number;
  password: string;
}

interface SellerModel extends mongoose.Model<SellerDoc> {
  build(attrs: SellerAttrs): SellerDoc;
}

const sellerSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

sellerSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }

  done();
});

sellerSchema.statics.build = (attrs: SellerAttrs) => {
  return new Seller(attrs);
};

const Seller = mongoose.model<SellerDoc, SellerModel>("Seller", sellerSchema);

export { Seller };
