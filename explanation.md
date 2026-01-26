# NestJS User Controller Setup Guide

## 1. Create User Controller

Create a controller class with `getAllUsers` and `createUser` functions:

```typescript
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UserController {
  @Get()
  getAllUsers() {
    return 'g';
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return 'u';
  }
}
```

## 2. Create DTO (Data Transfer Object)

### Install Required Packages

```bash
npm i --save class-validator class-transformer
```

### Create CreateUserDto Class

```typescript
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsString()
  username?: string;

  @Type(() => Number)
  @IsNumber()
  age: number;
}
```

## 3. Configure Global Validation Pipe

In `main.ts`, add global validation configuration:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

## 4. Create Transform Interceptor

Create an interceptor that is `Injectable` and implements `NestInterceptor`:

```typescript
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        timestamp: new Date(),
      })),
    );
  }
}
```

## 5. Create Exception Filter

Create an exception filter with `@Catch` decorator that implements `ExceptionFilter` to uniformize responses:

```typescript
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal Server Error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      message = exception.getResponse();
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      error: message,
      timestamp: new Date(),
    });
  }
}
```

## 6. Build AuthGaurd

create AuthGauard class with `Injectable()` decorator and implements `CanActivate`

we need install jwt

```bash
npm i --save @nestjs/jwt
```

the class:

```typescript
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RequestWithUser } from '../interfaces/requestWithUser-interface';
import { JwtPayload } from '../interfaces/JwtPayload-interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: RequestWithUser = context.switchToHttp().getRequest();
    const token = this.extractToken(req);
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      req.currentUser = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractToken(req: Request): string {
    const authorization = req.headers.authorization;
    if (!authorization) throw new UnauthorizedException('Token Not Found');
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('Token Not Found');
    return token;
  }
}
```

---
