import * as core from "express-serve-static-core";
import { logger } from "../../utils/logger"
import { EErrCode } from "../../config/errCode";
import { getReqParams } from "../../utils/common";
import TAdminUser from "../../datebase/models/adminUser";
const pathWhiteList = ["/api/login"]
class CAdminUser {
  public checkSession(req: core.Request, res: core.Response, next: core.NextFunction) {
    if (pathWhiteList.indexOf(req.path) !== -1) {
      next();
      return
    }
    // 未登录
    if (!req.session || !req.session.userName) {
      res.json({ code: EErrCode.NoLogin, msg: "没有登录" });
      return;
    }
    next();
  }
  public async login(req: core.Request, res: core.Response) {
    const { userName, pwd } = getReqParams(req);
    const ret = await TAdminUser.findOne({
      where: { name: userName }
    });
    if (!ret) {
      res.json({ code: EErrCode.NoUserName, msg: `没有${userName}用户!` });
      return;
    }
    if (ret.pwd !== pwd) {
      res.json({ code: EErrCode.PwdError, msg: "密码错误" });
      return;
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.json({ code: EErrCode.UnKnown, msg: '登录失败' });
      }
      req.session.userName = userName;
      res.json({ code: EErrCode.OK, msg: "登录成功" });
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
  public async getUserInfo(req: core.Request, res: core.Response) {
    // 未登录
    if (!req.session || !req.session.userName) {
      res.json({ code: EErrCode.NoLogin, msg: "没有登录" });
      return;
    }
    const userName = req.session.userName;
    const ret = await TAdminUser.findOne({
      where: { name: userName }
    });
    if(!ret) {
      res.json({ code: EErrCode.NoUserName, msg: `没有${userName}用户!` });
      return;
    }
    const temp = {
      userName: ret.name,
      roles: ["admin"]
    }
    res.json({ code: EErrCode.OK, msg: temp })
  }
}

export const adminUser = new CAdminUser()