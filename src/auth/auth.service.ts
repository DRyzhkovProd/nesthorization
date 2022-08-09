import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { RegistrationDto } from './dto/registration.dto';
import {
  USER_EXISTED,
  USER_NOT_FOUND,
  WRONG_PASSWORD_ERROR,
} from './auth.constants';
import { UserRole } from '../user/user.model';
import { UserEntity } from '../user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registration({ email, password, name, displayName }: RegistrationDto) {
    const existedUser = await this.userRepository.findUser(email);
    if (existedUser) {
      throw new BadRequestException(USER_EXISTED);
    }
    const newUserEntity = await new UserEntity({
      email,
      name,
      displayName,
      passwordHash: '',
      role: UserRole.User,
    }).setPassword(password);
    const newUser = await this.userRepository.createUser(newUserEntity);
    return { email: newUser.email };
  }

  async validateUser(email: string, password: string) {
    const existedUser = await this.userRepository.findUser(email);
    if (!existedUser) {
      throw new UnauthorizedException(USER_NOT_FOUND);
    }
    const userEntity = new UserEntity(existedUser);
    const isCorrectPassword = await userEntity.validatePassword(password);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }
    return { email: existedUser.email };
  }

  async login(email: string) {
    const payload = { email };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get('JWT_ACCESS_EXPIRES'),
      }),
    };
  }
}
