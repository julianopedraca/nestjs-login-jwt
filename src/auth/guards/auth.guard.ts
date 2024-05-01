import { Injectable, CanActivate, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private redisService: RedisService,
    private jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    
    try {
      const token = await this.redisService.getToken(request.headers.authorization)

      await this.jwtService.verifyAsync(token)

      return true;
  
    } catch (error) {
      this.redisService.delete(request.headers.authorization)
      throw new UnauthorizedException({ error: error.message })
    }

  }
}
