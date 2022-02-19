import axios from "axios";
import { AuthenticationContext, runWithAdal } from "react-adal";

import {
  BuildAdalConfig,
  GetAzureGroupAuthIds,
  GetGraphToken,
  SetApp,
} from "../utils/azure/app-azure.helper";

export interface IAuthService {
  Auth(app: any): void;
  Authorize(): any;
}

const GraphMemberShipUrl = process.env.REACT_APP_GRAPH_MEMBERSHIP_GROUPS_URL;

export class AuthService implements IAuthService {
  AuthContext: AuthenticationContext;
  IsAuthorized: boolean;

  constructor(context: AuthenticationContext, isAuthorized: boolean = false) {
    this.AuthContext = context;
    this.IsAuthorized = isAuthorized;
  }

  Auth(app: any): void {
    return runWithAdal(
      this.AuthContext,
      async () => {
        //const { IsAuthorized, AuthIds } = await this.Authorize();

        return SetApp(app, {
          IsAuthorized: true,
          AuthContext: this.AuthContext,
          AuthIds: [],
          Role: "default",
        });
      },
      false
    );
  }

  async Authorize(): Promise<any> {
    if (GraphMemberShipUrl === null || GraphMemberShipUrl === undefined)
      throw new Error("");

    const params = {
      groupIds: [
        process.env.REACT_APP_AZURE_AUTHENTICATION_GROUP_ID,
        ...GetAzureGroupAuthIds(),
      ],
    };

    const token = await GetGraphToken(this.AuthContext);

    if (!token || token === undefined) throw new Error("Token not valid");

    try {
      const response = await axios.post(GraphMemberShipUrl, params, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return {
        IsAuthorized:
          response.data && response.data.value && !!response.data.value.length,
        AuthIds: response.data.value,
      };
    } catch (error) {
      throw error;
    }
  }
}

const Auth = (app: any) => {
  const authService = new AuthService(
    new AuthenticationContext(BuildAdalConfig())
  );

  authService.Auth(app);
};

export default Auth;
