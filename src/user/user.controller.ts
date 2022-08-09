import {
  Body,
  Controller,
  Get,
  Patch,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ChangeUserRoleDto } from './dto/changeUserRole.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Patch('/change/role')
  async changeUserRole(@Body() dto: ChangeUserRoleDto) {
    return this.userService.changeUserRole(dto);
  }
}
