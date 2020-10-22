import * as core from "express-serve-static-core";
import { logger } from "../../utils/logger"
import { EErrCode } from "../../config/errCode";
import { getReqParams } from "../../utils/common";
const pathWhiteList = ["/api/login"]
class CAdminUser {
  public checkSession(req: core.Request, res: core.Response, next: core.NextFunction) {
    if (pathWhiteList.indexOf(req.path) !== -1) {
      next();
      return
    }
    logger.info(req.session.userName)
    // 未登录
    if (!req.session || !req.session.userName) {
      res.json({ code: EErrCode.NoLogin, msg: "没有登录" });
      return;
    }
    next();
  }
  public login(req: core.Request, res: core.Response) {
    const data = getReqParams(req);
    req.session.regenerate((err) => {
      if (err) {
        return res.json({ code: EErrCode.UnKnown, msg: '登录失败' });
      }
      req.session.userName = data.userName;
      res.json({ code: EErrCode.OK, msg: { userName: data.userName } });
    });
  }
  public loginOut(req: core.Request, res: core.Response) {
    req.session.destroy((err) => {
      if (err) {
        res.json({ code: EErrCode.UnKnown, msg: '退出登录失败' });
        return;
      }
      res.json({ code: EErrCode.OK, msg: '退出登录' });
    });
  }
  public test(req: core.Request, res: core.Response) {
    res.json({ code: EErrCode.OK, msg: '测试' });
  }
  public getUserInfo(req: core.Request, res: core.Response) {
    const temp = {
      userName: "admin",
      roles: ["admin"]
    }
    res.json({code: EErrCode.OK,msg: temp})
  }
}

export const adminUser = new CAdminUser()