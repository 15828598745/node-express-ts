import * as core from "express-serve-static-core";
export enum ERequireType {
  "all" = "all",
  "get" = "get",
  "post" = "post",
  "put" = "put",
  "delete" = "delete",
  "patch" = "patch",
  "options" = "options",
  "head" = "head"
}

export interface IRouteHandle {
  handle: core.RequestHandler,
  type: ERequireType
}
export interface IRouteConfig {
  [route: string]: IRouteConfig | IRouteHandle | core.RequestHandler[]
}