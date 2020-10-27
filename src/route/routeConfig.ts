import { logger } from "../utils/logger"
import { IRouteConfig, ERequireType } from "../interface/touter"
import { adminUser } from "../controller/api/adminUser";
import { upload } from "../controller/upLoad/upload";
import multer from "multer";
import path from "path";
import { appConf } from "../config/appConf";
const tempUpload = multer({ dest: path.join(appConf.rootPath, "/upload/tempUpload") })

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
    "/getUserList": {
      "type": ERequireType.post,
      "handle": adminUser.getUserList
    },
    "/updateUser": {
      "type": ERequireType.post,
      "handle": adminUser.updateUser
    },
    "/addUser": {
      "type": ERequireType.post,
      "handle": adminUser.addUser
    },
    "/delUser": {
      "type": ERequireType.post,
      "handle": adminUser.delUser
    }
  },
  "/upload": {
    "/uploadChunk": {
      "type": ERequireType.post,
      "handle": [tempUpload.single("file"), upload.uploadChunk]
    },
    "/mergeChunks": {
      "type": ERequireType.post,
      "handle": upload.mergeChunks
    }
  }
}