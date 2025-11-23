import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();

    const authHeader = req.headers['authorization'] || '';
    if (!authHeader)
      throw new ForbiddenException({
        auth: false,
        message: 'Debe proporcionar el Token.',
      });

    let token = authHeader.toString();
    if (token.toLowerCase().startsWith('bearer ')) token = token.substring(7);

    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret)
      throw new InternalServerErrorException('JWT_SECRET no configurado.');

    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch {
      throw new InternalServerErrorException({
        auth: false,
        message: 'Fallo la autenticacion con el token.',
      });
    }

    const routeAny: any = (req as any).route;
    // const methods = routeAny?.methods ?? {};

    // if (methods.post) {
    //   const urlTrim = (req.url ?? '').startsWith('/')
    //     ? req.url.substring(1)
    //     : req.url;
    //   if (decoded.role != 'admin' && decoded.id != urlTrim)
    //     throw new UnauthorizedException({
    //       auth: false,
    //       message: 'Usuario no autorizado.',
    //     });
    // }

    // if (methods.get) {
    //   const urlTrim = (req.url ?? '').startsWith('/')
    //     ? req.url.substring(1)
    //     : req.url;
    //   if (decoded.role != 'admin' && decoded.id != urlTrim)
    //     throw new UnauthorizedException({
    //       auth: false,
    //       message: 'Usuario no autorizado.',
    //     });
    // }

    // if (methods.put) {
    //   const urlTrim = (req.url ?? '').startsWith('/')
    //     ? req.url.substring(1)
    //     : req.url;
    //   if (decoded.role != 'admin' && decoded.id != urlTrim)
    //     throw new UnauthorizedException({
    //       auth: false,
    //       message: 'Usuario no autorizado.',
    //     });
    // }

    // if (methods.delete) {
    //   const urlTrim = (req.url ?? '').startsWith('/')
    //     ? req.url.substring(1)
    //     : req.url;
    //   if (decoded.role != 'admin' && decoded.id != urlTrim)
    //     throw new UnauthorizedException({
    //       auth: false,
    //       message: 'Usuario no autorizado.',
    //     });
    // }

    (req as any).userId = decoded.id;

    return true;
  }
}
