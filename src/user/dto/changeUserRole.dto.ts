import { UserRole } from '../user.model';
import { IsEnum, IsString } from 'class-validator';

export class ChangeUserRoleDto {
  @IsString()
  _id: string;

  @IsEnum(UserRole)
  role: UserRole;
}
