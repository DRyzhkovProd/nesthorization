import { IUser, UserRole } from '../user.model';
import { genSalt, hash, compare } from 'bcryptjs';

/**
 * Имплементация бизнес логики по работе с сущностью Пользователя
 *
 * @property {string} _id? - id MongoDB
 * @property {string} displayName - алиас для имени пользователя
 * @property {string} email - почта пользователя
 * @property {string} name - имя
 * @property {string} passwordHash - хэш пароля
 * @property {UserRole} role - enum роли пользователя
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
   * @param {string} password - Пароль.
   * @returns {IUser} - Экземпляр класса UserEntity
   */
  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  /**
   * Проверка пароля на соответствие хешированному паролю
   * @param {string} password - Пароль
   * @return {boolean}
   */
  public async validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }
}
