import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { ChangeUserRoleDto } from './dto/changeUserRole.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }
  async changeUserRole({ _id, role }: ChangeUserRoleDto) {
    return this.userRepository.changeUserRole(_id, role);
  }
}
