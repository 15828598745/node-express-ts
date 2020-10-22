import * as core from "express-serve-static-core";
export const getReqParams = (req: core.Request): any => {
  const params = {};
  if(req.params) {
    Object.assign(params,req.params)
  }
  if(req.query) {
    Object.assign(params,req.query)
  }
  if(req.body) {
    Object.assign(params,req.body)
  }
  return params;
}