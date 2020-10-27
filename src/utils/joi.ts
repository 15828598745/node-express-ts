import * as core from "express-serve-static-core";
import Joi from "joi";
import { logger } from "./logger";
/* const vRet = bindExpress(req, Joi.object().keys({
  userName: Joi.string().min(4).max(16).required(),
  pwd: Joi.string().min(4).max(16).required(),
}))
logger.info(vRet.error) */
export const bindExpress = (req: core.Request, schema: Joi.Schema) => {
  const params: any = {};
  if (req.params) {
    Object.assign(params, req.params)
  }
  if (req.query) {
    Object.assign(params, req.query)
  }
  if (req.body) {
    Object.assign(params, req.body)
  }
  const ret = Joi.validate(params, schema, { allowUnknown: true, stripUnknown: { arrays: false, objects: true } });
  let detail = null;
  if (ret.error) {
    detail = ret.error.details.map(d => d.message);
  }
  return { ...ret, error: detail };
}