import { Sequelize } from "sequelize-typescript";
//let Sequelize = require("sequelize");
const TcDb = new Sequelize(database, username, password, {
  host: DB_CONFIG.HOST,
  port: DB_CONFIG.PORT,
  dialect: 'mysql',
  timezone: '+08:00',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  define: {
    freezeTableName: true,//禁止自动修改表名
    timestamps: false,//不需要添加 createdAt 和 updatedAt 两个时间戳字段
  }
})