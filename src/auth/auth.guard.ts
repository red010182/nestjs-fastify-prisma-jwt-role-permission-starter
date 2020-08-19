import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FastifyRequest } from 'fastify'
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private auth: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest<FastifyRequest>();
      const [__, token] = request.headers.authorization.split('Bearer ')

      if(!token) return false

      const user:any = this.auth.decodeJwtToken(token)

      if(!user || !user['id']) return false

      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if(roles && roles.length > 0 && roles.indexOf(user.role.name) === -1) {
        return false
      }

      request['user'] = user
      return true
    } catch(e) {
      return false
    }
  }
}
