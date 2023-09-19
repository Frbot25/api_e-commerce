import JWT from 'jsonwebtoken';
import e from 'express';
export default class Token {
  static generateToken(user: object) {
    const token = JWT.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    return token;
  }
  static verifyToken(
    request: e.Request,
    response: e.Response,
    next: e.NextFunction,
  ) {
    try {
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new Error('Token not found');
      }
      const decodedToken = JWT.verify(token, process.env.JWT_SECRET as string);
      const userId = decodedToken.userId;
      if (request.body.userId && request.body.userId !== userId) {
        throw new Error('Invalid user ID');
      } else {
        next();
      }
    } catch (error) {
      response.status(401).json({ error: error.message });
    }
  }
}
