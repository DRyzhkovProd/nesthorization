import { InjectModel } from '@nestjs/mongoose';
import { UserModel, UserRole } from '../user.model';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';

/**
 * Логика по работе с пользователем напрямую в БД
 *
 */
@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
  ) {}

  /**
   * Создать пользователя в БД
   */
  async createUser(user: UserEntity) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  /**
   * Найти пользователя в БД по его почте
   *
   */
  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  /**
   * Сменить роль пользователю
   * @param {string} id
   * @param {UserRole} role
   */
  async changeUserRole(id: string, role: UserRole) {
    return this.userModel.findByIdAndUpdate(id, { role }).exec();
  }

  /**
   * Получить всех пользователей из базы
   */
  async getAllUsers() {
    return this.userModel.find().exec();
  }
}
