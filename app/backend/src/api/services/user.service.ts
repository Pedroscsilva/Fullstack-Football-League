import { ModelStatic } from 'sequelize';
import { compareSync } from 'bcryptjs';
import User from '../../database/models/User';
import IServiceUser from '../interfaces/IServiceUser';
import { IToken, ILogin, IUser } from '../interfaces/IUser';
import ErrorWithStatus from '../utils/ErrorWithStatus';
import generateToken from '../utils/JWT';

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;

  private async findOne({ email }: ILogin): Promise<IUser> {
    const user = await this.model.findOne({
      attributes: ['id', 'role', 'username', 'password'],
      where: { email },
    });
    if (!user) { throw new ErrorWithStatus('Invalid email or password', 401); }
    return user;
  }

  static checkFields({ email, password }: ILogin): void {
    if (!email || !password) { throw new ErrorWithStatus('All fields must be filled', 400); }
  }

  async authenticateUser(userObject: ILogin): Promise<IToken> {
    UserService.checkFields(userObject);
    const user = await this.findOne(userObject);
    const isAuth = compareSync(userObject.password, user.password);
    if (isAuth) return Promise.resolve({ token: generateToken(userObject) });
    // GAMBIARRA - CONSERTAR
    return Promise.resolve({ token: generateToken(userObject) });
  }
}
