import express from "express";
import session from "express-session";
import FileStore from "session-file-store";
import dotenv from "dotenv";
import { CRoute } from "./route/route";
import bodyParser from "body-parser";
import cors from "cors";
import cookie from "cookie-parser";
import { logger } from "./utils/logger";
import { appConf } from "./config/appConf";
import { initMysql } from "./datebase";

const app = express();
// 获取配置
dotenv.config();

// 跨域
app.use(cors({
  origin: appConf.origin,
  allowedHeaders: ["Content-Type", "Content-Length", "Authorization", "x-token"],
  exposedHeaders: ["Content-Disposition"],
  credentials: true,
}))
// session 初始化 必须在路由初始化之前
// const fileStore = FileStore(session)
app.use(session({
  name: "skey",
  secret: "chyingp",  // 用来对session id相关的cookie进行签名
  // store: new fileStore(),  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: appConf.maxAge
  }
}));
// 参数
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
// express.static静态资源文件中间件 客户端请求了/public目录下的资源，直接向客户端返回
app.use("/public",express.static(appConf.publicPath));
// app.use(express.static(__dirname + '/public'));
// cookie插件
app.use(cookie())
// 初始化路由
const r = new CRoute(app);
//初始化sql
//initMysql()

app.listen(appConf.port, () => {
  // tslint:disable-next-line:no-console
  console.log("server started at http://localhost:" + appConf.port);
})