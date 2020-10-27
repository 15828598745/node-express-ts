import * as core from "express-serve-static-core";
import { logger } from "../../utils/logger"
import { EErrCode } from "../../config/errCode";
import { getReqParams } from "../../utils/common";
import TAdminUser from "../../datebase/models/adminUser";
import { IErrMsg } from "../../interface/comm";
import { Op } from "sequelize"
import { adminLog } from "./adminLog";
import Joi from "joi";
import { bindExpress } from "../../utils/joi";
const pathWhiteList = ["/api/login"]
class CAdminUser {

  public checkSession(req: core.Request, res: core.Response, next: core.NextFunction) {
    if (pathWhiteList.indexOf(req.path) !== -1) {
      next();
      return
    }
    // 未登录
    if (!req.session || !req.session.adminUserId) {
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
    const ret1 = await adminLog.addLog("登录", "验证", ret.name);
    if (!ret1) {
      return res.json({ code: EErrCode.UnKnown, msg: '登录日志添加失败' });
    }
    req.session.regenerate((err) => {
      if (err) {
        return res.json({ code: EErrCode.UnKnown, msg: '登录失败' });
      }
      req.session.adminUserId = ret.adminUserId;
      req.session.name = ret.name;
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

  public getUserInfo = async (req: core.Request, res: core.Response) => {
    // 未登录
    const ret = await this.getMyUserInfo(req)
    res.json(ret)
  }

  public async updateUser(req: core.Request, res: core.Response) {
    const { name, pwd, power, adminUserId } = getReqParams(req);
    const temp: any = {};
    if (name) {
      temp.name = name
    }
    if (pwd) {
      temp.pwd = pwd
    }
    if (power) {
      temp.power = power;
    }
    const ret1 = await adminLog.addLog("管理员", "修改", req.session.name);
    if (!ret1) {
      return res.json({ code: EErrCode.UnKnown, msg: '登录日志添加失败' });
    }
    const ret = await TAdminUser.update(temp, { where: { adminUserId } });
    if (!ret) {
      res.json({ code: EErrCode.UnKnown, msg: "操作失败" });
      return;
    }
    res.json({ code: EErrCode.OK, msg: "操作成功" })
  }

  public addUser = async (req: core.Request, res: core.Response) => {
    const { name, pwd, power } = getReqParams(req);
    const ret = await this.getMyUserInfo(req)
    const parent = ret.msg.adminUserId;
    const temp = {
      name,
      pwd,
      parent,
      power,
      createDate: new Date()
    };
    const ret1 = await TAdminUser.create(temp);
    if (!ret1) {
      res.json({ code: EErrCode.UnKnown, msg: "操作失败" });
      return;
    }
    const ret2 = await adminLog.addLog("管理员", "添加", req.session.name);
    if (!ret2) {
      return res.json({ code: EErrCode.UnKnown, msg: '登录日志添加失败' });
    }
    res.json({ code: EErrCode.OK, msg: "操作成功" });
  }

  public async delUser(req: core.Request, res: core.Response) {
    const { adminUserId } = getReqParams(req);
    const ret = await TAdminUser.destroy({ where: { adminUserId } });
    if (!ret) {
      res.json({ code: EErrCode.UnKnown, msg: "操作失败" });
      return;
    }
    const ret1 = await adminLog.addLog("管理员", "删除", req.session.name);
    if (!ret1) {
      return res.json({ code: EErrCode.UnKnown, msg: '登录日志添加失败' });
    }
    res.json({ code: EErrCode.OK, msg: "操作成功" });
  }

  public getUserList = async (req: core.Request, res: core.Response) => {

    const ret = await this.getMyUserInfo(req);
    if (ret.code !== EErrCode.OK) {
      res.json(ret);
      return
    }
    let nret;
    // 超级管理员
    if (ret.msg.parent === 0) {
      nret = await TAdminUser.findAll()
    } else {
      nret = await TAdminUser.findAll({ where: { [Op.or]: [{ parent: ret.msg.adminUserId }, { adminUserId: ret.msg.adminUserId }] } })
    }
    res.json({ code: EErrCode.OK, msg: nret })
  }

  public async getMyUserInfo(req: core.Request): Promise<IErrMsg> {
    const adminUserId = req.session.adminUserId;
    const ret = await TAdminUser.findOne({
      where: { adminUserId }
    });
    if (!ret) {
      return { code: EErrCode.NoUserName, msg: `没有${adminUserId}用户!` };
    }
    return { code: EErrCode.OK, msg: ret };
  }
}

export const adminUser = new CAdminUser()