import User from "../models/User.mjs";
import bcrypt from "bcrypt";
import createUserToken from "../helpers/create-user-token.mjs";

export default class UserController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    // validations
    if (!name) {
      res.status(402).json({ message: "O nome é obrigatório" });
      return;
    }
    if (!email) {
      res.status(402).json({ message: "O e-mail é obrigatório" });
      return;
    }
    if (!phone) {
      res.status(402).json({ message: "O telefone é obrigatório" });
      return;
    }
    if (!password) {
      res.status(402).json({ message: "A senha é obrigatória" });
      return;
    }
    if (!confirmpassword) {
      res.status(402).json({ message: "A confirmação de senha é obrigatória" });
      return;
    }
    if (password !== confirmpassword) {
      res.status(402).json({
        message: "A senha e a confirmação de senha precisam ser iguais!",
      });
      return;
    }

    // cheack if user exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(402).json({
        message: "O e-mail enviado já está em uso!",
      });
      return;
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
