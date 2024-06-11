import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DynamicCorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin as string;

    // Allow any origin but set the specific origin dynamically
    if (origin) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    // Handle preflight request
    if (req.method === 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE',
      );
      res.sendStatus(200);
    } else {
      next();
    }
  }
}
