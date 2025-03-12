import { UserModel } from '@apps/users/database/user.model';
import {
  UserRepository,
  userRepository,
} from '@apps/users/database/user.repository';
import { UserResponse } from '@apps/users/dto/response/user.response';
import { UserMapper } from '@apps/users/mappers/user.mapper';
import { Result } from '@common/result';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(username: string): Promise<Result<UserResponse>> {
    const userByName = await this.repository.findByUsername(username);
    if (userByName) {
      return {
        status: 409,
        success: false,
        errorMessage: 'User with the same username already exists',
      };
    }
    const userModel = await this.repository.create(username);
    return { data: UserMapper.mapModel(userModel), status: 201, success: true };
  }

  async getAll(): Promise<UserResponse[]> {
    const models = await this.repository.getAll();
    return UserMapper.mapModels(models);
  }

  async findById(userId: string): Promise<UserModel | null> {
    return this.repository.findById(userId);
  }

  async increaseBalance(
    userId: string,
    replenishmentAmount: number,
  ): Promise<Result<UserResponse>> {
    const user = await this.findById(userId);
    if (!user) {
      return { status: 404, success: false, errorMessage: 'User not found' };
    }

    const userModel = await this.repository.increaseBalance(
      userId,
      replenishmentAmount,
    );
    return { data: UserMapper.mapModel(userModel), success: true, status: 200 };
  }
}

export const userService = new UserService(userRepository);
