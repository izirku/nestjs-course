import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authJwtToken = req.headers['authorization'];

    if (!authJwtToken) {
      return next();
    }

    try {
      const user = jwt.verify(authJwtToken, JWT_SECRET);
      if (user) {
        console.log('found user details in JWT:', user);
        req['user'] = user;
      }
    } catch (err) {
      console.log('error handling JWT:', err);
    }
    next();
  }
}
