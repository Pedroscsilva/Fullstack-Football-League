import { ModelStatic } from 'sequelize';
import { compareSync } from 'bcryptjs';
import User from '../../database/models/User';
import IServiceUser from '../interfaces/IServiceUser';
import { IToken, ILogin, IUser } from '../interfaces/IUser';
import ErrorWithStatus from '../utils/ErrorWithStatus';
import { generateToken } from '../utils/JWT';

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;
  private _invalidMessage = 'Invalid email or password';

  private async findOne({ email }: ILogin): Promise<IUser> {
    const user = await this.model.findOne({
      attributes: ['id', 'role', 'username', 'password'],
      where: { email },
    });
    if (!user) { throw new ErrorWithStatus(this._invalidMessage, 401); }
    return user;
  }

  static checkFields({ email, password }: ILogin): void {
    const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !password) { throw new ErrorWithStatus('All fields must be filled', 400); }
    if (password.length < 6 || (!emailValidation.test(email))) {
      throw new ErrorWithStatus('Invalid email or password', 401);
    }
  }

  async authenticateUser(userObject: ILogin): Promise<IToken | null> {
    UserService.checkFields(userObject);
    const user = await this.findOne(userObject);
    const isAuth = compareSync(userObject.password, user.password);
    if (isAuth) {
      const token = await generateToken({ ...userObject, role: user.role });
      return { token };
    }
    throw new ErrorWithStatus(this._invalidMessage, 401);
  }
}
