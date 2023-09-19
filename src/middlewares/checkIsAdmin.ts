import { Request, Response, NextFunction } from 'express';
import User from '../models/usersModel';
import Admin from '../models/adminModel';

let Id;
let roleId;
export default async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  for (const key in request.user) {
    if (key === 'roleId') {
      roleId = request.user[key];
    } else if (key === 'id') {
      Id = request.user[key];
    }
  }
  try {
    const user = await User.findUserById(Id);
    if (!user) {
      throw new Error('User not found');
    } else if (user.role_id !== roleId) {
      throw new Error('Not authorized');
    } else {
      const RolIdUser = await Admin.findRoleByRoleId(user.role_id);
      const { type } = RolIdUser[0];
      if (type !== 'admin') {
        throw new Error('Not authorized');
      }
      next();
    }
  } catch (error) {
    response.status(401).json(error.message);
  }
};
