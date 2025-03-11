import { UserModel } from '@apps/users/database/user.model';
import {
  UserRepository,
  userRepository,
} from '@apps/users/database/user.repository';

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(username: string): Promise<UserModel> {
    return this.repository.create(username);
  }

  async getAll(): Promise<UserModel[]> {
    return this.repository.getAll();
  }
}

export const userService = new UserService(userRepository);
