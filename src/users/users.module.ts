import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from 'src/common/guards/AuthGuard.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '5m' },
      }),
    }),
  ],
  providers: [UsersService, AuthGuard],
  controllers: [UserController],
  exports: [JwtModule],
})
export class UsersModule {}
