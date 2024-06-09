import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from '../user.service';
import { ApiKeyService } from '../api-key.service';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'] as string;
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    try {
      const user = await this.apiKeyService.validateApiKey(apiKey);
      (req as any).user = user; // Attach user object to the request
      next(); // Move to the next middleware or route handler
    } catch (error) {
      throw new UnauthorizedException('Invalid API key');
    }
  }
}
