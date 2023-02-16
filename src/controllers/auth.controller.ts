import { Request, Response } from "express";
import { Seller } from "../models/seller";
import { BadRequestError } from "../errors";
import { Token } from "../services/token";
import { Password } from "../services/password";

class AuthController {
  static async signin(req: Request, res: Response) {
    const { phoneNumber, password } = req.body;

    const existingSeller = await Seller.findOne({ phoneNumber });

    if (!existingSeller) {
      throw new BadRequestError("seller does not exist");
    }

    const passwordMatch = await Password.compare(
      password,
      existingSeller.password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid password");
    }

    const jwt = Token.jwtSign(
      existingSeller.id,
      existingSeller.name,
      existingSeller.phoneNumber
    );

    return res.send({ seller: existingSeller, jwt });
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

  static async currentUser(req: Request, res: Response) {
    return res.send({ currentUser: req.currentUser || null });
  }
}

export default AuthController;
