interface IAppConf {
  rootPath: string,
  publicPath: string,
  origin: string,
  port: string,
  maxAge: number
}

export const appConf:IAppConf = {
  rootPath: "/home/lh/work/liahng/node-project/test/node-express-ts-dom",
  publicPath: "/home/lh/work/liahng/vue-test/my-vue-admin-base/dist",
  origin: "http://192.168.88.106:9527",
  port: "8080",
  maxAge: 12 * 60 * 60 * 1000
}