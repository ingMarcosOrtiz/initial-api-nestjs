import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Headers,
  SetMetadata,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth, GetUser, RawHeaders, RoleProtected } from './decorators';
import { User } from './entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role.guard';
import { ValidRoles } from './interfaces';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req() request: Express.Request
    @GetUser('roles') userRol: User,
    @GetUser() user: User,
    @RawHeaders() rawHeader: string[],
    // otra forma de ver los Header
    @Headers() header: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Hola ruta privada',
      userRol,
      user,
      rawHeader,
      header,
    };
  }
  // @SetMetadata('roles', ['admin', 'super-admin'])

  @Get('private2')
  // @RoleProtected(ValidRoles.superAdmin, ValidRoles.admin, ValidRoles.assistant)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('private3')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin)
  privateRoute3(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }

  @Get('user')
  @Auth(ValidRoles.admin, ValidRoles.superAdmin, ValidRoles.assistant)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.authService.findAll(paginationDto);
  }
}
