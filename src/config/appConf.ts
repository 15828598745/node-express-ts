import { SequelizeOptions } from 'sequelize-typescript';
interface IAppConf {
  rootPath: string,
  publicPath: string,
  origin: string,
  port: string,
  maxAge: number,
  mysql: SequelizeOptions
}

const devAppConf: IAppConf = {
  rootPath: "/home/lh/work/liahng/node-project/test/node-express-ts-dom",
  publicPath: "/home/lh/work/liahng/vue-test/my-vue-admin-base/dist",
  origin: "http://192.168.88.106:9527",
  port: "8080",
  maxAge: 12 * 60 * 60 * 1000,
  mysql: {
    database: "testAdmin",
    username: "yh",
    password: "yh123",
    host: "192.168.88.246",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 5000
    },
    logging: true
  }
}

const proAppConf: IAppConf = {
  rootPath: "/home/lh/work/liahng/node-project/test/node-express-ts-dom",
  publicPath: "/home/lh/work/liahng/vue-test/my-vue-admin-base/dist",
  origin: "http://localhost:9527",
  port: "8080",
  maxAge: 12 * 60 * 60 * 1000,
  mysql: {
    database: "testAdmin",
    username: "yh",
    password: "yh123",
    host: "192.168.88.246",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 5000
    },
    logging: false
  }
}

export const appConf = process.env.NODE_ENV === "development" ? devAppConf : proAppConf;
