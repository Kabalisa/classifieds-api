import { Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "../errors";
import { Token } from "../services/token";

class AuthController {
  static async signin(req: Request, res: Response) {
    return res.send(true);
  }
  static async signup(req: Request, res: Response) {
    const { name, phoneNumber, password } = req.body;

    const existingSeller = await Seller.findOne({ phoneNumber });

    if (existingSeller) {
      throw new BadRequestError("seller already exists");
    }

    const seller = Seller.build({ name, phoneNumber, password });

    await seller.save();

    const jwt = Token.jwtSign(seller.id, seller.name, seller.phoneNumber);

    return res.send({ seller, jwt });
  }
}

export default AuthController;
