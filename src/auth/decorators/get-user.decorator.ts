import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

// Decorator: los decorator no es mas que funciones 🤷‍♂️
// createParamDecorator: espera como argumento un callbacks es decir una funcion que debe de retornar algo

export const GetUser = createParamDecorator(
  // data: la data que espera recibir
  // ctx: es el contexto que es de tipo ExecutionContext, que es donde viene toda la info del usuario atraves de la getRequest
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    // si no viene el usuario mandamos un error 500. Porque es algo que yo, como desarrollador de backend, estoy cometiendo el error.Es decir, estoy intentando tener un usuario, pero no pasé por el lugar del usuario.Entonces eso es un error.500 from new y voy a poner Internal Server error y el mensaje que voy a colocar y user not found
    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    // si no existe la data, entonces voy a regresar todo el usuario. Pero si existe la data, voy a regresar el usuario. El usuario con la propiedad computada de la data.
    return !data ? user : user[data];
  },
);
