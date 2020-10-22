import { logger } from "../utils/logger"
import { IRouteConfig, ERequireType } from "../interface/touter"
import { adminUser } from "../controller/api/adminUser";

export const routeConfig: IRouteConfig = {
  "entry": [adminUser.checkSession],
  "/api": {
    "/login": {
      "type": ERequireType.post,
      "handle": adminUser.login
    },
    "/loginOut": {
      "type": ERequireType.post,
      "handle": adminUser.loginOut
    },
    "/getUserInfo": {
      "type": ERequireType.post,
      "handle": adminUser.getUserInfo
    },
    "/test": {
      "type": ERequireType.post,
      "handle": adminUser.test
    }
  }
}