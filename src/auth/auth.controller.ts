import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('/registration')
  async registration(@Body() dto: RegistrationDto) {
    return this.authService.registration(dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/login')
  async login(@Body() { login, password }: LoginDto) {
    const { email } = await this.authService.validateUser(login, password);
    return this.authService.login(email);
  }
}
