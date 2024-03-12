import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from '../entities/user.entity';

// Para que un Gard sea válido tiene que implementar la el método de Can Activate. El canal Activate tiene que regresar un valor booleano que diga true o false.
// Si es true lo deja pasar, si es un false, no lo deja pasar o una promesa que resuelva un booleano,

@Injectable()
export class UserRoleGuard implements CanActivate {
  // Entonces la idea de este reflector es que me va poder a mí a ver información de los decoradores y otra genera otra información de la metadata, del mismo método o donde esté puesto.

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // validRoles va a mostrar lo que viene en los decoradores
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    // Si (validRoles) no existe return true porque la autenticación la estoy haciendo en otro lugar. Es decir, si no existen los roles, quiere decir que cualquier persona puede entrar
    if (!validRoles) return true;

    // Entonces, si valid rails, punto Length es igual a cero, quiere decir que no hay configurado ningún rol. Vamos a dejarlo pasar.
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found');

    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }

    throw new ForbiddenException(
      `User ${user.fullName} need a valid role: [${validRoles}]`,
    );
  }
}
