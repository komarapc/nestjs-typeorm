import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PermissionsRepository } from '@/api/permissions/permissions.repository';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private permissionRepo: PermissionsRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    this.handleAuthorization(request);
    const url: string = request.url;
    const [_, afterVersion] = url.split(/api\/v\d+\//);
    const [resourcesUrl] = afterVersion.split('?');
    const method = request.method.toUpperCase();
    const { role_id } = this.jwt.decode(
      request.headers.authorization.split(' ')[1],
    );
    const permissions = (await this.permissionRepo.findByRoleId(role_id))?.map(
      (p) => ({
        id: p.id,
        allowedMethod: p.action,
        path: p.resource.path,
      }),
    );
    if (!permissions.length) throw new ForbiddenException('Forbidden Resource');
    const hasPermission = permissions?.some((permission) => {
      const { allowedMethod, path } = permission;
      const isAllowedMethod = allowedMethod.includes(method);
      const isAllowedPath = `/${resourcesUrl}`.includes(path);
      return isAllowedMethod && isAllowedPath;
    });
    if (!hasPermission) throw new ForbiddenException('Forbidden Resource');
    return true;
  }

  handleAuthorization(request: Request) {
    const authorization = request.headers.authorization;
    if (!authorization)
      throw new UnauthorizedException('Authorization header is missing');
    const [bearer, token] = authorization.split(' ');
    const errMessage = !token
      ? 'Token is missing'
      : 'Authorization header is invalid';
    if (bearer !== 'Bearer' || !token)
      throw new UnauthorizedException(errMessage);
    try {
      this.jwt.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError')
        throw new UnauthorizedException(error.message);
      throw new UnauthorizedException('Token is invalid');
    }
  }
}
