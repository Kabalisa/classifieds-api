import { Request, Response } from "express";

class AuthController {
  static async signin(req: Request, res: Response) {
    return res.send(true);
  }
  static async signup(req: Request, res: Response) {
    const { name, phoneNumber, password } = req.body;
    console.log("==>>name", name);
    console.log("==>>phoneNumber", phoneNumber);
    console.log("==>>password", password);
    return res.send(true);
  }
}

export default AuthController;
