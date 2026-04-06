import { Module } from '@nestjs/common';
import { AuthModule } from '@flexica/auth';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// Authentication Controller
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() credentials: { email: string; password: string }) {
    return this.authService.login(credentials);
  }
}

// User Service Mock
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { email: 'test@example.com', password: 'password' },
  ];

  async findUser(email: string) {
    return this.users.find(user => user.email === email);
  }
}

// Guards
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;
    const user = await this.authService.validateUser(email, password);
    return !!user;
  }
}