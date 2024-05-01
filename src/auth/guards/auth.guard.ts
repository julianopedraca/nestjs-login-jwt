import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
    constructor(
       private redisService: RedisService,
    ){}
  
    canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    // this.redisService.getToken()
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);
    return true;
  }
}
