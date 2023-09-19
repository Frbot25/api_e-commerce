// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      request?: Request;
      response: Response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user?: any;
      next?: NextFunction;
    }
  }
}
