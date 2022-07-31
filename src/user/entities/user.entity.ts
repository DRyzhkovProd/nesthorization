import { IUser, UserRole } from '../user.model';
import { genSalt, hash, compare } from 'bcryptjs';

/**
 * Имплементация бизнес логики по работе с сущностью Пользователя
 */
export class UserEntity implements IUser {
  _id?: string;
  displayName: string;
  email: string;
  name: string;
  passwordHash: string;
  role: UserRole;

  constructor(user: IUser) {
    this._id = user._id;
    this.displayName = user.displayName;
    this.email = user.email;
    this.name = user.name;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
  }

  /**
   * Устанавливает захешированый с помощью bcryptjs пароль
   */
  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  /**
   * Проверка пароля на соответствие хешированному паролю
   */
  public async validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
}
