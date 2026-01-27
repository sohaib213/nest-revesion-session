# NestJS User Controller Setup Guide

## 1. Create User Module

```typescript
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  providers: [UsersService],
  controllers: [UserController],
})
export class UsersModule {}
```

Note: Don't forget Nest CLI

task: Make a DNS module

## 2. Create User Controller

Create a controller class with `getAllUsers` and `createUser` functions:
[Users Controller](src/users/users.controller.ts)

## 3. DTO (Data Transfer Object)

### Install Required Packages

```bash
npm i --save class-validator class-transformer @nestjs/mapped-types
```

#### Build CreateUserDto Class

[CreatUserDto](src/users/dto/createUser.dto.ts)

### Configure Global Validation Pipe

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

## 4. Create Service class

implement functions `getAllUsers`, `createUser`
[UserService](src/users/users.service.ts)

### Don't forget CLI

## 5. Create Transform Interceptor

Create an interceptor that is `Injectable` and implements `NestInterceptor`:
[Interceptor](src/common/interceptors/transform.interceptor.ts)

## Task1

create new resource DNS

```bash
nest g resource dns
```

implement functions `getIp()`, `addIp()` and creating suitable DTO
[DNS CONTROLLER](src/dns/dns.service.ts)

## 6. Create Exception Filter

Create an exception filter with `@Catch` decorator that implements `ExceptionFilter` to uniformize exceptions responses:
[Exception Filter](src/common/filters/allExceptionFilter.ts)

## 7. Build AuthGaurd for updateUser

create AuthGauard class with `Injectable()` decorator and implements `CanActivate`

we need install jwt

```bash
npm i --save @nestjs/jwt
```

[AuthGuard](src/common/guards/AuthGuard.guard.ts)

create interface JwtPayload
[JwtInterface](src/common/interfaces/JwtPayload-interface.ts)

configure jwt in users module

```typescript
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '5m' },
    }),
  ],
```

add in imports in `app.module` to allow `.env`

```typescript
ConfigModule.forRoot({ isGlobal: true });
```

## 8. implement login function

[Login](src/users/users.service.ts#L48)

## Task2

build role guard to protect addIp
implement functions update, delete IP with verify the user

---
