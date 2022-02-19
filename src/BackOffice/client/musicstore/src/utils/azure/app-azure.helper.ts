import axios from "axios";
import { AdalConfig, adalGetToken, AuthenticationContext } from "react-adal";
import { AZURE_AD_CONFIG } from "../../models/constants";
import UserAuthContext from "../../models/user-auth";

const graphUrl = process.env.REACT_APP_GRAPH_URL || undefined;
const groupId = process.env.REACT_APP_AZURE_AUTHENTICATION_GROUP_ID;
const AppGatewayId = process.env.REACT_APP_AZURE_AD_APP_GATEWAY_ID;

export const GetRole = (authIds: Array<string>): string => {
  if (!authIds || authIds.length === 0)
    throw new Error("Auth IDs are no valid or empty");

  const response: Array<{ azureGroupId: string }> = []; // await query from db

  const roleId = authIds?.filter((x) => x !== groupId);

  const role = response?.filter((x) => x.azureGroupId === roleId[0]);

  return role ? role[0].toString() : "";
};

export function AddAxiosInterceptor(authContext: AuthenticationContext) {
  if (AppGatewayId === "" || AppGatewayId === undefined)
    throw new Error("Gateway Id is required");

  try {
    axios.interceptors.request.use(
      async (config) => {
        const clone: any = { ...config };

        const { userName, profile } = authContext?.getCachedUser() ?? {};

        const token = await adalGetToken(authContext, AppGatewayId);

        if (token) {
          clone.headers.Authorization = `Bearer ${token}`;
          clone.headers.AppName = "musicstore";
          clone.headers.userName = userName;
          clone.headers.userMail = profile;
        }

        return clone;
      },
      (err) => Promise.reject(err)
    );
  } catch (error) {
    throw error;
  }
}

export const GetGraphToken = (
  authContext: AuthenticationContext
): Promise<any> => {
  if (graphUrl === "" || graphUrl === undefined) return Promise.resolve(null);

  try {
    return new Promise((resolve, reject) => {
      authContext.acquireToken(graphUrl, (_, token, msg) =>
        !msg ? resolve(token) : reject(new Error(msg))
      );
    });
  } catch (error) {
    throw error;
  }
};

export const GetAzureGroupAuthIds = (): string[] => {
  const authGroupIds = process.env.REACT_APP_AZURE_AUTHORIZATION_GROUP_IDS;

  console.log(authGroupIds);
  if (authGroupIds === "" || authGroupIds === undefined)
    throw new Error("Authorization Groups cannot be null or empty");

  return authGroupIds.split(",");
};

export const SetApp = async (app: any, userContext: UserAuthContext) => {
  const { AuthContext, AuthIds } = userContext;

  let { IsAuthorized } = userContext;

  // if (IsAuthorized) AddAxiosInterceptor(AuthContext);

  // const role = await GetRole(AuthIds);

  const role = "default";

  if (!role) IsAuthorized = false;

  app(new UserAuthContext(AuthContext, IsAuthorized, role));
};

export const BuildAdalConfig = (): AdalConfig => {
  const { Tenant, ClientId, RedirectUri } = AZURE_AD_CONFIG;

  const config: AdalConfig = {
    tenant: Tenant,
    clientId: ClientId!,
    redirectUri: RedirectUri,
    cacheLocation: "localStorage",
  };

  return config;
};
