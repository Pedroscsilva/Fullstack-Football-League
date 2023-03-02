import { ILogin, IToken } from './IUser';

export default interface IServiceUser {
  authenticateUser(userObject: ILogin): Promise<IToken | null>;
}
