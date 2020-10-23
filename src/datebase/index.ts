import { Sequelize } from 'sequelize-typescript'
import { mysql } from '../config/mysql'
export const initMysql = () => {
  new Sequelize(mysql);
}