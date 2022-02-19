export default class UserAuthContext {
  AuthContext: any;
  IsAuthorized: boolean;
  Role: any;
  AuthIds: Array<string>;

  constructor(
    authContext: any,
    isAuthorized: boolean,
    role: any,
    authIds: Array<string> = []
  ) {
    this.AuthContext = authContext;
    this.IsAuthorized = isAuthorized;
    this.Role = role;
    this.AuthIds = authIds;
  }
}
