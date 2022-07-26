import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from '../user.model';
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
   * @param {UserEntity} user
   */
  async createUser(user: UserEntity) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  /**
   * Найти пользователя в БД по его почте
   * @param {string} email
   */
  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
