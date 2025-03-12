import { UserModel } from '@apps/users/database/user.model';
import { UserResponse } from '@apps/users/dto/response/user.response';

export class UserMapper {
  static mapModel(model: UserModel): UserResponse {
    return {
      id: model.id,
      name: model.name,
      balance: parseFloat(model.balance),
      createdAt: model.created_at,
    };
  }

  static mapModels(models: UserModel[]): UserResponse[] {
    return models.map(UserMapper.mapModel);
  }
}
