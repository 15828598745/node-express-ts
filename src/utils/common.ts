import * as core from "express-serve-static-core";

export const getReqParams = (req: core.Request): any => {
  const params = {};
  if (req.params) {
    Object.assign(params, req.params)
  }
  if (req.query) {
    Object.assign(params, req.query)
  }
  if (req.body) {
    Object.assign(params, req.body)
  }
  return params;
}

export const formatDate = (date: Date = new Date(),fmt: string = "YYYY-mm-dd") => {
  const opt: any = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
  };
  let ret: RegExpExecArray;
  for (const k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? opt[k] : opt[k].padStart(ret[1].length, "0"))
    };
  };
  return fmt;
}