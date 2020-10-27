import TAdminLog from "../../datebase/models/adminLog";
import { IErrMsg } from "../../interface/comm";
import { EErrCode } from "../../config/errCode";
class CAdminLog {

  public addLog(module: string, type: string, operator: string) {
    return TAdminLog.create({
      module,
      type,
      operator,
      createDate: new Date()
    })
  }
}

export const adminLog = new CAdminLog()