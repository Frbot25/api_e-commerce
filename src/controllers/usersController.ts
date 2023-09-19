import User from '../models/usersModel';
import Joi from '../shemas/usersShema';
import Token from '../services/JWT';
const UserController = {
  signin: async (request, response) => {
    try {
      const email = request!.body!.email;
      const password = request!.body!.password;
      const user = await new User({ email, password }).signin();
      if (user) {
        const token = Token.makeToken(user);
        response.status(200).json({ user, token });
      }
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  signup: async (request, response) => {
    try {
      const body = request!.body;
      // verify body
      const verify = Joi.validateLogin(body);
      if (verify.error) {
        throw new Error(verify.error.message);
      }
      const user = await new User(body).signup();
      if (user) {
        response.status(201).json(user);
      }
    } catch (error) {
      response.status(409).json({ error: error.message });
    }
  },
};

export default UserController;
