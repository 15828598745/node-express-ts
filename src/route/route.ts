import * as core from "express-serve-static-core";
import { routeConfig } from "./routeConfig";
import { IRouteConfig, ERequireType, IRouteHandle } from "../interface/touter";
import express from "express";

export class CRoute {
  _app: core.Express
  constructor(app: core.Express) {
    this._app = app;
    this.init();
  }
  private init() {
    this.chandle(routeConfig, this._app);
  }
  private chandle(config: IRouteConfig, app: core.Express) {
    for (const i in config) {
      if (config[i].hasOwnProperty("type")) {
        const item = config[i] as IRouteHandle;
        const handle = item.handle;
        switch (item.type) {
          case ERequireType.all: app.all(i, handle); break;
          case ERequireType.get: app.get(i, handle); break;
          case ERequireType.post: app.post(i, handle); break;
          case ERequireType.put: app.put(i, handle); break;
          case ERequireType.delete: app.delete(i, handle); break;
          case ERequireType.patch: app.patch(i, handle); break;
          case ERequireType.options: app.options(i, handle); break;
          case ERequireType.head: app.head(i, handle); break;
        }
      } else if (i === "entry") {
        const entry = config[i] as core.RequestHandler[];
        app.use(...entry);
      } else {
        const nApp = express();
        app.use(i, nApp);
        this.chandle(config[i] as IRouteConfig, nApp);
      }
    }
  }
}